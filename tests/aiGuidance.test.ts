import { describe, it, expect } from "vitest";
import { AIGuidanceService } from "@/lib/services/aiGuidance";

describe("AIGuidanceService Local Engine", () => {
  it("should generate grounded guidance for Campus France queries", async () => {
    const res = await AIGuidanceService.generateGuidance({
      query: "How do I apply for Sorbonne via Campus France?",
    });

    expect(res.answerMarkdown).toContain("Campus France");
    expect(res.isFallbackEngine).toBe(true);
    expect(res.confidenceScore).toBe(0.95);
    expect(res.citedSources.length).toBeGreaterThan(0);
    expect(res.suggestedChecklist?.length).toBeGreaterThan(0);
  });

  it("should generate grounded guidance for scholarship queries", async () => {
    const res = await AIGuidanceService.generateGuidance({
      query: "What full ride scholarships are available?",
    });

    expect(res.answerMarkdown).toContain("Scholarship");
    expect(res.citedSources.length).toBeGreaterThan(0);
  });
});
