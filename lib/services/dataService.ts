import { DEMO_UNIVERSITIES, DEMO_SCHOLARSHIPS, DEMO_USER_APPLICATIONS } from "@/lib/data/seedData";
import { University, Scholarship, UserApplication, AcademicProgram, ProposedRecord } from "@/types";

// Dynamic published store initialized with seed records
const PUBLISHED_UNIVERSITIES: University[] = [...DEMO_UNIVERSITIES];
const PUBLISHED_SCHOLARSHIPS: Scholarship[] = [...DEMO_SCHOLARSHIPS];

export class DataService {
  /**
   * Get all universities with optional search filters
   */
  static getUniversities(filters?: {
    query?: string;
    country?: string;
    degreeLevel?: string;
    maxTuition?: number;
  }): University[] {
    let result = [...PUBLISHED_UNIVERSITIES];

    if (!filters) return result;

    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.city.toLowerCase().includes(q) ||
          u.country.toLowerCase().includes(q) ||
          u.description.toLowerCase().includes(q)
      );
    }

    if (filters.country && filters.country !== "All") {
      result = result.filter((u) => u.country === filters.country);
    }

    if (filters.maxTuition !== undefined && filters.maxTuition > 0) {
      result = result.filter((u) =>
        u.featuredPrograms?.some((p) => p.tuitionFeeAnnual <= (filters.maxTuition || 0))
      );
    }

    return result;
  }

  static getUniversityById(id: string): University | undefined {
    return PUBLISHED_UNIVERSITIES.find((u) => u.id === id || u.slug === id);
  }

  /**
   * Get all scholarships with optional search filters
   */
  static getScholarships(filters?: {
    query?: string;
    destinationCountry?: string;
    coverageType?: string;
  }): Scholarship[] {
    let result = [...PUBLISHED_SCHOLARSHIPS];

    if (!filters) return result;

    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.providerName.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    if (filters.destinationCountry && filters.destinationCountry !== "All") {
      result = result.filter((s) =>
        s.destinationCountries.includes(filters.destinationCountry || "")
      );
    }

    if (filters.coverageType && filters.coverageType !== "All") {
      result = result.filter((s) => s.coverageType === filters.coverageType);
    }

    return result;
  }

  static getScholarshipById(id: string): Scholarship | undefined {
    return PUBLISHED_SCHOLARSHIPS.find((s) => s.id === id || s.slug === id);
  }

  /**
   * Publish an approved proposed record into the public database
   */
  static publishApprovedRecord(record: ProposedRecord): void {
    if (record.reviewStatus !== "approved") return;

    if (record.entityType === "university") {
      const p = record.proposedData;
      const featuredProg = p.featuredProgram
        ? [
            {
              id: `prog-pub-${Date.now()}`,
              universityId: record.id,
              universityName: p.name,
              universityCountry: p.country,
              title: p.featuredProgram.title,
              degreeLevel: p.featuredProgram.degreeLevel || "Master",
              fieldOfStudy: p.featuredProgram.fieldOfStudy || "Engineering",
              languageOfInstruction: p.featuredProgram.languageOfInstruction || "French",
              durationMonths: p.featuredProgram.durationMonths || 24,
              tuitionFeeAnnual: p.featuredProgram.tuitionFeeAnnual || 0,
              currency: p.featuredProgram.currency || "MAD",
              applicationDeadline: p.featuredProgram.applicationDeadline,
              academicCycle: p.featuredProgram.academicCycle || "2025/2026",
              verificationStatus: "verified" as const,
              verifiedAt: new Date().toISOString().split("T")[0],
              sourceUrl: p.sourceUrl || p.websiteUrl,
              requirements: [
                {
                  id: `req-pub-${Date.now()}`,
                  programId: `prog-pub-${Date.now()}`,
                  requirementType: "Academic Record" as const,
                  title: "Diplôme / Licence Equivalent",
                  description: "Verified academic background criteria from official portal.",
                  isMandatory: true,
                  acceptedQualifications: ["DEUG / Licence / Baccalauréat"],
                  verificationStatus: "verified" as const,
                },
              ],
            },
          ]
        : [];

      const newUni: University = {
        id: record.id,
        name: p.name,
        slug: p.slug || record.id,
        country: p.country || "Morocco",
        city: p.city || "Rabat",
        websiteUrl: p.websiteUrl,
        description: p.description || "Verified public institution profile.",
        rankingNational: p.rankingNational || 1,
        isPublic: p.isPublic !== undefined ? p.isPublic : true,
        verificationStatus: "verified",
        dataQualityState: "VERIFIED",
        verifiedAt: new Date().toISOString().split("T")[0],
        sourceUrl: p.sourceUrl || p.websiteUrl,
        programsCount: featuredProg.length,
        featuredPrograms: featuredProg,
        claimEvidences: record.claimEvidences,
      };

      // Check if already published
      const existingIdx = PUBLISHED_UNIVERSITIES.findIndex((u) => u.id === record.id);
      if (existingIdx >= 0) {
        PUBLISHED_UNIVERSITIES[existingIdx] = newUni;
      } else {
        PUBLISHED_UNIVERSITIES.unshift(newUni);
      }
    } else if (record.entityType === "scholarship") {
      const p = record.proposedData;
      const newSch: Scholarship = {
        id: record.id,
        title: p.title || p.name,
        slug: p.slug || record.id,
        providerName: p.providerName || "Official Provider",
        targetCountries: p.targetCountries || ["Morocco", "Africa"],
        destinationCountries: p.destinationCountries || ["Morocco"],
        coverageType: p.coverageType || "Full Ride",
        stipendAmountAnnual: p.stipendAmountAnnual || 0,
        currency: p.currency || "MAD",
        eligibleDegrees: p.eligibleDegrees || ["Master"],
        applicationDeadline: p.applicationDeadline || "2025-06-30",
        applicationUrl: p.applicationUrl || p.websiteUrl,
        verificationStatus: "verified",
        dataQualityState: "VERIFIED",
        verifiedAt: new Date().toISOString().split("T")[0],
        sourceUrl: p.sourceUrl || p.websiteUrl,
        description: p.description || "Verified scholarship program.",
        requirementsList: p.requirementsList || ["Official application submission"],
        claimEvidences: record.claimEvidences,
      };

      const existingIdx = PUBLISHED_SCHOLARSHIPS.findIndex((s) => s.id === record.id);
      if (existingIdx >= 0) {
        PUBLISHED_SCHOLARSHIPS[existingIdx] = newSch;
      } else {
        PUBLISHED_SCHOLARSHIPS.unshift(newSch);
      }
    }
  }

  /**
   * Get saved applications for application dashboard
   */
  static getUserApplications(): UserApplication[] {
    return DEMO_USER_APPLICATIONS;
  }

  /**
   * Get distinct country options for filters
   */
  static getAvailableCountries(): string[] {
    const countries = new Set<string>();
    PUBLISHED_UNIVERSITIES.forEach((u) => countries.add(u.country));
    PUBLISHED_SCHOLARSHIPS.forEach((s) => s.destinationCountries.forEach((c) => countries.add(c)));
    return Array.from(countries).sort();
  }
}
