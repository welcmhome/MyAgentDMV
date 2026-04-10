import type { Metadata } from "next";
import { QuickstartContent } from "@/components/api-docs/pages/quickstart-content";

export const metadata: Metadata = {
  title: "Quickstart",
};

export default function QuickstartPage() {
  return <QuickstartContent />;
}
