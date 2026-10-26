import { DataService } from "@/lib/services/dataService";

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

export interface GuidanceResponse {
  answerMarkdown: string;
  citedSources: Array<{
    title: string;
    url: string;
    verifiedAt: string;
  }>;
  suggestedChecklist?: string[];
  confidenceScore: number;
  isFallbackEngine: boolean;
}

export class AIGuidanceService {
  /**
   * Generates grounded AI guidance for student queries.
   * Uses local deterministic rule engine operating over verified seed data.
   * If OPENAI_API_KEY is present in environment, can integrate remote LLM adapter.
   */
  static async generateGuidance(req: GuidanceRequest): Promise<GuidanceResponse> {
    const apiKey = process.env.OPENAI_API_KEY;

    // Optional remote LLM execution branch (if API key is supplied)
    if (apiKey && apiKey.trim().length > 0) {
      try {
        // Reserved for external OpenAI / Anthropic integration
      } catch (err) {
        console.warn("Remote AI service failed, falling back to local guidance engine:", err);
      }
    }

    // Zero-Cost Local Deterministic Engine Execution
    return this.generateLocalGroundedGuidance(req);
  }

  private static generateLocalGroundedGuidance(req: GuidanceRequest): GuidanceResponse {
    const q = req.query.toLowerCase();
    const citedSources: Array<{ title: string; url: string; verifiedAt: string }> = [];
    const suggestedChecklist: string[] = [];

    // Query analysis & contextual extraction
    let answerMarkdown = "";

    if (q.includes("campus france") || q.includes("dap") || q.includes("hors dap") || q.includes("france")) {
      const sorbonne = DataService.getUniversityById("uni-sorbonne-01");
      const eiffel = DataService.getScholarshipById("sch-eiffel-01");

      if (sorbonne) {
        citedSources.push({
          title: `${sorbonne.name} Official Admissions Portal`,
          url: sorbonne.sourceUrl,
          verifiedAt: sorbonne.verifiedAt
        });
      }
      if (eiffel) {
        citedSources.push({
          title: eiffel.title,
          url: eiffel.sourceUrl,
          verifiedAt: eiffel.verifiedAt
        });
      }

      answerMarkdown = `### 🇫🇷 Guidance for Studying in France (Etudes en France)

For students applying from Morocco or North/Sub-Saharan Africa to French public universities (such as **Sorbonne University**), applications follow the **Campus France Etudes en France** process:

1. **DAP (Demande d'Admission Préalable):** Required for 1st-year Bachelor (Licence 1) applications. Deadline is typically in December/January.
2. **Hors DAP:** Required for Master's degrees (M1/M2) and License 2/3.
3. **Language Requirement:** French language proficiency (**DELF B2 or TCF C1**) is mandatory for most programs taught in French.

#### Recommended Financial Aid Opportunity:
The **Eiffel Excellence Scholarship Program** provides €1,181/month stipend, travel expenses, and health insurance for Master's degree candidates. Application requires nomination directly by the French university.`;

      suggestedChecklist.push(
        "Create account on Campus France Morocco portal (Etudes en France)",
        "Obtain certified French translations of Baccalauréat & University transcripts",
        "Take DELF B2 or TCF Tout Public language exam",
        "Submit university choices on Etudes en France dashboard before deadline"
      );
    } else if (q.includes("germany") || q.includes("daad") || q.includes("tum") || q.includes("tum")) {
      const tum = DataService.getUniversityById("uni-tum-02");
      const daad = DataService.getScholarshipById("sch-daad-02");

      if (tum) {
        citedSources.push({
          title: `${tum.name} Admissions Portal`,
          url: tum.sourceUrl,
          verifiedAt: tum.verifiedAt
        });
      }
      if (daad) {
        citedSources.push({
          title: daad.title,
          url: daad.sourceUrl,
          verifiedAt: daad.verifiedAt
        });
      }

      answerMarkdown = `### 🇩🇪 Guidance for Studying in Germany (TUM & DAAD)

German technical universities like **Technical University of Munich (TUM)** offer world-class tuition-free or low-tuition English-taught programs.

Key steps for international candidates:
1. **Degree Equivalence (uni-assist):** Foreign degrees must be evaluated through **uni-assist** to receive a Vorprüfungsdokumentation (VPD).
2. **Language Requirement:** English-taught programs require IELTS 6.5–7.0+ or TOEFL iBT 95+.
3. **Scholarship Support:** The **DAAD Master Scholarship** provides a full monthly stipend (€934/month) plus travel and health coverage.`;

      suggestedChecklist.push(
        "Apply for uni-assist VPD preliminary evaluation",
        "Take IELTS Academic or TOEFL iBT exam",
        "Prepare Blocked Bank Account (Sperrkonto) for German Student Visa",
        "Submit DAAD scholarship application before deadline"
      );
    } else if (q.includes("scholarship") || q.includes("full ride") || q.includes("bourse") || q.includes("funding")) {
      const scholarships = DataService.getScholarships();
      scholarships.forEach((s) => {
        citedSources.push({
          title: s.title,
          url: s.sourceUrl,
          verifiedAt: s.verifiedAt
        });
      });

      answerMarkdown = `### 💰 Verified Full-Ride & Full-Tuition Scholarship Options

UniPath tracks verified scholarships with transparent coverage breakdowns:

1. **Eiffel Excellence Scholarship (France):** Full ride (€1,181/mo stipend + travel + insurance) for Master/PhD.
2. **DAAD Scholarships (Germany):** Full stipend (€934/mo) + health coverage for Master's programs.
3. **Chinese Government Scholarship (CSC China):** 100% tuition coverage + accommodation + 3,000 RMB/mo stipend.
4. **Minhaty National Grant (Morocco):** Financial aid for Moroccan Baccalauréat holders in higher education.`;

      suggestedChecklist.push(
        "Check eligibility criteria (age, degree level, target country)",
        "Request 2 professional/academic letters of recommendation",
        "Write tailored Motivation Letter referencing official program requirements",
        "Verify application deadline on official provider portal"
      );
    } else {
      const unis = DataService.getUniversities();
      unis.forEach((u) => {
        citedSources.push({
          title: `${u.name} Official Page`,
          url: u.sourceUrl,
          verifiedAt: u.verifiedAt
        });
      });

      answerMarkdown = `### 🎓 General Admissions & Guidance Breakdown

To maximize your chances of international university admission and scholarship selection:

1. **Academic Verification:** Ensure your transcripts match the target country's entry criteria (e.g., ECTS credit equivalency or GPA scale).
2. **Language Testing:** Prepare required language proficiency tests (DELF/TCF for French programs, IELTS/TOEFL for English programs).
3. **Document Checklist:** Organize certified translations of your Baccalauréat diploma, university transcripts, CV, and Motivation Letter.
4. **Deadline Tracking:** Application cycles typically open between October and January for the following autumn intake.`;

      suggestedChecklist.push(
        "Complete academic profile details on UniPath",
        "Bookmark preferred universities and scholarships to your Dashboard",
        "Verify exact document requirements on official source links"
      );
    }

    return {
      answerMarkdown,
      citedSources,
      suggestedChecklist,
      confidenceScore: 0.95,
      isFallbackEngine: true
    };
  }
}
