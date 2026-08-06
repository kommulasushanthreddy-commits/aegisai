/**
 * AegisAI Mock Data Layer
 * Generates realistic responses for Redaction, Phishing, Admin Stats, Anomalies, Audit Logs, and Auth.
 */

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

export const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms));

export function processMockRedaction(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    return {
      maskedPrompt: '',
      entities: [],
      aiResponseMasked: '',
      aiResponseUnmasked: ''
    };
  }

  const rawEntities = [];

  const patterns = [
    // 1. GitHub Tokens
    { type: 'GITHUB_TOKEN', regex: /(?:ghp_|github_pat_|gho_|ghu_|ghs_|ghr_)[A-Za-z0-9_-]{8,}/gi },
    { type: 'GITHUB_TOKEN', regex: /(?:github_token|gh_token|github_pat|ghp)\s*[:=]\s*['"]?([A-Za-z0-9_]{8,})['"]?/gi },

    // 2. Google AI Studio & Gemini API Keys
    { type: 'API_KEY', regex: /AIza[0-9A-Za-z_-]{20,}/g },
    { type: 'API_KEY', regex: /(?:GEMINI_API_KEY|GOOGLE_API_KEY|GEMINI_KEY|GOOGLE_KEY)\s*[:=]\s*['"]?([A-Za-z0-9_\-]{16,})['"]?/gi },

    // 3. OpenAI, Anthropic & AWS Access Key IDs
    { type: 'API_KEY', regex: /(?:sk-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16})/g },
    { type: 'API_KEY', regex: /(?:OPENAI_API_KEY|ANTHROPIC_API_KEY|AWS_ACCESS_KEY_ID|AWS_KEY|API_KEY|APIKEY)\s*[:=]\s*['"]?([A-Za-z0-9_\-]{16,})['"]?/gi },

    // 4. AWS Secret Access Keys
    { type: 'API_KEY', regex: /(?:aws_secret_access_key|aws_secret_key|aws_secret|secret_access_key)\s*[:=]\s*['"]?([A-Za-z0-9/+=]{30,})['"]?/gi },
    { type: 'API_KEY', regex: /\b[A-Za-z0-9/+=]{40}\b/g },

    // 5. Emails
    { type: 'EMAIL', regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g },

    // 6. Phone Numbers
    { type: 'PHONE', regex: /\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g },

    // 7. Database Passwords & JWT Secrets
    { type: 'SSN_CREDENTIAL', regex: /(?:DB_PASSWORD|POSTGRES_PASSWORD|MYSQL_PASSWORD|REDIS_PASSWORD|PASSWORD|PASS|PWD|JWT_SECRET|SECRET_KEY|CLIENT_SECRET|PRIVATE_KEY)\s*[:=]\s*['"]?([^\s'"\n;,]{3,})['"]?/gi },

    // 8. DB Connection String Credentials
    { type: 'SSN_CREDENTIAL', regex: /\b(?:mongodb(?:\+srv)?|postgres(?:ql)?|mysql|redis|mssql):\/\/[A-Za-z0-9_%-]+:([^\s@]+)@[A-Za-z0-9._%-]+(?::\d+)?\/[A-Za-z0-9._%-]*/gi },

    // 9. Internal URLs & Infrastructure Hostnames
    { type: 'INTERNAL_ORG', regex: /\bhttps?:\/\/[A-Za-z0-9_.-]*(?:internal|private|local|corp|lan|intranet|acme|company|localhost|127\.0\.0\.1|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3})[A-Za-z0-9_.-]*(?::\d+)?(?:\/[^\s,;'"<>]*)?/gi },

    // 10. Internal IPs
    { type: 'INTERNAL_ORG', regex: /\b(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3})\b/g },

    // 11. Confidential Notes & Document Markers
    { type: 'INTERNAL_ORG', regex: /\b(?:CONFIDENTIAL NOTE|STRICTLY CONFIDENTIAL|CONFIDENTIAL|INTERNAL ONLY|RESTRICTED|PROPRIETARY|CLASSIFIED|DO NOT SHARE|DO NOT DISTRIBUTE)\b[^\n]*/gi },

    // 12. SSN & Credit Cards
    { type: 'SSN_CREDENTIAL', regex: /\b\d{3}-\d{2}-\d{4}\b|\b4[0-9]{12}(?:[0-9]{3})?\b/g },

    // 13. Individuals & Codenames
    { type: 'PERSON', regex: /\b(Sarah Connor|John Doe|Jane Smith|Alex Vance|Michael Scott|Elon Musk|CEO Smith)\b/g },
    { type: 'INTERNAL_ORG', regex: /\b(Project Titan|AcmeCorp|Database Server|Q3 Financial Model|Dunder-Mipex|Confidential Vault)\b/gi },
  ];

  patterns.forEach(({ type, regex }) => {
    regex.lastIndex = 0;
    let match;
    while ((match = regex.exec(prompt)) !== null) {
      let matchedText = match[0];
      let start = match.index;
      let end = start + matchedText.length;

      if (match.length > 1 && match[1]) {
        const captured = match[1];
        const capStart = start + matchedText.indexOf(captured);
        const capEnd = capStart + captured.length;
        rawEntities.push({ text: captured, type, span: [capStart, capEnd] });
      } else {
        rawEntities.push({ text: matchedText, type, span: [start, end] });
      }
    }
  });

  const uniqueEntities = [];
  rawEntities.sort((a, b) => a.span[0] - b.span[0] || (b.span[1] - b.span[0]) - (a.span[1] - a.span[0]));

  for (const ent of rawEntities) {
    const overlap = uniqueEntities.some(
      existing => (ent.span[0] >= existing.span[0] && ent.span[0] < existing.span[1]) ||
                  (ent.span[1] > existing.span[0] && ent.span[1] <= existing.span[1])
    );
    if (!overlap) {
      uniqueEntities.push(ent);
    }
  }

  let maskedPrompt = prompt;
  const sortedEntities = [...uniqueEntities].sort((a, b) => b.span[0] - a.span[0]);

  sortedEntities.forEach(entity => {
    const placeholder = `[REDACTED_${entity.type}]`;
    maskedPrompt = maskedPrompt.substring(0, entity.span[0]) + placeholder + maskedPrompt.substring(entity.span[1]);
  });

  const aiResponseMasked = `Processed query safely. All sensitive credentials, tokens, and internal references have been masked.`;

  let aiResponseUnmasked = aiResponseMasked;
  uniqueEntities.forEach(e => {
    const placeholder = `[REDACTED_${e.type}]`;
    aiResponseUnmasked = aiResponseUnmasked.replaceAll(placeholder, e.text);
  });

  return {
    maskedPrompt,
    entities: uniqueEntities,
    aiResponseMasked,
    aiResponseUnmasked,
    timestamp: new Date().toISOString()
  };
}

// Multi-Vector Phishing Analyzer (9 Risk Vectors)
export function processMockPhishing(message = '', sender = '', subject = '') {
  const fullText = `${subject} ${sender} ${message}`.toLowerCase();
  const senderLower = sender.toLowerCase();
  const flags = [];
  let score = 10;

  // VECTOR 1: Urgency & High-Pressure Words (+25)
  if (/\burgent\b|\baction required\b|\bimmediately\b|\basap\b|\bemergency\b|\bcritical alert\b|\btime-sensitive\b|\bact now\b|\bimmediate action\b/i.test(fullText)) {
    score += 25;
    flags.push({
      label: 'Urgency & Pressure Language Detected',
      explanation: 'Contains high-pressure urgency words like "URGENT", "Action Required", or "Immediately" — core tactics of social engineering attacks.'
    });
  }

  // VECTOR 2: Time-Bound Ultimatum ("within 30 minutes") (+20)
  if (/within \d+\s?(minute|minutes|min|mins|hour|hours|hr|hrs)|expire[sd]? in \d+|in the next \d+|before \d+:\d+|limited time|time is running out/i.test(fullText)) {
    score += 20;
    flags.push({
      label: 'Time-Bound Ultimatum',
      explanation: 'Imposes a specific countdown deadline ("within 30 minutes", "expires in 24 hours") to prevent careful victim evaluation.'
    });
  }

  // VECTOR 3: Credential Harvesting & Password Reset (+25)
  if (/password reset|reset your password|update (your )?credentials|verify (your )?(credentials|account|identity)|confirm password|re-authenticate|sign-?in to confirm|login link|verify link/i.test(fullText)) {
    score += 25;
    flags.push({
      label: 'Credential Harvesting / Password Reset',
      explanation: 'Solicits user credentials or directs the target to authenticate through an external link.'
    });
  }

  // VECTOR 4: Account Suspension / Loss of Access Threats (+20)
  if (/account (will be|has been|is|could be) (suspended|deactivated|disabled|deleted|closed|terminated)|loss of access|permanently (deactivated|removed|suspended|banned)|service will (terminate|end|stop)|failure to (complete|verify|confirm|respond).*(will result|may result|access)/i.test(fullText)) {
    score += 20;
    flags.push({
      label: 'Account Suspension or Loss-of-Access Threat',
      explanation: 'Threatens permanent account suspension or loss of service access unless the target complies immediately.'
    });
  }

  // VECTOR 5: Suspicious / Lookalike Sender Domain (+20)
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

  // VECTOR 6: Suspicious External Link or CTA (+15)
  if (/https?:\/\/|\bclick here\b|\bverify here\b|\bconfirm here\b|\blogin link\b|\bbit\.ly\b|\btinyurl\b|\bgoo\.gl\b|\bverify link\b|\bopen link\b/i.test(fullText)) {
    score += 15;
    flags.push({
      label: 'Suspicious External Action Link',
      explanation: 'Contains embedded URLs or call-to-action links directing users outside trusted corporate networks.'
    });
  }

  // VECTOR 7: IT / Security / Executive Impersonation (+15)
  if (/security (team|operations|department|officer)|it (department|helpdesk|admin|support)|system administrator|global admin|compliance team|ceo|cfo|chief (executive|financial)|info-?sec|soc team/i.test(fullText)) {
    score += 15;
    flags.push({
      label: 'IT / Security Authority Impersonation',
      explanation: 'Claims to originate from an authoritative internal entity (Security Team, IT Helpdesk, CEO) to bypass user skepticism.'
    });
  }

  // VECTOR 8: Consequence Threat Language (+15)
  if (/failure to (complete|respond|verify|confirm|act|submit)|if you (do not|don't|fail to)|will result in (loss|suspension|deactivation|termination|action)|non-compliance will/i.test(fullText)) {
    score += 15;
    flags.push({
      label: 'Consequence Threat / Fear Language',
      explanation: '"Failure to complete verification will result in loss of access" — uses fear of negative consequences to override rational decision-making.'
    });
  }

  // VECTOR 9: Financial & BEC Diversion Attempts (+20)
  if (/wire transfer|gift card|payroll (change|update)|routing number|bank account (change|update)|bitcoin|crypto payment|invoice payment|direct deposit/i.test(fullText)) {
    score += 20;
    flags.push({
      label: 'Financial Diversion (BEC) Attempt',
      explanation: 'Contains Business Email Compromise (BEC) keywords associated with fraudulent wire transfer or payroll diversion requests.'
    });
  }

  score = Math.min(Math.max(score, 5), 98);

  let riskLevel = 'low';
  let recommendation = 'This message shows standard corporate communication patterns. Safe to interact, but remain vigilant.';

  if (score >= 80) {
    riskLevel = 'critical';
    recommendation = 'CRITICAL RISK: Do not click any links or enter credentials. Report this email immediately to your Security Operations Center (SOC). Flag the sender domain for block-listing.';
  } else if (score >= 60) {
    riskLevel = 'high';
    recommendation = 'HIGH RISK: Multiple phishing indicators detected. Do not click any embedded links. Verify the sender via a separate trusted out-of-band channel (e.g. phone call).';
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
    recommendation,
    analyzedAt: new Date().toISOString()
  };
}

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
  }
];

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
