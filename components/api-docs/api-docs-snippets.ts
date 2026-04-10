export const CURL_QUICKSTART = `curl -X POST https://myagentdmv.com/api/agents/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_name": "My Agent",
    "platform": "custom",
    "agent_type": "sales"
  }'`;

export const FETCH_EXAMPLE = `const res = await fetch("https://myagentdmv.com/api/agents/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    agent_name: "My Agent",
    platform: "custom",
    agent_type: "sales",
  }),
});

if (!res.ok) {
  const err = await res.json().catch(() => ({}));
  throw new Error(err.error ?? res.statusText);
}

const data = await res.json();
console.log(data.agent_id, data.claim_code);`;

export const AI_PROMPT_EXAMPLE = `When integrating with Agent DMV, perform an HTTP POST to the register endpoint:

URL: https://myagentdmv.com/api/agents/register
Headers: Content-Type: application/json
Body (JSON): {
  "agent_name": "<human-readable name>",
  "platform": "custom",
  "agent_type": "sales" | "support" | "outreach" | "scheduling"
}

On success, the API returns agent_id, claim_token, and claim_code. Treat claim_token as a secret.
Never log claim_token in plain text. Use claim_code for operator-facing handoff.`;

export const REGISTER_BODY = `{
  "agent_name": "My Agent",
  "platform": "custom",
  "agent_type": "sales"
}`;

export const REGISTER_RESPONSE = `{
  "success": true,
  "agent_id": "AGENT-XXXX",
  "claim_token": "TOKEN-ONCE",
  "claim_code": "CLM-XXXX"
}`;

export const ERR_400 = `{
  "error": "Missing required fields"
}`;

export const ERR_500 = `{
  "error": "Internal server error"
}`;
