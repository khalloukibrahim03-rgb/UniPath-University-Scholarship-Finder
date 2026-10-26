import { NextRequest, NextResponse } from "next/server";
import { ResearchAgentService } from "@/lib/services/researchAgent";
import { ResearchTaskCreateSchema } from "@/lib/validation/schemas";
import { isAuthorizedAdmin } from "@/lib/utils/adminAuth";

export async function GET(req: NextRequest) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized access to administrative research tasks" }, { status: 401 });
  }

  const tasks = ResearchAgentService.getTasks();
  return NextResponse.json({ tasks });
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized: Administrator privileges required" }, { status: 403 });
  }

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
