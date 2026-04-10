import { redirect } from "next/navigation";
import { apiDocsPath } from "@/components/api-docs/api-docs-nav";

export default function ApiDocsIndexPage() {
  redirect(apiDocsPath("overview"));
}
