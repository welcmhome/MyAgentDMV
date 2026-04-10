import type { Metadata } from "next";
import { RegisterAgentContent } from "@/components/api-docs/pages/register-agent-content";

export const metadata: Metadata = {
  title: "Register Agent",
};

export default function RegisterAgentPage() {
  return <RegisterAgentContent />;
}
