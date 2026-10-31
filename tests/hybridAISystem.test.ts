import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { ResearchAgentService } from "@/lib/services/researchAgent";
import { AIGuidanceService } from "@/lib/services/aiGuidance";
import { DataService } from "@/lib/services/dataService";
import { isAuthorizedAdmin } from "@/lib/utils/adminAuth";
import { NextRequest } from "next/server";

describe("Server-side administrative authorization", () => {
  const originalSecret = process.env.ADMIN_SECRET;
  beforeEach(() => { process.env.ADMIN_SECRET = "unipath-secure-admin-key-2026-with-strong-entropy"; });
  afterEach(() => {
    if (originalSecret === undefined) delete process.env.ADMIN_SECRET;
    else process.env.ADMIN_SECRET = originalSecret;
  });

  it("rejects requests without authorization headers", () => {
    expect(isAuthorizedAdmin(new NextRequest("http://localhost:3000/api/admin/research-tasks"))).toBe(false);
  });

  it("accepts a valid configured admin secret", () => {
    const req = new NextRequest("http://localhost:3000/api/admin/research-tasks", {
      headers: { "x-admin-secret": process.env.ADMIN_SECRET! },
    });
    expect(isAuthorizedAdmin(req)).toBe(true);
  });
});

describe("System A — research queue safety", () => {
  it("creates a pending task without inventing sources or evidence", async () => {
    const task = await ResearchAgentService.executeTask({
      instruction: "Research Moroccan engineering schools and their current admission requirements",
      targetInstitution: "ENSIAS Rabat",
      targetCountry: "Morocco",
    });

    expect(task.status).toBe("pending");
    expect(task.logs?.length).toBeGreaterThan(0);
    expect(task.logs?.some((log) => log.message.includes("not configured"))).toBe(true);
    expect(task.proposedRecords).toHaveLength(1);
    expect(task.proposedRecords?.[0].reviewStatus).toBe("pending_review");
    expect(task.proposedRecords?.[0].verificationStatus).toBe("UNVERIFIED");
    expect(task.proposedRecords?.[0].claimEvidences).toHaveLength(0);
  });

  it("does not publish a record merely because an admin approves it", () => {
    const records = ResearchAgentService.getProposedRecords({ reviewStatus: "pending_review" });
    expect(records.length).toBeGreaterThan(0);

    const candidate = records[0];
    const approved = ResearchAgentService.reviewProposedRecord(candidate.id, "approve");

    expect(approved?.reviewStatus).toBe("deferred");
    expect(approved?.verificationStatus).not.toBe("VERIFIED");
    expect(approved?.reviewedAt).toBeDefined();
    expect(approved?.rejectionReason).toContain("verified source evidence");
    expect(DataService.getUniversityById(candidate.id)).toBeUndefined();
  });

  it("rejects a proposal with a recorded reason", () => {
    const task = ResearchAgentService.getTasks()[0];
    const candidate = task.proposedRecords?.[0];
    if (!candidate) throw new Error("Expected a staged research proposal");

    const rejected = ResearchAgentService.reviewProposedRecord(
      candidate.id,
      "reject",
      "Missing current official source evidence"
    );
    expect(rejected?.reviewStatus).toBe("rejected");
    expect(rejected?.verificationStatus).toBe("REJECTED");
    expect(rejected?.rejectionReason).toContain("Missing current official source");
  });
});

describe("System B — conservative student guidance", () => {
  it("does not turn unverified demo catalogue data into eligibility advice", async () => {
    const res = await AIGuidanceService.generateGuidance({
      query: "What are Moroccan engineering school admission rules for ENSIAS and UM6P?",
    });

    expect(res.classification).toBe("Insufficient Information");
    expect(res.answerMarkdown).toContain("More information is needed");
    expect(res.citedSources).toHaveLength(0);
    expect(res.confidenceScore).toBeLessThan(0.5);
  });

  it("classifies unknown queries as insufficient information", async () => {
    const res = await AIGuidanceService.generateGuidance({
      query: "What are tuition fees for an unknown university in outer space?",
    });

    expect(res.classification).toBe("Insufficient Information");
    expect(res.confidenceScore).toBeLessThan(0.5);
  });
});
