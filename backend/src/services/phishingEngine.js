/**
 * AegisAI Phishing & Social Engineering Threat Engine
 * Evaluates messages, sender domains, and urgency markers.
 */

export function analyzePhishingThreat({ message = '', sender = '', subject = '' }) {
  const fullText = `${subject} ${sender} ${message}`.toLowerCase();
  const flags = [];
  let score = 15;

  if (/verify your account|account suspended|immediate action|within 24 hours|urgent|security alert/i.test(fullText)) {
    score += 35;
    flags.push({
      label: 'Urgency & Coercion Language',
      explanation: 'Uses pressure tactics ("within 24 hours", "immediate action required") commonly seen in credential harvesting.'
    });
  }

  if (/login|signin|update-password|auth-check|security-update/i.test(fullText) && /http|link|click here|bit\.ly/i.test(fullText)) {
    score += 30;
    flags.push({
      label: 'Suspicious Authentication Link',
      explanation: 'Prompting user to click an external link to perform authentication or password reset.'
    });
  }

  if (/@(gmail|yahoo|hotmail|outlook)\.com/i.test(sender) && /bank|paypal|it support|hr department|ceo|security team/i.test(fullText)) {
    score += 25;
    flags.push({
      label: 'Domain Mismatch / Executive Impersonation',
      explanation: 'Sender claims to be internal IT/Executive support, but message originates from a public free email domain.'
    });
  }

  if (/wire transfer|gift card|payroll|routing number|bitcoin|payment/i.test(fullText)) {
    score += 20;
    flags.push({
      label: 'Financial Diversion Attempt',
      explanation: 'Requests emergency financial transfer, gift card purchase, or bank details modification.'
    });
  }

  score = Math.min(Math.max(score, 5), 98);

  let riskLevel = 'low';
  let recommendation = 'This message shows standard corporate communication patterns. Safe to interact, but remain vigilant.';

  if (score >= 80) {
    riskLevel = 'critical';
    recommendation = 'CRITICAL RISK: Do not click any links or reply. Report this email immediately to your Security Operations Center (SOC).';
  } else if (score >= 60) {
    riskLevel = 'high';
    recommendation = 'HIGH RISK: Highly suspicious message. Verify the sender identity through an out-of-band channel (e.g. phone call).';
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
