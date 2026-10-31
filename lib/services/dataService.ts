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
    // Approval is a workflow decision, not proof that the underlying facts are correct.
    // Never publish a record unless its verification state and field-level evidence agree.
    if (record.reviewStatus !== "approved" || record.verificationStatus !== "VERIFIED") return;

    const evidence = record.claimEvidences || [];
    const hasVerifiedEvidence = (fieldName: string) =>
      evidence.some((item) =>
        item.fieldName === fieldName &&
        item.verificationStatus === "VERIFIED" &&
        /^https?:\\/\\//i.test(item.sourceUrl) &&
        Boolean(item.sourceTitle?.trim()) &&
        Boolean(item.evidenceExcerpt?.trim())
      );

    if (record.entityType === "university") {
      const p = record.proposedData;
      const requiredFields = ["name", "country", "city", "websiteUrl", "sourceUrl"];
      if (
        requiredFields.some((field) => !p[field] || !String(p[field]).trim() || !hasVerifiedEvidence(field))
      ) return;

      const newUni: University = {
        id: record.id,
        name: p.name,
        slug: p.slug || record.id,
        country: p.country,
        city: p.city,
        websiteUrl: p.websiteUrl,
        description: p.description || "Institution profile; see the official source for current details.",
        rankingNational: p.rankingNational,
        isPublic: p.isPublic,
        verificationStatus: "verified",
        dataQualityState: "VERIFIED",
        verifiedAt: evidence
          .map((item) => item.verifiedAt)
          .filter(Boolean)
          .sort()
          .at(-1) || new Date().toISOString().split("T")[0],
        sourceUrl: p.sourceUrl,
        programsCount: 0,
        featuredPrograms: [],
        claimEvidences: evidence,
      };

      const existingIdx = PUBLISHED_UNIVERSITIES.findIndex((u) => u.id === record.id);
      if (existingIdx >= 0) PUBLISHED_UNIVERSITIES[existingIdx] = newUni;
      else PUBLISHED_UNIVERSITIES.unshift(newUni);
    } else if (record.entityType === "scholarship") {
      const p = record.proposedData;
      const requiredFields = [
        "title", "providerName", "applicationDeadline", "applicationUrl",
        "sourceUrl", "coverageType", "eligibleDegrees",
      ];
      if (
        requiredFields.some((field) => {
          const value = p[field];
          return value === undefined || value === null || value === "" ||
            (Array.isArray(value) && value.length === 0) || !hasVerifiedEvidence(field);
        })
      ) return;

      const newSch: Scholarship = {
        id: record.id,
        title: p.title,
        slug: p.slug || record.id,
        providerName: p.providerName,
        targetCountries: p.targetCountries || [],
        destinationCountries: p.destinationCountries || [],
        coverageType: p.coverageType,
        stipendAmountAnnual: p.stipendAmountAnnual,
        currency: p.currency || "EUR",
        eligibleDegrees: p.eligibleDegrees,
        applicationDeadline: p.applicationDeadline,
        academicCycle: p.academicCycle,
        applicationUrl: p.applicationUrl,
        verificationStatus: "verified",
        dataQualityState: "VERIFIED",
        verifiedAt: evidence
          .map((item) => item.verifiedAt)
          .filter(Boolean)
          .sort()
          .at(-1) || new Date().toISOString().split("T")[0],
        sourceUrl: p.sourceUrl,
        description: p.description || "Scholarship details; see the official source for current information.",
        requirementsList: p.requirementsList || [],
        claimEvidences: evidence,
      };

      const existingIdx = PUBLISHED_SCHOLARSHIPS.findIndex((s) => s.id === record.id);
      if (existingIdx >= 0) PUBLISHED_SCHOLARSHIPS[existingIdx] = newSch;
      else PUBLISHED_SCHOLARSHIPS.unshift(newSch);
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
