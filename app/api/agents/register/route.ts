import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import crypto from "crypto";

const LOG = "[agents/register]";

function generateAgentId() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `AGENT-${year}-${random}`;
}

function generateClaimCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const part = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `CLM-${part()}-${part()}`;
}

export async function POST(request: Request) {
  try {
    console.log(`${LOG} before request.json()`);
    const body = await request.json();
    console.log(`${LOG} after request.json()`, { keys: body != null && typeof body === "object" ? Object.keys(body) : [] });

    const {
      agent_name,
      platform,
      agent_type,
      external_agent_id,
      endpoint_url,
      public_profile_url,
      manifest_fingerprint,
    } = body;

    console.log(`${LOG} before validation`);
    if (!agent_name || !platform || !agent_type) {
      console.log(`${LOG} after validation — failed (400)`);
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    console.log(`${LOG} after validation — ok`);

    console.log(`${LOG} before generateAgentId`);
    const agentId = generateAgentId();
    console.log(`${LOG} after generateAgentId`, agentId);

    console.log(`${LOG} before claim token generation`);
    const claimToken = crypto.randomBytes(32).toString("hex");
    const claimTokenHash = crypto
      .createHash("sha256")
      .update(claimToken)
      .digest("hex");

    const claimCode = generateClaimCode();
    console.log(`${LOG} after claim token / code generation`);

    console.log(`${LOG} before pool.connect()`);
    const client = await pool.connect();
    console.log(`${LOG} after pool.connect()`);

    try {
      console.log(`${LOG} before BEGIN`);
      await client.query("BEGIN");
      console.log(`${LOG} after BEGIN`);

      console.log(`${LOG} before INSERT agents`);
      const agentResult = await client.query(
        `
        INSERT INTO agents (
          agent_id,
          agent_name,
          platform,
          agent_type,
          external_agent_id,
          endpoint_url,
          public_profile_url,
          manifest_fingerprint,
          claim_status,
          status,
          created_at,
          updated_at
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'unclaimed','registered',NOW(),NOW())
        RETURNING id
        `,
        [
          agentId,
          agent_name,
          platform,
          agent_type,
          external_agent_id || null,
          endpoint_url || null,
          public_profile_url || null,
          manifest_fingerprint || null,
        ]
      );
      console.log(`${LOG} after INSERT agents`);

      const agentPk = agentResult.rows[0].id;

      console.log(`${LOG} before INSERT agent_claims`);
      await client.query(
        `
        INSERT INTO agent_claims (
          agent_pk,
          user_id,
          claim_token_hash,
          claim_code,
          claim_status,
          claim_token_expires_at,
          claimed_at,
          created_at,
          updated_at
        )
        VALUES ($1,NULL,$2,$3,'unclaimed',NOW() + INTERVAL '72 hours',NULL,NOW(),NOW())
        `,
        [agentPk, claimTokenHash, claimCode]
      );
      console.log(`${LOG} after INSERT agent_claims`);

      console.log(`${LOG} before INSERT audit_events`);
      await client.query(
        `
        INSERT INTO audit_events (
          agent_pk,
          evaluation_id,
          license_pk,
          event_type,
          event_message,
          created_at
        )
        VALUES ($1,NULL,NULL,'agent_registered','Agent registered successfully',NOW())
        `,
        [agentPk]
      );
      console.log(`${LOG} after INSERT audit_events`);

      console.log(`${LOG} before COMMIT`);
      await client.query("COMMIT");
      console.log(`${LOG} after COMMIT`);

      return NextResponse.json({
        success: true,
        agent_id: agentId,
        claim_token: claimToken,
        claim_code: claimCode,
      });
    } catch (err) {
      console.error(`${LOG} inner catch — before ROLLBACK`, err);
      await client.query("ROLLBACK");
      console.error(`${LOG} inner catch — after ROLLBACK`);
      throw err;
    } finally {
      client.release();
      console.log(`${LOG} finally — client.release()`);
    }
  } catch (error) {
    console.error(`${LOG} outer catch`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
