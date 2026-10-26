import { describe, it, expect } from "vitest";
import { DataService } from "@/lib/services/dataService";

describe("DataService", () => {
  it("should return all seed universities", () => {
    const unis = DataService.getUniversities();
    expect(unis.length).toBeGreaterThan(0);
    expect(unis[0]).toHaveProperty("name");
    expect(unis[0]).toHaveProperty("verificationStatus");
  });

  it("should filter universities by country", () => {
    const franceUnis = DataService.getUniversities({ country: "France" });
    expect(franceUnis.every((u) => u.country === "France")).toBe(true);
  });

  it("should return all seed scholarships", () => {
    const scholarships = DataService.getScholarships();
    expect(scholarships.length).toBeGreaterThan(0);
    expect(scholarships[0]).toHaveProperty("coverageType");
  });

  it("should return a university by ID or slug", () => {
    const sorbonne = DataService.getUniversityById("uni-sorbonne-01");
    expect(sorbonne).toBeDefined();
    expect(sorbonne?.name).toContain("Sorbonne");
  });
});
