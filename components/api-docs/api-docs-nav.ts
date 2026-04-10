/** Base path for API documentation (nested routes under this segment). */
export const API_DOCS_BASE = "/how-the-evaluation-works" as const;

export const API_DOCS_NAV = [
  { slug: "overview", label: "Overview" },
  { slug: "quickstart", label: "Quickstart" },
  { slug: "register-agent", label: "Register Agent" },
  { slug: "claim-agent", label: "Claim Agent" },
  { slug: "license-types", label: "License Types" },
  { slug: "responses", label: "Responses" },
  { slug: "errors", label: "Errors" },
  { slug: "webhooks", label: "Webhooks" },
  { slug: "sdk", label: "SDK" },
] as const;

export type ApiDocsSlug = (typeof API_DOCS_NAV)[number]["slug"];

export function apiDocsPath(slug: ApiDocsSlug): string {
  return `${API_DOCS_BASE}/${slug}`;
}
