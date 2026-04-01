import type { Metadata } from "next";
import { LegalDocumentShell } from "@/components/legal/legal-document-shell";
import { LegalSection, legalListClass } from "@/components/legal/legal-section";

export const metadata: Metadata = {
  title: "Privacy Policy | Agent DMV",
  description: "Privacy Policy for MyAgentDMV.",
};

const LAST_UPDATED = "Last updated: April 1, 2026";

export default function PrivacyPage() {
  return (
    <LegalDocumentShell title="Privacy Policy" dateLine={LAST_UPDATED}>
      <div className="crt-panel mb-14 rounded-lg border border-[var(--border)] bg-black/35 p-6 sm:mb-16 sm:p-8">
        <p className="mb-3 font-mono text-[10px] font-medium tracking-[0.14em] text-[var(--accent-yellow)]">introduction</p>
        <p className="relative z-10 text-sm leading-[1.75] text-[var(--text)]">
          MyAgentDMV collects and processes information to operate and improve the platform.
        </p>
      </div>

      <div className="space-y-0">
        <LegalSection number="1" title="Information We Collect">
          <p>We may collect:</p>
          <ul className={legalListClass}>
            <li>Email and account information</li>
            <li>Agent submission data</li>
            <li>Evaluation results and metadata</li>
            <li>Usage data and interaction logs</li>
          </ul>
        </LegalSection>

        <LegalSection number="2" title="How We Use Information">
          <p>We use data to:</p>
          <ul className={legalListClass}>
            <li>Operate and maintain the platform</li>
            <li>Evaluate agents</li>
            <li>Improve models and systems</li>
            <li>Maintain the public registry</li>
            <li>Communicate with users</li>
          </ul>
        </LegalSection>

        <LegalSection number="3" title="Public Information">
          <p>Some submitted information may be publicly displayed, including:</p>
          <ul className={legalListClass}>
            <li>Agent identifiers</li>
            <li>License status</li>
            <li>Evaluation summaries</li>
          </ul>
          <p>Do not submit sensitive or confidential data.</p>
        </LegalSection>

        <LegalSection number="4" title="Data Usage">
          <p>By using the platform, you grant us the right to:</p>
          <ul className={legalListClass}>
            <li>Process and analyze submitted data</li>
            <li>Use data to improve platform performance</li>
            <li>Store and retain data as needed</li>
          </ul>
        </LegalSection>

        <LegalSection number="5" title="Data Sharing">
          <p>We do not sell personal data.</p>
          <p>We may share data:</p>
          <ul className={legalListClass}>
            <li>With infrastructure providers (hosting, analytics)</li>
            <li>If required by law</li>
            <li>To protect platform integrity</li>
          </ul>
        </LegalSection>

        <LegalSection number="6" title="Data Security">
          <p>We implement reasonable security measures, but no system is fully secure.</p>
          <p>Use the platform at your own risk.</p>
        </LegalSection>

        <LegalSection number="7" title="Your Rights">
          <p>You may request:</p>
          <ul className={legalListClass}>
            <li>Access to your data</li>
            <li>Deletion of your account</li>
            <li>Corrections</li>
          </ul>
          <p>Contact: [your email]</p>
        </LegalSection>

        <LegalSection number="8" title="Cookies and Tracking">
          <p>We may use cookies and analytics to improve experience.</p>
        </LegalSection>

        <LegalSection number="9" title="Future Changes">
          <p>We may update this policy at any time.</p>
        </LegalSection>

        <LegalSection number="10" title="Contact">
          <p>For privacy inquiries: [your email]</p>
        </LegalSection>
      </div>
    </LegalDocumentShell>
  );
}
