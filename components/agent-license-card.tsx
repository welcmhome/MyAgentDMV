type LicenseStatus = "APPROVED" | "FAILED" | "PENDING";

type AgentLicenseCardProps = {
  agentName: string;
  licenseClass: string;
  status: LicenseStatus;
  licenseId: string;
  issuedDate: string;
  validated?: boolean;
  size?: "sm" | "lg";
  tilt?: boolean;
  glow?: boolean;
};

const STATUS_LABEL: Record<LicenseStatus, string> = {
  APPROVED: "approved",
  FAILED: "failed",
  PENDING: "pending",
};

const STATUS_STYLES: Record<LicenseStatus, { border: string; text: string; bg: string }> = {
  APPROVED: {
    border: "rgba(16, 185, 129, 0.6)",
    text: "#34d399",
    bg: "rgba(16, 185, 129, 0.14)",
  },
  FAILED: {
    border: "rgba(239, 68, 68, 0.6)",
    text: "#f87171",
    bg: "rgba(239, 68, 68, 0.14)",
  },
  PENDING: {
    border: "rgba(251, 191, 36, 0.6)",
    text: "#fbbf24",
    bg: "rgba(251, 191, 36, 0.14)",
  },
};

export function AgentLicenseCard({
  agentName,
  licenseClass,
  status,
  licenseId,
  issuedDate,
  validated = true,
  size = "sm",
  tilt = false,
  glow = false,
}: AgentLicenseCardProps) {
  const statusTone = STATUS_STYLES[status];
  const compact = size === "sm";

  return (
    <article
      className={`crt-panel normal-case relative border-2 bg-[#141414] ${compact ? "p-3.5" : "p-5"} ${tilt ? "rotate-[-1.6deg]" : ""}`}
      style={{
        borderColor: statusTone.border,
        boxShadow: glow ? `0 14px 30px ${statusTone.bg}` : undefined,
      }}
    >
      <div className="flex items-center justify-between border-b border-dashed pb-2" style={{ borderColor: "rgba(148, 163, 184, 0.4)" }}>
        <p className="font-mono text-[11px] tracking-[0.1em] text-slate-300 lowercase">
          <span className="normal-case">Agent DMV</span> license
        </p>
        {validated ? (
          <span
            className="rounded-sm border px-1.5 py-0.5 font-mono text-[10px] font-semibold"
            style={{ borderColor: statusTone.border, color: statusTone.text, background: statusTone.bg }}
          >
            validated ✓
          </span>
        ) : null}
      </div>

      <div className={`${compact ? "mt-3 space-y-2.5" : "mt-4 space-y-3.5"}`}>
        <div className="grid grid-cols-2 gap-2 border-b pb-2.5" style={{ borderColor: "rgba(148, 163, 184, 0.25)" }}>
          <Field label="agent name" value={agentName} />
          <Field label="license class" value={licenseClass} />
        </div>

        <div className="grid grid-cols-2 gap-2 border-b pb-2.5" style={{ borderColor: "rgba(148, 163, 184, 0.25)" }}>
          <Field label="license id" value={licenseId} mono />
          <Field label="issued" value={issuedDate} mono />
        </div>

        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] tracking-wide text-slate-400">status</p>
          <span
            className={`${compact ? "text-sm" : "text-base"} rounded-sm border px-2 py-0.5 font-mono font-semibold tracking-wide`}
            style={{ borderColor: statusTone.border, color: statusTone.text, background: statusTone.bg }}
          >
            {STATUS_LABEL[status]}
          </span>
        </div>
      </div>
    </article>
  );
}

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-wide text-slate-400">{label}</p>
      <p className={`mt-1 text-sm font-semibold ${mono ? "font-mono text-[13px]" : ""}`}>{value}</p>
    </div>
  );
}
