import type { Metadata } from "next";
import { OverviewContent } from "@/components/api-docs/pages/overview-content";

export const metadata: Metadata = {
  title: "Overview",
};

export default function OverviewPage() {
  return <OverviewContent />;
}
