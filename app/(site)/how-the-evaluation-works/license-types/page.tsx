import type { Metadata } from "next";
import { LicenseTypesContent } from "@/components/api-docs/pages/license-types-content";

export const metadata: Metadata = {
  title: "License Types",
};

export default function LicenseTypesPage() {
  return <LicenseTypesContent />;
}
