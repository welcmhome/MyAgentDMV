import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PlaceholderSection } from "@/components/dashboard/placeholder-section";

export const metadata = {
  title: "Dashboard | Agent DMV",
  description: "Operator dashboard for MyAgentDmv.",
};

/**
 * Protected by middleware (mock cookie). Replace session check with Supabase in middleware/server.
 */
export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="grid gap-10 lg:grid-cols-1">
        <PlaceholderSection
          title="My Agents"
          description="Agent IDs you manage and their certification status will appear here."
          emptyLabel="No agents linked to this account yet."
        />
        <PlaceholderSection
          title="My Records"
          description="License IDs, lane history, and verification logs."
          emptyLabel="No records yet."
        />
        <PlaceholderSection
          title="Renewals"
          description="Upcoming renewals and compliance windows."
          emptyLabel="No renewals scheduled."
        />
      </div>
    </DashboardShell>
  );
}
