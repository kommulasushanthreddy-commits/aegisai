/**
 * AegisAI Mock Data Layer
 * Generates realistic responses for Redaction, Phishing, Admin Stats, Anomalies, Audit Logs, and Auth.
 */

// Initial mock users
export const MOCK_USERS = [
  {
    id: 'usr_emp_01',
    name: 'Sarah Connor',
    email: 'sarah.connor@acme-corp.com',
    role: 'employee',
    department: 'Engineering',
    createdAt: '2026-01-15T09:30:00Z',
    status: 'active'
  },
  {
    id: 'usr_adm_01',
    name: 'Alex Vance (Admin)',
    email: 'admin@aegis.security',
    role: 'admin',
    department: 'InfoSec',
    createdAt: '2025-11-01T08:00:00Z',
    status: 'active'
  },
  {
    id: 'usr_emp_02',
    name: 'Michael Scott',
    email: 'm.scott@dunder-mipex.com',
    role: 'employee',
    department: 'Sales',
    createdAt: '2026-02-10T14:15:00Z',
    status: 'flagged'
  }
];

// Helper delay simulator
export const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Redaction Processor
export function processMockRedaction(prompt) {
  const entities = [];
  let maskedPrompt = prompt;

  // Patterns for PII / Secrets / Internal references
  const patterns = [
    { type: 'EMAIL', regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g },
    { type: 'API_KEY', regex: /\b(sk-[A-Za-z0-9]{32,}|ghp_[A-Za-z0-9]{36}|AIzaSy[A-Za-z0-9_-]{33})\b/g },
    { type: 'SSN_CREDENTIAL', regex: /\b\d{3}-\d{2}-\d{4}\b|\b4[0-9]{12}(?:[0-9]{3})?\b/g },
    { type: 'PERSON', regex: /\b(Sarah Connor|John Doe|Jane Smith|Alex Vance|Michael Scott|Elon Musk|CEO Smith)\b/g },
    { type: 'INTERNAL_ORG', regex: /\b(Project Titan|AcmeCorp|Database Server 10\.0\.4\.15|Q3 Financial Model|Dunder-Mipex|Confidential Vault)\b/gi },
    { type: 'PHONE', regex: /\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g },
  ];

  patterns.forEach(({ type, regex }) => {
    let match;
    while ((match = regex.exec(prompt)) !== null) {
      const matchedText = match[0];
      const start = match.index;
      const end = start + matchedText.length;
      
      // Avoid duplicates
      if (!entities.some(e => e.span[0] === start && e.span[1] === end)) {
        entities.push({
          text: matchedText,
          type,
          span: [start, end]
        });
      }
    }
  });

  // Sort entities descending by position to replace without offset displacement
  const sortedEntities = [...entities].sort((a, b) => b.span[0] - a.span[0]);
  sortedEntities.forEach(entity => {
    const placeholder = `[REDACTED_${entity.type}]`;
    maskedPrompt = maskedPrompt.substring(0, entity.span[0]) + placeholder + maskedPrompt.substring(entity.span[1]);
  });

  // Generate plausible masked AI response
  const aiResponseMasked = `Based on the parameters provided for [REDACTED_INTERNAL_ORG], here is the optimized algorithm summary. Ensure all access keys such as [REDACTED_API_KEY] are stored in an encrypted vault, and contact [REDACTED_PERSON] ([REDACTED_EMAIL]) for compliance sign-off.`;

  // Unmasked AI response for original submitter
  let aiResponseUnmasked = aiResponseMasked;
  entities.forEach(e => {
    const placeholder = `[REDACTED_${e.type}]`;
    aiResponseUnmasked = aiResponseUnmasked.replaceAll(placeholder, e.text);
  });

  return {
    maskedPrompt: maskedPrompt !== prompt ? maskedPrompt : (entities.length ? maskedPrompt : prompt),
    entities,
    aiResponseMasked,
    aiResponseUnmasked,
    timestamp: new Date().toISOString()
  };
}

// Mock Phishing Analyzer
export function processMockPhishing(message, sender = '', subject = '') {
  const text = `${subject} ${sender} ${message}`.toLowerCase();
  const flags = [];
  let score = 15; // baseline low risk

  if (/verify your account|account suspended|immediate action|within 24 hours|urgent/i.test(text)) {
    score += 35;
    flags.push({
      label: 'Urgency & Coercion Language',
      explanation: 'Uses pressure tactics ("within 24 hours", "immediate action required") commonly seen in credential harvesting.'
    });
  }

  if (/login|signin|update-password|auth-check|security-update/i.test(text) && /http|link|click here|bit\.ly/i.test(text)) {
    score += 30;
    flags.push({
      label: 'Suspicious Authentication Link',
      explanation: 'Prompting user to click an external link to perform authentication or password reset.'
    });
  }

  if (/@(gmail|yahoo|hotmail|outlook)\.com/i.test(sender) && /bank|paypal|it support|hr department|ceo|security team/i.test(text)) {
    score += 25;
    flags.push({
      label: 'Domain Mismatch / Executive Impersonation',
      explanation: 'Sender claims to be internal IT/Executive support, but message originates from a public free email domain.'
    });
  }

  if (/wire transfer|gift card|payroll|routing number|bitcoin|payment/i.test(text)) {
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
    recommendation,
    analyzedAt: new Date().toISOString()
  };
}

// Mock Historical Scans
export const MOCK_HISTORY = [
  {
    id: 'scn_101',
    type: 'redaction',
    summary: 'Pasted Q3 Financial Model with API Key sk-9482...',
    entitiesFound: 3,
    riskLevel: 'medium',
    timestamp: '2026-08-06T12:30:00Z'
  },
  {
    id: 'scn_102',
    type: 'phishing',
    summary: 'Suspicious email from support@auth-verify-corp.net',
    riskScore: 88,
    riskLevel: 'critical',
    timestamp: '2026-08-06T11:15:00Z'
  },
  {
    id: 'scn_103',
    type: 'redaction',
    summary: 'Debugging code snippet containing database credentials',
    entitiesFound: 2,
    riskLevel: 'high',
    timestamp: '2026-08-05T16:45:00Z'
  },
  {
    id: 'scn_104',
    type: 'phishing',
    summary: 'Routine webinar invitation from partner company',
    riskScore: 12,
    riskLevel: 'low',
    timestamp: '2026-08-05T09:20:00Z'
  },
  {
    id: 'scn_105',
    type: 'redaction',
    summary: 'Employee review document containing PII & SSN',
    entitiesFound: 5,
    riskLevel: 'high',
    timestamp: '2026-08-04T14:10:00Z'
  }
];

// Mock Admin Stats
export const MOCK_ADMIN_STATS = {
  kpis: {
    totalScans: 1428,
    redactionsToday: 64,
    highRiskThisWeek: 18,
    activeAnomalies: 3
  },
  scansOverTime: [
    { date: 'Mon', count: 180, redactions: 45, phishing: 25 },
    { date: 'Tue', count: 220, redactions: 60, phishing: 35 },
    { date: 'Wed', count: 310, redactions: 85, phishing: 42 },
    { date: 'Thu', count: 290, redactions: 78, phishing: 50 },
    { date: 'Fri', count: 255, redactions: 68, phishing: 30 },
    { date: 'Sat', count: 90, redactions: 20, phishing: 10 },
    { date: 'Sun', count: 83, redactions: 18, phishing: 12 }
  ],
  riskBreakdown: [
    { label: 'Low Risk', value: 820, color: '#10b981' },
    { label: 'Medium Risk', value: 380, color: '#f59e0b' },
    { label: 'High Risk', value: 168, color: '#f97316' },
    { label: 'Critical Threat', value: 60, color: '#ef4444' }
  ]
};

// Mock Anomalies
export const MOCK_ANOMALIES = [
  {
    id: 'anm_801',
    summary: 'High volume prompt pasting (45 prompts in 3 mins) with sensitive API keys detected.',
    severity: 'critical',
    user: 'm***@dunder-mipex.com',
    userFull: 'Michael Scott',
    location: 'Frankfurt, DE (VPN)',
    timestamp: '2026-08-06T13:42:00Z',
    status: 'investigating'
  },
  {
    id: 'anm_802',
    summary: 'Off-hours batch scan submitted from unusual IP range (185.220.101.4).',
    severity: 'high',
    user: 'j***@acme-corp.com',
    userFull: 'John Doe',
    location: 'Unknown Proxy Node',
    timestamp: '2026-08-06T03:15:00Z',
    status: 'flagged'
  },
  {
    id: 'anm_803',
    summary: 'Repeated ingestion of customer PII into public LLM prompt wrapper.',
    severity: 'medium',
    user: 's***@acme-corp.com',
    userFull: 'Sarah Connor',
    location: 'San Francisco, USA',
    timestamp: '2026-08-05T18:30:00Z',
    status: 'resolved'
  }
];

// Mock Hash-Chained Audit Logs
export function generateMockAuditLogs() {
  const initialHash = '00008f3a9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e';
  const actions = [
    { action: 'PROMPT_REDACTION', actor: 's***@acme-corp.com', detail: 'Redacted 3 entities ([EMAIL], [API_KEY])' },
    { action: 'PHISHING_SCAN', actor: 'm***@dunder-mipex.com', detail: 'Analyzed message score 88 (Critical Risk)' },
    { action: 'ANOMALY_TRIGGERED', actor: 'SYSTEM_BOT', detail: 'High prompt rate detected for usr_emp_02' },
    { action: 'UNMASK_REQUEST', actor: 's***@acme-corp.com', detail: 'Authorized submitter unmasked AI response token' },
    { action: 'PROMPT_REDACTION', actor: 'a***@aegis.security', detail: 'Redacted 1 entity ([INTERNAL_ORG])' },
    { action: 'USER_ROLE_CHANGE', actor: 'a***@aegis.security', detail: 'Granted employee role to user usr_emp_03' },
    { action: 'PHISHING_SCAN', actor: 's***@acme-corp.com', detail: 'Analyzed message score 12 (Low Risk)' }
  ];

  let prevHash = initialHash;
  const items = actions.map((act, index) => {
    const idx = index + 1;
    const timestamp = new Date(Date.now() - (7 - idx) * 3600 * 1000).toISOString();
    // Simulate SHA-256 hash chaining formula: hash = sha256(prevHash + idx + timestamp + action)
    const hash = mockSha256(`${prevHash}:${idx}:${timestamp}:${act.action}:${act.actor}`);
    const item = {
      index: idx,
      timestamp,
      action: act.action,
      actor: act.actor,
      detail: act.detail,
      prevHash,
      hash
    };
    prevHash = hash;
    return item;
  });

  return {
    items,
    chainValid: true,
    totalCount: items.length
  };
}

// Simple deterministic hash helper for visual demonstration
function mockSha256(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `0000${hex}7f8e9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e`.substring(0, 64);
}
