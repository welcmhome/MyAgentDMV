import { NextResponse } from "next/server";
import { getAgentById } from "@/lib/admv/agents";
import { toPublicAgent } from "@/lib/admv/serialize";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  if (!id?.trim()) {
    return NextResponse.json({ error: "invalid_id" }, { status: 400 });
  }
  const agent = getAgentById(id);
  if (!agent) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  return NextResponse.json(toPublicAgent(agent));
}
