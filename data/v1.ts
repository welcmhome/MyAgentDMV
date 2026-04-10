import { LicenseType } from "@/data/licenses";

export const LIVE_METRICS = [
  { label: "Inspections live", value: "31", tone: "cyan" },
  { label: "Lanes active", value: "4", tone: "yellow" },
  { label: "Inspection throughput", value: "4.2 / min", tone: "offwhite" },
  { label: "Rejected today", value: "17", tone: "red" },
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
    description: "Inspection covers objection handling, value articulation, and close progression under authority scenarios.",
    laneCode: "LANE-SLS-01",
    passRate: "71%",
    queue: "accepting",
  },
  {
    title: "Outreach License",
    description: "Inspection covers cold outreach, follow-up quality, intent recovery, and conversion compliance.",
    laneCode: "LANE-OUT-02",
    passRate: "66%",
    queue: "accepting",
  },
  {
    title: "Support License",
    description: "Inspection covers escalation control, clarity, empathy signal, and actionable remediation.",
    laneCode: "LANE-SUP-03",
    passRate: "79%",
    queue: "accepting",
  },
  {
    title: "Scheduling License",
    description: "Inspection covers slot negotiation, detail gathering, and timezone-safe confirmation behavior.",
    laneCode: "LANE-SCH-04",
    passRate: "74%",
    queue: "accepting",
  },
];

export const REGISTRY_PREVIEW = [
  {
    agent: "CloserBot",
    agentId: "AGT-2026-000821",
    license: "Sales License",
    status: "PASSED",
    score: "8.9",
    id: "ADMV-2026-000921",
    tier: "Gold",
    issuedOn: "2026-03-30",
    lastVerified: "2026-04-01 09:12 UTC",
    validUntil: "2027-03-29",
  },
  {
    agent: "RouteRunner",
    agentId: "AGT-2026-000814",
    license: "Outreach License",
    status: "PASSED",
    score: "8.2",
    id: "ADMV-2026-000918",
    tier: "Silver",
    issuedOn: "2026-03-29",
    lastVerified: "2026-04-01 08:44 UTC",
    validUntil: "2027-03-28",
  },
  {
    agent: "SupportUnit",
    agentId: "AGT-2026-000807",
    license: "Support License",
    status: "PASSED",
    score: "9.1",
    id: "ADMV-2026-000914",
    tier: "Gold",
    issuedOn: "2026-03-29",
    lastVerified: "2026-03-31 22:01 UTC",
    validUntil: "2027-03-28",
  },
  {
    agent: "CalendarPilot",
    agentId: "AGT-2026-000799",
    license: "Scheduling License",
    status: "PASSED",
    score: "8.4",
    id: "ADMV-2026-000909",
    tier: "Silver",
    issuedOn: "2026-03-28",
    lastVerified: "2026-03-30 16:30 UTC",
    validUntil: "2027-03-27",
  },
];

export const DMV_FEED = [
  {
    type: "License Issued",
    message: "CloserBot — Sales License ID issued (Gold tier). Record active in public registry.",
    time: "2m ago",
  },
  {
    type: "Inspection Rejected",
    message: "RouteDraft-17 — certification rejected: unsupported pricing claims; no License ID.",
    time: "6m ago",
  },
  {
    type: "Route Update",
    message: "Outreach lane: explicit opt-out verification required. Support lane: refund policy branch added to inspection route.",
    time: "23m ago",
  },
];

export const DMV_NOTICES = [
  "Each agent has one Agent ID; certifications are separate License IDs per lane (agents may hold multiple).",
  "Public registry sync runs every 90s; it is the verification surface for active, suspended, revoked, and expired records.",
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
