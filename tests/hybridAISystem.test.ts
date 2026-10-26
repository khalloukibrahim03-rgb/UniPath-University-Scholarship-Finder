import { describe, it, expect } from "vitest";
import { ResearchAgentService } from "@/lib/services/researchAgent";
import { AIGuidanceService } from "@/lib/services/aiGuidance";
import { DataService } from "@/lib/services/dataService";
import { isAuthorizedAdmin } from "@/lib/utils/adminAuth";
import { NextRequest } from "next/server";

describe("Server-Side Administrative Authorization", () => {
  it("should reject requests without authorization headers", () => {
    const unauthReq = new NextRequest("http://localhost:3000/api/admin/research-tasks");
    expect(isAuthorizedAdmin(unauthReq)).toBe(false);
  });

  it("should accept requests with valid admin secret header", () => {
    const authReq = new NextRequest("http://localhost:3000/api/admin/research-tasks", {
      headers: { "x-admin-secret": "unipath-secure-admin-key-2026" },
    });
    expect(isAuthorizedAdmin(authReq)).toBe(true);
  });
});

describe("System A — UniPath Research Agent & Review Queue", () => {
  it("should create a research task and stage a proposed record with claim-level evidence", async () => {
    const task = await ResearchAgentService.executeTask({
      instruction: "Research Moroccan engineering schools (ENSIAS, EMI, EHTP) computer science programs",
      targetInstitution: "ENSIAS Rabat",
      targetCountry: "Morocco",
    });

    expect(task.status).toBe("completed");
    expect(task.logs?.length).toBeGreaterThan(0);
    expect(task.proposedRecords?.length).toBeGreaterThan(0);

    const proposed = task.proposedRecords?.[0];
    expect(proposed?.reviewStatus).toBe("pending_review");
    expect(proposed?.verificationStatus).toBe("PARTIALLY_VERIFIED");
    expect(proposed?.claimEvidences.length).toBeGreaterThan(0);

    const claim = proposed?.claimEvidences[0];
    expect(claim?.sourceUrl).toContain("admissions");
    expect(claim?.evidenceExcerpt).toBeDefined();
  });

  it("should approve proposed record and publish it to public DataService catalog", () => {
    const records = ResearchAgentService.getProposedRecords({ reviewStatus: "pending_review" });
    expect(records.length).toBeGreaterThan(0);

    const recordToApprove = records[0];
    const approved = ResearchAgentService.reviewProposedRecord(recordToApprove.id, "approve");

    expect(approved?.reviewStatus).toBe("approved");
    expect(approved?.verificationStatus).toBe("VERIFIED");
    expect(approved?.reviewedAt).toBeDefined();

    // Verify record is published in public DataService directory
    const published = DataService.getUniversityById(recordToApprove.id);
    expect(published).toBeDefined();
    expect(published?.name).toBe(approved?.proposedData.name);
  });

  it("should reject proposed record with rejection reason", () => {
    const task = ResearchAgentService.getTasks()[0];
    if (task.proposedRecords && task.proposedRecords.length > 0) {
      const recordToReject = task.proposedRecords[0];
      const rejected = ResearchAgentService.reviewProposedRecord(recordToReject.id, "reject", "Missing official source URL");

      expect(rejected?.reviewStatus).toBe("rejected");
      expect(rejected?.verificationStatus).toBe("REJECTED");
      expect(rejected?.rejectionReason).toContain("Missing official source");
    }
  });
});

describe("System B — Public Grounded Student AI Assistant", () => {
  it("should provide grounded guidance with result classification for Moroccan engineering query", async () => {
    const res = await AIGuidanceService.generateGuidance({
      query: "What are Moroccan engineering school admission rules for ENSIAS and UM6P?",
    });

    expect(res.classification).toBe("Matches Documented Criteria");
    expect(res.answerMarkdown).toContain("Moroccan Higher Education");
    expect(res.citedSources.length).toBeGreaterThan(0);
    expect(res.citedSources[0]).toHaveProperty("dataQualityState");
  });

  it("should classify query as Insufficient Information when database lacks evidence", async () => {
    const res = await AIGuidanceService.generateGuidance({
      query: "What are tuition fees for unknown university in outer space?",
    });

    expect(res.classification).toBe("Insufficient Information");
    expect(res.confidenceScore).toBeLessThan(0.5);
  });
});
