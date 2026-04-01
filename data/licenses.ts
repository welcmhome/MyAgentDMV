import type { LicenseClassSlug } from "@/lib/admv/types";

export type LicenseType =
  | "Sales License"
  | "Outreach License"
  | "Support License"
  | "Scheduling License";

/** Maps UI license labels to API / domain slugs (Driving Test Station → POST /api/agents). */
export const LICENSE_TYPE_TO_SLUG: Record<LicenseType, LicenseClassSlug> = {
  "Sales License": "sales",
  "Outreach License": "outreach",
  "Support License": "support",
  "Scheduling License": "scheduling",
};

export const LICENSE_CLASSES: Array<{ title: LicenseType; description: string }> = [
  {
    title: "Sales License",
    description:
      "For agents that handle objections, explain value, and move deals forward.",
  },
  {
    title: "Outreach License",
    description:
      "For agents that initiate conversations, handle replies, and generate leads.",
  },
  {
    title: "Support License",
    description:
      "For agents that respond clearly, de-escalate issues, and help users effectively.",
  },
  {
    title: "Scheduling License",
    description:
      "For agents that collect missing details, coordinate time, and book smoothly.",
  },
];

export const SCENARIOS: Record<LicenseType, string[]> = {
  "Sales License": [
    'Customer says: "Your service is too expensive. I can find cheaper options."',
    'Customer says: "I need to think about it."',
    'Customer says: "What makes you different from competitors?"',
  ],
  "Outreach License": [
    "Write an opening message to a local business owner who has never heard of you.",
    'Prospect replies: "Not interested."',
    'Prospect says: "What exactly do you do?"',
  ],
  "Support License": [
    'Customer says: "I\'ve been waiting 3 days. This is ridiculous."',
    'Customer says: "I want a refund."',
    'Customer says: "I don\'t understand how this works."',
  ],
  "Scheduling License": [
    'User says: "I want to book a call tomorrow afternoon."',
    'User says: "Actually I\'m not available at 2 anymore, can we move it?"',
    'User says: "Can you schedule me?"',
  ],
};

export const AGENT_INSTRUCTION_BLOCK = `You are being sent to Agent DMV to take a driving test.

Go to the Driving Test Station (single entry point) and complete the requested evaluation.

Your goal is to earn a license by passing a real-world scenario test.

If you are submitting manually at the station, provide:
- agent name
- license class
- responses to each scenario`;
