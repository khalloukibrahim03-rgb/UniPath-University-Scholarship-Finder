import { NextRequest, NextResponse } from "next/server";
import { ResearchAgentService } from "@/lib/services/researchAgent";
import { ProposedRecordReviewSchema } from "@/lib/validation/schemas";
import { isAuthorizedAdmin } from "@/lib/utils/adminAuth";

export async function GET(req: NextRequest) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized access to proposed records queue" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const reviewStatus = searchParams.get("reviewStatus") || undefined;

  const records = ResearchAgentService.getProposedRecords({ reviewStatus });
  return NextResponse.json({ records });
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized: Administrator privileges required to review proposed records" }, { status: 403 });
  }

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
