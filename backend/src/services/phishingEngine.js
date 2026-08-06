/**
 * AegisAI Phishing & Social Engineering Threat Engine
 * Evaluates messages across 9 independent risk vectors:
 * 1. Urgency & Pressure Words ("URGENT", "Action Required", "Immediately")
 * 2. Time-Bound Ultimatums ("within 30 minutes", "expire in X hours")
 * 3. Credential Harvesting & Password Reset Requests
 * 4. Threat of Account Suspension / Loss of Access
 * 5. Suspicious / Lookalike Sender Domains (verify-auth-domain.net, etc.)
 * 6. Suspicious Embedded Links & Action URLs
 * 7. IT / Executive / Security Impersonation
 * 8. Consequence Threat Language ("Failure to complete... will result in...")
 * 9. Financial & BEC Diversion Attempts
 */

export function analyzePhishingThreat({ message = '', sender = '', subject = '' }) {
  const fullText = `${subject} ${sender} ${message}`.toLowerCase();
  const senderLower = sender.toLowerCase();
  const flags = [];
  let score = 10;

  // VECTOR 1: Urgency & High-Pressure Words (+25 pts)
  if (/\burgent\b|\baction required\b|\bimmediately\b|\basap\b|\bemergency\b|\bcritical alert\b|\btime-sensitive\b|\bact now\b|\bimmediate action\b/i.test(fullText)) {
    score += 25;
    flags.push({
      label: 'Urgency & Pressure Language Detected',
      explanation: 'Contains high-pressure urgency words like "URGENT", "Action Required", or "Immediately" — core tactics of social engineering attacks.'
    });
  }

  // VECTOR 2: Time-Bound Ultimatums ("within 30 minutes", "expires in 24 hours") (+20 pts)
  if (/within \d+\s?(minute|minutes|min|mins|hour|hours|hr|hrs)|expire[sd]? in \d+|in the next \d+|before \d+:\d+|limited time|time is running out/i.test(fullText)) {
    score += 20;
    flags.push({
      label: 'Time-Bound Ultimatum',
      explanation: 'Imposes a specific countdown deadline ("within 30 minutes", "expires in 24 hours") to prevent careful victim evaluation.'
    });
  }

  // VECTOR 3: Credential Harvesting & Password Reset (+25 pts)
  if (/password reset|reset your password|update (your )?credentials|verify (your )?(credentials|account|identity)|confirm password|re-authenticate|sign-?in to confirm|login link|verify link/i.test(fullText)) {
    score += 25;
    flags.push({
      label: 'Credential Harvesting / Password Reset',
      explanation: 'Solicits user credentials or directs the target to authenticate through an external link.'
    });
  }

  // VECTOR 4: Account Suspension / Loss of Access Threats (+20 pts)
  if (/account (will be|has been|is|could be) (suspended|deactivated|disabled|deleted|closed|terminated)|loss of access|permanently (deactivated|removed|suspended|banned)|service will (terminate|end|stop)|failure to (complete|verify|confirm|respond).*(will result|may result|access)/i.test(fullText)) {
    score += 20;
    flags.push({
      label: 'Account Suspension or Loss-of-Access Threat',
      explanation: 'Threatens permanent account suspension or loss of service access unless the target complies immediately.'
    });
  }

  // VECTOR 5: Suspicious / Lookalike Sender Domain (+20 pts)
  if (/(verify|auth|security|login|update|account|support|check|help)[-._a-z0-9]*\.(net|org|info|xyz|top|site|co|me|cc|biz|online|io)/i.test(senderLower) ||
      /@(gmail|yahoo|hotmail|outlook|protonmail|icloud)\.com/i.test(senderLower) &&
      /bank|paypal|it support|hr department|ceo|security team|admin|management/i.test(fullText) ||
      /verify-auth|auth-check|login-verify|secure-update|account-verify|access-check/i.test(senderLower)) {
    score += 20;
    flags.push({
      label: 'Suspicious / Lookalike Sender Domain',
      explanation: `Sender address (${sender || 'unverified'}) uses a domain pattern associated with credential phishing campaigns or impersonates a trusted service.`
    });
  }

  // VECTOR 6: Suspicious External Link or CTA (+15 pts)
  if (/https?:\/\/|\bclick here\b|\bverify here\b|\bconfirm here\b|\blogin link\b|\bbit\.ly\b|\btinyurl\b|\bgoo\.gl\b|\bverify link\b|\bopen link\b/i.test(fullText)) {
    score += 15;
    flags.push({
      label: 'Suspicious External Action Link',
      explanation: 'Contains embedded URLs or call-to-action links directing users outside trusted corporate networks.'
    });
  }

  // VECTOR 7: IT / Security / Executive Impersonation (+15 pts)
  if (/security (team|operations|department|officer)|it (department|helpdesk|admin|support)|system administrator|global admin|compliance team|ceo|cfo|chief (executive|financial)|info-?sec|soc team/i.test(fullText)) {
    score += 15;
    flags.push({
      label: 'IT / Security Authority Impersonation',
      explanation: 'Claims to originate from an authoritative internal entity (Security Team, IT Helpdesk, CEO) to bypass user skepticism.'
    });
  }

  // VECTOR 8: Consequence Threat Language (+15 pts)
  if (/failure to (complete|respond|verify|confirm|act|submit)|if you (do not|don't|fail to)|will result in (loss|suspension|deactivation|termination|action)|non-compliance will/i.test(fullText)) {
    score += 15;
    flags.push({
      label: 'Consequence Threat / Fear Language',
      explanation: '"Failure to complete verification will result in loss of access" — uses fear of negative consequences to override rational decision-making.'
    });
  }

  // VECTOR 9: Financial & BEC Diversion Attempts (+20 pts)
  if (/wire transfer|gift card|payroll (change|update)|routing number|bank account (change|update)|bitcoin|crypto payment|invoice payment|direct deposit/i.test(fullText)) {
    score += 20;
    flags.push({
      label: 'Financial Diversion (BEC) Attempt',
      explanation: 'Contains Business Email Compromise (BEC) keywords associated with fraudulent wire transfer or payroll diversion requests.'
    });
  }

  // Clamp score between 5% and 98%
  score = Math.min(Math.max(score, 5), 98);

  let riskLevel = 'low';
  let recommendation = 'This message shows standard corporate communication patterns. Safe to interact, but remain vigilant.';

  if (score >= 80) {
    riskLevel = 'critical';
    recommendation = 'CRITICAL RISK: Do not click any links or enter credentials. Report this email immediately to your Security Operations Center (SOC). Flag the sender domain for block-listing.';
  } else if (score >= 60) {
    riskLevel = 'high';
    recommendation = 'HIGH RISK: Multiple phishing indicators detected. Do not click any embedded links. Verify the sender via a separate, trusted out-of-band channel (e.g. phone call).';
  } else if (score >= 35) {
    riskLevel = 'medium';
    recommendation = 'MEDIUM RISK: Inspect all links carefully before clicking. Verify sender domain legitimacy before taking action.';
  }

  if (flags.length === 0) {
    flags.push({
      label: 'Standard Communication Pattern',
      explanation: 'No high-confidence phishing or social engineering indicators detected in this message.'
    });
  }

  return {
    riskScore: score,
    riskLevel,
    flags,
    recommendation
  };
}
