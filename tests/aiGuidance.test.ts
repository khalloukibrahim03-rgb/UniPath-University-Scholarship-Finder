import { describe, it, expect } from "vitest";
import { AIGuidanceService } from "@/lib/services/aiGuidance";

describe("AIGuidanceService", () => {
  it("does not invent admission rules or eligibility decisions", async () => {
    const res = await AIGuidanceService.generateGuidance({
      query: "How do I apply for Sorbonne via Campus France?",
    });

    expect(res.isFallbackEngine).toBe(true);
    expect(res.classification).not.toBe("Matches Documented Criteria");
    expect(res.confidenceScore).toBeLessThanOrEqual(0.55);
    expect(res.answerMarkdown).toContain("eligibility");
    expect(res.suggestedChecklist?.length).toBeGreaterThan(0);
  });

  it("returns a safe insufficient-information result for unknown queries", async () => {
    const res = await AIGuidanceService.generateGuidance({
      query: "A completely unknown subject that is not in the catalogue",
    });

    expect(res.classification).toBe("Insufficient Information");
    expect(res.citedSources).toHaveLength(0);
    expect(res.confidenceScore).toBeLessThan(0.5);
  });

  it("never presents a result as a confirmed eligibility decision", async () => {
    const res = await AIGuidanceService.generateGuidance({
      query: "scholarship",
      studentProfile: { nationality: "Moroccan", educationLevel: "Master" },
    });

    expect(res.classification).not.toBe("Matches Documented Criteria");
  });
});
