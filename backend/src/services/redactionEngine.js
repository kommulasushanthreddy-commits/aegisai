/**
 * AegisAI Prompt Redaction Security Engine
 * Scans prompts for PII, secrets, credentials, and internal project codenames.
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

  const entities = [];
  let maskedPrompt = prompt;

  const patterns = [
    { type: 'EMAIL', regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g },
    { type: 'API_KEY', regex: /\b(sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{36}|AIzaSy[A-Za-z0-9_-]{33}|AKIA[0-9A-Z]{16})\b/g },
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

      if (!entities.some(e => e.span[0] === start && e.span[1] === end)) {
        entities.push({
          text: matchedText,
          type,
          span: [start, end]
        });
      }
    }
  });

  // Sort descending by position for displacement-free string replacement
  const sortedEntities = [...entities].sort((a, b) => b.span[0] - a.span[0]);
  sortedEntities.forEach(entity => {
    const placeholder = `[REDACTED_${entity.type}]`;
    maskedPrompt = maskedPrompt.substring(0, entity.span[0]) + placeholder + maskedPrompt.substring(entity.span[1]);
  });

  // Simulated AI response for masked prompt
  const aiResponseMasked = `Processed query for [REDACTED_INTERNAL_ORG]. Access credentials such as [REDACTED_API_KEY] should be rotated immediately. Contact [REDACTED_PERSON] ([REDACTED_EMAIL]) for official authorization.`;

  // Reassembled unmasked AI response for original submitter
  let aiResponseUnmasked = aiResponseMasked;
  entities.forEach(e => {
    const placeholder = `[REDACTED_${e.type}]`;
    aiResponseUnmasked = aiResponseUnmasked.replaceAll(placeholder, e.text);
  });

  return {
    maskedPrompt,
    entities,
    aiResponseMasked,
    aiResponseUnmasked
  };
}
