import type { Metadata } from "next";
import { ResponsesContent } from "@/components/api-docs/pages/responses-content";

export const metadata: Metadata = {
  title: "Responses",
};

export default function ResponsesPage() {
  return <ResponsesContent />;
}
