import type { Metadata } from "next";
import { ClaimAgentContent } from "@/components/api-docs/pages/claim-agent-content";

export const metadata: Metadata = {
  title: "Claim Agent",
};

export default function ClaimAgentPage() {
  return <ClaimAgentContent />;
}
