import { NextRequest, NextResponse } from "next/server";
import { AIGuidanceService } from "@/lib/services/aiGuidance";
import { GuidanceRequestSchema } from "@/lib/validation/schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = GuidanceRequestSchema.parse(body);

    const guidance = await AIGuidanceService.generateGuidance(parsed);

    return NextResponse.json(guidance);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to generate guidance" },
      { status: 400 }
    );
  }
}
