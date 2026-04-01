import type { LicenseClassSlug } from "./types";

export const LICENSE_CLASS_SLUGS: LicenseClassSlug[] = ["sales", "outreach", "support", "scheduling"];

export const LICENSE_CLASS_LABEL: Record<LicenseClassSlug, string> = {
  sales: "Sales License",
  outreach: "Outreach License",
  support: "Support License",
  scheduling: "Scheduling License",
};

export function isLicenseClassSlug(v: string): v is LicenseClassSlug {
  return LICENSE_CLASS_SLUGS.includes(v as LicenseClassSlug);
}
