/**
 * AegisAI Phishing & Social Engineering Threat Engine
 * Evaluates messages across 7 independent risk vectors:
 * 1. Urgency & Pressure Tactics
 * 2. Credential Harvesting & Password Reset Requests
 * 3. Threat of Account Suspension / Deactivation
 * 4. Suspicious / Lookalike Sender Domains
 * 5. Suspicious Embedded Links & Action URLs
 * 6. Executive / IT Security Impersonation
 * 7. Financial & Gift Card Diversion Attempts
 */

export function analyzePhishingThreat({ message = '', sender = '', subject = '' }) {
  const fullText = `${subject} ${sender} ${message}`.toLowerCase();
  const senderLower = sender.toLowerCase();
  const flags = [];
  let score = 10;

  // 1. Extreme Urgency & Pressure Tactics (+30 pts)
  if (/urgent|action required|immediate action|within \d+ (minutes|mins|hours|hrs)|asap|emergency|critical alert|deadline|time-sensitive|act now/i.test(fullText)) {
    score += 30;
    flags.push({
      label: 'Urgent & Coercive Pressure Language',
      explanation: 'Employs artificial time pressure ("URGENT", "within 30 minutes", "Action Required") to force impulsive compliance.'
    });
  }

  // 2. Credential Harvesting & Password Reset (+30 pts)
  if (/password reset|reset your password|update credentials|verify credentials|confirm password|re-authenticate|verify your account|login link|sign-in to confirm/i.test(fullText)) {
    score += 30;
    flags.push({
      label: 'Credential Harvesting / Password Reset',
      explanation: 'Solicits user authentication credentials or directs user to a password reset flow.'
    });
  }

  // 3. Threat of Account Suspension or Deactivation (+25 pts)
  if (/account (will be|has been|is) suspended|deactivated|locked out|service termination|access revoked|permanently closed|account disabled/i.test(fullText)) {
    score += 25;
    flags.push({
      label: 'Account Suspension Threat',
      explanation: 'Threatens loss of account access or service termination if immediate action is not taken.'
    });
  }

  // 4. Suspicious / Lookalike Sender Domain (+25 pts)
  if (/(verify|auth|security|login|update|account|support|check)[-._a-z0-9]*\.(net|org|info|xyz|top|site|co|me|cc|biz|online)/i.test(senderLower) ||
      /@(gmail|yahoo|hotmail|outlook)\.com/i.test(senderLower) && /bank|paypal|it support|hr department|ceo|security team/i.test(fullText) ||
      /verify-auth-domain\.net|auth-check\.com|login-verify\.net/i.test(senderLower)) {
    score += 25;
    flags.push({
      label: 'Suspicious / Lookalike Domain',
      explanation: `Sender domain (${sender || 'unverified'}) matches known spoofed security pattern or untrusted TLD.`
    });
  }

  // 5. Embedded Action Link or Shortened URL (+20 pts)
  if (/https?:\/\/|\bclick here\b|\blogin link\b|\bbit\.ly\b|\btinyurl\b|\bverify link\b/i.test(fullText)) {
    score += 20;
    flags.push({
      label: 'Suspicious External Action Link',
      explanation: 'Contains embedded hyper-links prompting the recipient to navigate outside secure corporate boundaries.'
    });
  }

  // 6. IT / Security Impersonation (+15 pts)
  if (/security team|it department|helpdesk|system administrator|info-sec|global admin/i.test(fullText)) {
    score += 15;
    flags.push({
      label: 'IT & Security Team Impersonation',
      explanation: 'Claims authority as official internal IT/Security operations to build false credibility.'
    });
  }

  // 7. Financial & Wire Diversion Attempts (+20 pts)
  if (/wire transfer|gift card|payroll|routing number|bitcoin|invoice payment/i.test(fullText)) {
    score += 20;
    flags.push({
      label: 'Financial Diversion Attempt',
      explanation: 'Contains financial transaction keywords associated with BEC (Business Email Compromise).'
    });
  }

  // Clamp score between 5% and 98%
  score = Math.min(Math.max(score, 5), 98);

  let riskLevel = 'low';
  let recommendation = 'This message shows standard corporate communication patterns. Safe to interact, but remain vigilant.';

  if (score >= 80) {
    riskLevel = 'critical';
    recommendation = 'CRITICAL RISK: Do not click any links or enter credentials. Report this email immediately to your Security Operations Center (SOC).';
  } else if (score >= 60) {
    riskLevel = 'high';
    recommendation = 'HIGH RISK: Highly suspicious phishing markers detected. Do not click embedded links. Verify sender out-of-band.';
  } else if (score >= 35) {
    riskLevel = 'medium';
    recommendation = 'MEDIUM RISK: Inspect links carefully before clicking. Verify sender domain validity.';
  }

  if (flags.length === 0) {
    flags.push({
      label: 'Standard Communication Pattern',
      explanation: 'No high-confidence anomaly markers or social engineering indicators detected.'
    });
  }

  return {
    riskScore: score,
    riskLevel,
    flags,
    recommendation
  };
}
