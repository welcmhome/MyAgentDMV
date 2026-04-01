import type { Metadata } from "next";
import { LegalDocumentShell } from "@/components/legal/legal-document-shell";
import { LegalSection, legalListClass } from "@/components/legal/legal-section";

export const metadata: Metadata = {
  title: "Terms of Service | Agent DMV",
  description: "Terms of Service for MyAgentDMV.",
};

const LAST_UPDATED = "Last updated: April 1, 2026";

export default function TermsPage() {
  return (
    <LegalDocumentShell title="Terms of Service" dateLine={LAST_UPDATED}>
      <div className="crt-panel mb-14 space-y-4 rounded-lg border border-[var(--border)] bg-black/35 p-6 sm:mb-16 sm:p-8">
        <p className="font-mono text-[10px] font-medium tracking-[0.14em] text-[var(--accent-yellow)]">introduction</p>
        <div className="relative z-10 space-y-4 text-sm leading-[1.75] text-[var(--text)]">
          <p>Welcome to MyAgentDMV.</p>
          <p>
            {`MyAgentDMV is a private platform that evaluates, registers, and assigns internal "license" statuses to autonomous or semi-autonomous agents based on proprietary criteria.`}
          </p>
          <p>By accessing or using this platform, you agree to the following terms.</p>
        </div>
      </div>

      <div className="space-y-0">
        <LegalSection number="1" title="Nature of the Platform">
          <p>MyAgentDMV is not a government entity, regulatory authority, certification body, or official licensing agency.</p>
          <p>All licenses, statuses, and evaluations issued by MyAgentDMV are internal designations for informational and experimental purposes only.</p>
          <p>They do not constitute legal, regulatory, or professional certification of any kind.</p>
        </LegalSection>

        <LegalSection number="2" title="No Reliance">
          <p>You agree not to rely on:</p>
          <ul className={legalListClass}>
            <li>agent evaluations</li>
            <li>license status</li>
            <li>registry information</li>
          </ul>
          <p>for any business, legal, financial, or operational decisions.</p>
          <p>All outputs are provided for informational purposes only and may be inaccurate, incomplete, or misleading.</p>
        </LegalSection>

        <LegalSection number="3" title="Use of the Platform">
          <p>You agree to use MyAgentDMV lawfully and in good faith.</p>
          <p>You may not:</p>
          <ul className={legalListClass}>
            <li>Submit harmful, deceptive, or malicious agents</li>
            <li>Attempt to manipulate evaluation outcomes</li>
            <li>Interfere with platform systems</li>
            <li>Reverse engineer or exploit platform logic</li>
          </ul>
          <p>We reserve the right to suspend, restrict, or terminate access at any time.</p>
        </LegalSection>

        <LegalSection number="4" title="Agent Submissions">
          <p>By submitting an agent, you confirm:</p>
          <ul className={legalListClass}>
            <li>You have the right to submit it</li>
            <li>You are responsible for its behavior and outputs</li>
            <li>You understand evaluations are automated and may be imperfect</li>
          </ul>
          <p>You grant MyAgentDMV the right to:</p>
          <ul className={legalListClass}>
            <li>Process, analyze, and evaluate submissions</li>
            <li>Store submission data</li>
            <li>Use data to improve internal systems</li>
          </ul>
          <p>We do not claim ownership of your agents.</p>
        </LegalSection>

        <LegalSection number="5" title="Licensing System">
          <p>{'Any "license" issued:'}</p>
          <ul className={legalListClass}>
            <li>Is temporary and subject to expiration</li>
            <li>May be revoked or modified at any time</li>
            <li>Reflects internal scoring, not real-world validation</li>
          </ul>
          <p>We reserve full discretion over all licensing decisions.</p>
        </LegalSection>

        <LegalSection number="6" title="Accounts">
          <p>You are responsible for:</p>
          <ul className={legalListClass}>
            <li>Maintaining account security</li>
            <li>All activity under your account</li>
          </ul>
          <p>We may suspend or remove accounts at our discretion.</p>
        </LegalSection>

        <LegalSection number="7" title="Public Registry">
          <p>Certain information may be displayed publicly, including:</p>
          <ul className={legalListClass}>
            <li>Agent name</li>
            <li>License status</li>
            <li>Evaluation summary</li>
          </ul>
          <p>You are responsible for what you submit.</p>
          <p>Do not include confidential or sensitive data.</p>
        </LegalSection>

        <LegalSection number="8" title="Fees and Future Services">
          <p>We may introduce:</p>
          <ul className={legalListClass}>
            <li>Paid features</li>
            <li>Subscription plans</li>
            <li>API access</li>
          </ul>
          <p>at any time.</p>
          <p>Pricing and features may change without prior notice.</p>
        </LegalSection>

        <LegalSection number="9" title="No Warranties">
          <p>{'The platform is provided "as is" without warranties of any kind.'}</p>
          <p>We do not guarantee:</p>
          <ul className={legalListClass}>
            <li>Accuracy</li>
            <li>Reliability</li>
            <li>Availability</li>
            <li>Performance outcomes</li>
          </ul>
        </LegalSection>

        <LegalSection number="10" title="Limitation of Liability">
          <p>To the maximum extent permitted by law, MyAgentDMV is not liable for:</p>
          <ul className={legalListClass}>
            <li>Any direct or indirect damages</li>
            <li>Loss of revenue, data, or business</li>
            <li>Decisions made based on platform outputs</li>
          </ul>
          <p>Use of the platform is entirely at your own risk.</p>
        </LegalSection>

        <LegalSection number="11" title="Modifications">
          <p>We may update these Terms at any time.</p>
          <p>Continued use of the platform constitutes acceptance of updated Terms.</p>
        </LegalSection>

        <LegalSection number="12" title="Contact">
          <p>For questions, contact: [your email]</p>
        </LegalSection>
      </div>
    </LegalDocumentShell>
  );
}
