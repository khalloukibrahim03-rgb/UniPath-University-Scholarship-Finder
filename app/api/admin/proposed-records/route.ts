import { NextRequest, NextResponse } from "next/server";
import { ResearchAgentService } from "@/lib/services/researchAgent";
import { ProposedRecordReviewSchema } from "@/lib/validation/schemas";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reviewStatus = searchParams.get("reviewStatus") || undefined;

  const records = ResearchAgentService.getProposedRecords({ reviewStatus });
  return NextResponse.json({ records });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ProposedRecordReviewSchema.parse(body);

    const record = ResearchAgentService.reviewProposedRecord(
      parsed.proposedRecordId,
      parsed.action as "approve" | "reject" | "edit",
      parsed.rejectionReason,
      parsed.editedData
    );

    if (!record) {
      return NextResponse.json({ error: "Proposed record not found" }, { status: 404 });
    }

    return NextResponse.json({ record });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to review proposed record" },
      { status: 400 }
    );
  }
}
