import { NextResponse } from "next/server";
import { listPublicRegistry } from "@/lib/admv/registry";
import { seedDemoRegistryIfEmpty } from "@/lib/admv/seed";

/**
 * GET /api/registry — public-safe records only (no internal notes, prompts, or PII beyond display name).
 * Data from `listPublicRegistry()`; swap mock repos in `lib/admv/data` for Supabase later.
 */
export async function GET() {
  seedDemoRegistryIfEmpty();
  const entries = listPublicRegistry();
  return NextResponse.json({ entries });
}
