import { NextRequest, NextResponse } from "next/server";
import { ResearchAgentService } from "@/lib/services/researchAgent";
import { ResearchTaskCreateSchema } from "@/lib/validation/schemas";

export async function GET() {
  const tasks = ResearchAgentService.getTasks();
  return NextResponse.json({ tasks });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ResearchTaskCreateSchema.parse(body);

    const task = await ResearchAgentService.executeTask(parsed);

    return NextResponse.json({ task });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to execute research task" },
      { status: 400 }
    );
  }
}
