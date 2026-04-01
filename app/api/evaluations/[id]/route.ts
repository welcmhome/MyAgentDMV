import { NextResponse } from "next/server";
import { getEvaluationResultDTO } from "@/lib/admv/evaluation-result";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * GET /api/evaluations/[id] — full outcome for results UI (public-safe fields).
 * Aggregates via `@/lib/admv/evaluation-result` (reads repositories, not raw maps).
 */
export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  if (!id?.trim()) {
    return NextResponse.json({ error: "invalid_id" }, { status: 400 });
  }

  const payload = getEvaluationResultDTO(id);
  if (!payload) {
    return NextResponse.json({ error: "not_found", message: "Evaluation not found in this session." }, { status: 404 });
  }

  return NextResponse.json(payload);
}
