import { DataService } from "@/lib/services/dataService";
import { DataQualityState } from "@/types";

export interface GuidanceRequest {
  query: string;
  studentProfile?: {
    educationLevel?: string;
    baccalaureateTrack?: string;
    nationality?: string;
    budget?: number;
  };
  contextProgramId?: string;
  contextScholarshipId?: string;
}

export type ResultClassification =
  | "Matches Documented Criteria"
  | "Potential Match"
  | "Does Not Match Documented Requirement"
  | "Insufficient Information";

export interface GuidanceResponse {
  answerMarkdown: string;
  classification: ResultClassification;
  citedSources: Array<{
    title: string;
    url: string;
    verifiedAt: string;
    dataQualityState?: DataQualityState;
  }>;
  suggestedChecklist?: string[];
  confidenceScore: number;
  isFallbackEngine: boolean;
}

const isHttpUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
};

/**
 * Conservative catalogue search. This is intentionally not presented as an AI
 * eligibility decision: matching catalogue text is not proof that a student qualifies.
 */
export class AIGuidanceService {
  static async generateGuidance(req: GuidanceRequest): Promise<GuidanceResponse> {
    const query = req.query.trim();
    const scholarships = DataService.getScholarships({ query });
    const universities = DataService.getUniversities({ query });

    const matchingScholarships = scholarships.filter((item) =>
      item.verificationStatus === "verified" &&
      item.dataQualityState === "VERIFIED" &&
      item.applicationDeadline >= new Date().toISOString().slice(0, 10) &&
      isHttpUrl(item.sourceUrl)
    );
    const matchingUniversities = universities.filter((item) =>
      item.verificationStatus === "verified" &&
      item.dataQualityState === "VERIFIED" &&
      isHttpUrl(item.sourceUrl)
    );

    const citedSources = [
      ...matchingScholarships.map((item) => ({
        title: item.title,
        url: item.sourceUrl,
        verifiedAt: item.verifiedAt,
        dataQualityState: item.dataQualityState,
      })),
      ...matchingUniversities.map((item) => ({
        title: item.name,
        url: item.sourceUrl,
        verifiedAt: item.verifiedAt,
        dataQualityState: item.dataQualityState,
      })),
    ];

    const hasMatches = citedSources.length > 0;
    const resultNames = [
      ...matchingScholarships.map((item) => item.title),
      ...matchingUniversities.map((item) => item.name),
    ];

    const answerMarkdown = hasMatches
      ? [
          "### Catalogue results",
          "These records match your search text and are marked verified in the current UniPath catalogue:",
          ...resultNames.map((name) => `- **${name}**`),
          "",
          "**Important:** a catalogue match is not an eligibility decision. Check the official source for the current intake, deadline, nationality rules, degree level, language requirements, and funding conditions before applying.",
        ].join("\n")
      : [
          "### More information is needed",
          "I could not find a current, verified catalogue record matching this search.",
          "Try a scholarship or university name, destination country, or field of study. Do not rely on an unverified record for an application deadline or eligibility decision.",
        ].join("\n");

    return {
      answerMarkdown,
      classification: hasMatches ? "Potential Match" : "Insufficient Information",
      citedSources,
      suggestedChecklist: [
        "Open the official provider or university source.",
        "Confirm the deadline and academic cycle for the intake you want.",
        "Check nationality, degree level, grades, language, and financial eligibility.",
        "Save a copy of the official requirements before submitting.",
      ],
      confidenceScore: hasMatches ? 0.55 : 0.2,
      isFallbackEngine: true,
    };
  }
}
