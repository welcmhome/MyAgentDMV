import type { Metadata } from "next";
import { ErrorsContent } from "@/components/api-docs/pages/errors-content";

export const metadata: Metadata = {
  title: "Errors",
};

export default function ErrorsPage() {
  return <ErrorsContent />;
}
