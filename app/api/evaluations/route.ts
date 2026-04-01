import { NextResponse } from "next/server";
import { parseEvaluationBody, runEvaluation } from "@/lib/admv/evaluations";
import { getLicenseByAgentId } from "@/lib/admv/licenses";
import { evaluationResultPayload } from "@/lib/admv/serialize";

/**
 * POST /api/evaluations — queue mock evaluation; future: sandboxed runner + audit log.
 * Domain logic in `@/lib/admv/evaluations`; rows written via `lib/admv/data` repositories.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = parseEvaluationBody(body);
  if (!parsed) {
    return NextResponse.json({ error: "invalid_body", message: "agentId and valid licenseClass required" }, { status: 400 });
  }

  const result = runEvaluation(parsed);
  if (!result) {
    return NextResponse.json({ error: "agent_not_found" }, { status: 404 });
  }

  const { evaluation, licenseCreated } = result;
  const license = licenseCreated ? getLicenseByAgentId(parsed.agentId) : undefined;

  return NextResponse.json(evaluationResultPayload(evaluation, license), { status: 200 });
}
