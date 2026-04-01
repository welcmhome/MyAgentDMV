import { NextResponse } from "next/server";
import { createAgent, parseCreateAgentBody } from "@/lib/admv/agents";
import { toPublicAgent } from "@/lib/admv/serialize";

/**
 * POST /api/agents — create agent (untrusted input; validated server-side).
 * Route stays HTTP-only; persistence is behind `@/lib/admv/agents` → `lib/admv/data`.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = parseCreateAgentBody(body);
  if (!parsed) {
    return NextResponse.json({ error: "invalid_body", message: "name and valid licenseClass required" }, { status: 400 });
  }

  const agent = createAgent(parsed);
  return NextResponse.json(toPublicAgent(agent), { status: 201 });
}
