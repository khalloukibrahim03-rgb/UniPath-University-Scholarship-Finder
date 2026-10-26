import { DEMO_UNIVERSITIES, DEMO_SCHOLARSHIPS, DEMO_USER_APPLICATIONS } from "@/lib/data/seedData";
import { University, Scholarship, UserApplication, AcademicProgram } from "@/types";

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
    let result = [...DEMO_UNIVERSITIES];

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
    return DEMO_UNIVERSITIES.find((u) => u.id === id || u.slug === id);
  }

  /**
   * Get all scholarships with optional search filters
   */
  static getScholarships(filters?: {
    query?: string;
    destinationCountry?: string;
    coverageType?: string;
  }): Scholarship[] {
    let result = [...DEMO_SCHOLARSHIPS];

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
    return DEMO_SCHOLARSHIPS.find((s) => s.id === id || s.slug === id);
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
    DEMO_UNIVERSITIES.forEach((u) => countries.add(u.country));
    DEMO_SCHOLARSHIPS.forEach((s) => s.destinationCountries.forEach((c) => countries.add(c)));
    return Array.from(countries).sort();
  }
}
