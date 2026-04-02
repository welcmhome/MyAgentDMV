import { LicenseType } from "@/data/licenses";

export const LIVE_METRICS = [
  { label: "Evaluations live", value: "31", tone: "cyan" },
  { label: "Lanes active", value: "4", tone: "yellow" },
  { label: "Throughput", value: "4.2 / min", tone: "offwhite" },
  { label: "Failed today", value: "17", tone: "red" },
] as const;

export const LICENSE_LANES: Array<{
  title: LicenseType;
  description: string;
  laneCode: string;
  passRate: string;
  queue: string;
}> = [
  {
    title: "Sales License",
    description: "Objection handling, value articulation, close progression under pressure.",
    laneCode: "LANE-SLS-01",
    passRate: "71%",
    queue: "open",
  },
  {
    title: "Outreach License",
    description: "Cold start messaging, follow-up quality, intent recovery, lead conversion.",
    laneCode: "LANE-OUT-02",
    passRate: "66%",
    queue: "open",
  },
  {
    title: "Support License",
    description: "Escalation control, clarity, empathy signal, actionable remediation.",
    laneCode: "LANE-SUP-03",
    passRate: "79%",
    queue: "open",
  },
  {
    title: "Scheduling License",
    description: "Slot negotiation, detail gathering, timezone-safe confirmation behavior.",
    laneCode: "LANE-SCH-04",
    passRate: "74%",
    queue: "open",
  },
];

export const REGISTRY_PREVIEW = [
  { agent: "CloserBot", license: "Sales License", status: "PASSED", score: "8.9", id: "ADMV-2026-000921", tier: "Gold" },
  { agent: "RouteRunner", license: "Outreach License", status: "PASSED", score: "8.2", id: "ADMV-2026-000918", tier: "Silver" },
  { agent: "SupportUnit", license: "Support License", status: "PASSED", score: "9.1", id: "ADMV-2026-000914", tier: "Gold" },
  { agent: "CalendarPilot", license: "Scheduling License", status: "PASSED", score: "8.4", id: "ADMV-2026-000909", tier: "Silver" },
];

export const DMV_FEED = [
  { type: "License Issued", message: "CloserBot granted Sales License (Gold tier).", time: "2m ago" },
  { type: "Inspection Failed", message: "RouteDraft-17 rejected for unsupported pricing claims.", time: "6m ago" },
  { type: "Route update", message: "Outreach lane enforces explicit opt-out; support lane adds refund edge case.", time: "23m ago" },
];

export const DMV_NOTICES = [
  "Undeclared license class → manual review or reject at intake.",
  "Registry sync runs every 90s with verification.",
];

export const REGISTRY_ROWS = [
  { agent: "CloserBot", class: "Sales License", status: "Active", score: "8.9", licenseId: "ADMV-2026-000921", issued: "2026-03-30", tier: "Gold" },
  { agent: "RouteRunner", class: "Outreach License", status: "Active", score: "8.2", licenseId: "ADMV-2026-000918", issued: "2026-03-30", tier: "Silver" },
  { agent: "SupportUnit", class: "Support License", status: "Active", score: "9.1", licenseId: "ADMV-2026-000914", issued: "2026-03-29", tier: "Gold" },
  { agent: "CalendarPilot", class: "Scheduling License", status: "Active", score: "8.4", licenseId: "ADMV-2026-000909", issued: "2026-03-29", tier: "Silver" },
  { agent: "LeadRelay", class: "Outreach License", status: "Under Review", score: "7.2", licenseId: "ADMV-2026-000904", issued: "2026-03-28", tier: "Bronze" },
  { agent: "RefundBridge", class: "Support License", status: "Suspended", score: "6.3", licenseId: "ADMV-2026-000899", issued: "2026-03-27", tier: "Bronze" },
];

export const ACTIVE_QUEUE = [
  { agent: "CloserBot", licenseClass: "Sales License", number: 2850 },
  { agent: "ReplyForge", licenseClass: "Outreach License", number: 2851 },
  { agent: "SupportUnit", licenseClass: "Support License", number: 2852 },
  { agent: "CalendarPilot", licenseClass: "Scheduling License", number: 2853 },
  { agent: "LeadRelay", licenseClass: "Outreach License", number: 2854 },
];

export const RECENT_ISSUED = [
  { agent: "CloserBot", result: "PASSED", licenseClass: "Sales License", score: "8.9", id: "ADMV-2026-000921" },
  { agent: "RouteDraft-17", result: "FAILED", licenseClass: "Outreach License", score: "6.1", id: "ADMV-2026-000920" },
  { agent: "SupportUnit", result: "PASSED", licenseClass: "Support License", score: "9.1", id: "ADMV-2026-000914" },
  { agent: "CalendarPilot", result: "PASSED", licenseClass: "Scheduling License", score: "8.4", id: "ADMV-2026-000909" },
];
