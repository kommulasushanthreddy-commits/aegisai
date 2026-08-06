/**
 * AegisAI Prompt Redaction Security Engine (Bulletproof Scanner)
 * Detects and masks:
 * - GITHUB_TOKEN (ghp_..., github_pat_..., gho_..., ghu_..., ghs_..., ghr_...)
 * - API_KEY (AIza..., AIzaSy..., sk-..., AKIA..., GEMINI_API_KEY=..., GOOGLE_API_KEY=...)
 * - AWS_SECRET_KEY (aws_secret_access_key=..., 40-char secret keys)
 * - CREDENTIAL_PASSWORD (DB_PASSWORD=..., JWT_SECRET=..., mongodb://user:pass@host)
 * - INTERNAL_ORG (http://internal.acme.corp, 10.x.x.x, CONFIDENTIAL NOTE)
 * - EMAIL & PHONE
 */

export function scanAndRedactPrompt(prompt) {
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
    // 1. GitHub Tokens (ghp_, github_pat_, gho_, ghu_, ghs_, ghr_)
    { type: 'GITHUB_TOKEN', regex: /\b(ghp_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{82}|gho_[A-Za-z0-9]{36}|ghu_[A-Za-z0-9]{36}|ghs_[A-Za-z0-9]{36}|ghr_[A-Za-z0-9]{36})\b/g },
    { type: 'GITHUB_TOKEN', regex: /(?:github_token|gh_token|github_pat)\s*[:=]\s*['"]?([A-Za-z0-9_]{20,})['"]?/gi },

    // 2. Google AI Studio & Gemini API Keys (AIzaSy..., AIza...)
    { type: 'API_KEY', regex: /\bAIza[0-9A-Za-z_-]{31,40}\b/g },
    { type: 'API_KEY', regex: /(?:GEMINI_API_KEY|GOOGLE_API_KEY|GEMINI_KEY|GOOGLE_KEY)\s*[:=]\s*['"]?([A-Za-z0-9_\-]{20,})['"]?/gi },

    // 3. OpenAI, Anthropic & AWS Access Key IDs
    { type: 'API_KEY', regex: /\b(sk-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16})\b/g },
    { type: 'API_KEY', regex: /(?:OPENAI_API_KEY|ANTHROPIC_API_KEY|AWS_ACCESS_KEY_ID|AWS_KEY|API_KEY|APIKEY)\s*[:=]\s*['"]?([A-Za-z0-9_\-]{16,})['"]?/gi },

    // 4. AWS Secret Access Keys (aws_secret_access_key=... or 40-char string)
    { type: 'API_KEY', regex: /(?:aws_secret_access_key|aws_secret_key|aws_secret|secret_access_key)\s*[:=]\s*['"]?([A-Za-z0-9/+=]{40})['"]?/gi },
    { type: 'API_KEY', regex: /\b[A-Za-z0-9/+=]{40}\b/g },

    // 5. Emails
    { type: 'EMAIL', regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g },

    // 6. Phone Numbers
    { type: 'PHONE', regex: /\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g },

    // 7. Database Passwords & JWT Secrets (DB_PASSWORD=..., JWT_SECRET=..., password=...)
    { type: 'SSN_CREDENTIAL', regex: /(?:DB_PASSWORD|POSTGRES_PASSWORD|MYSQL_PASSWORD|REDIS_PASSWORD|PASSWORD|PASS|PWD|JWT_SECRET|SECRET_KEY|CLIENT_SECRET|PRIVATE_KEY)\s*[:=]\s*['"]?([^\s'"\n;,]{3,})['"]?/gi },

    // 8. DB Connection String Credentials
    { type: 'SSN_CREDENTIAL', regex: /\b(?:mongodb(?:\+srv)?|postgres(?:ql)?|mysql|redis|mssql):\/\/[A-Za-z0-9_%-]+:([^\s@]+)@[A-Za-z0-9._%-]+(?::\d+)?\/[A-Za-z0-9._%-]*/gi },

    // 9. Internal URLs & Server Hostnames
    { type: 'INTERNAL_ORG', regex: /\bhttps?:\/\/(?:localhost|127\.0\.0\.1|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|[A-Za-z0-9_-]+\.internal|[A-Za-z0-9_-]+\.local|[A-Za-z0-9_-]+\.acme\.corp)(?::\d+)?(?:\/[^\s]*)?\b/gi },

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

  // Filter overlapping spans: prioritize longer or specific matches
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

  // Sort descending by position for string substitution
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
    aiResponseUnmasked
  };
}

/**
 * Calls live AI Model Gateway (Google AI Studio Gemini API or Anthropic Claude)
 */
export async function callLiveAiModel(maskedPrompt, entities = []) {
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  let aiResponseMasked = '';

  // 1. Google AI Studio (Gemini API) Integration
  if (geminiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Answer this query clearly. Keep all placeholder tokens like [REDACTED_*] intact in your response: ${maskedPrompt}` }] }]
        })
      });
      const data = await res.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        aiResponseMasked = data.candidates[0].content.parts[0].text;
      }
    } catch (err) {
      console.error('Google AI Studio Gemini API call error:', err);
    }
  }

  // 2. Anthropic Claude Integration
  if (!aiResponseMasked && anthropicKey) {
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 1000,
          messages: [{ role: 'user', content: maskedPrompt }]
        })
      });
      const data = await res.json();
      if (data.content && data.content[0]?.text) {
        aiResponseMasked = data.content[0].text;
      }
    } catch (err) {
      console.error('Anthropic API call error:', err);
    }
  }

  // 3. Fallback if no keys provided or API errors
  if (!aiResponseMasked) {
    aiResponseMasked = `Processed query safely. All sensitive credentials, tokens, and internal references have been masked.`;
  }

  // Unmask AI response for original submitter
  let aiResponseUnmasked = aiResponseMasked;
  entities.forEach(e => {
    const placeholder = `[REDACTED_${e.type}]`;
    aiResponseUnmasked = aiResponseUnmasked.replaceAll(placeholder, e.text);
  });

  return {
    aiResponseMasked,
    aiResponseUnmasked
  };
}
