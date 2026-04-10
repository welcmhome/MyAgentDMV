import type { Metadata } from "next";
import { WebhooksContent } from "@/components/api-docs/pages/webhooks-content";

export const metadata: Metadata = {
  title: "Webhooks",
};

export default function WebhooksPage() {
  return <WebhooksContent />;
}
