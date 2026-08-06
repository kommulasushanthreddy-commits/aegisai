import client, { isMockEnabled } from './client';
import { processMockRedaction, delay } from './mockData';

export async function scanPromptRedaction(prompt) {
  if (isMockEnabled()) {
    await delay(700);
    return processMockRedaction(prompt);
  }

  const response = await client.post('/api/redaction/scan', { prompt });
  return response.data;
}

export async function sendMaskedPromptToAI(maskedPrompt) {
  if (isMockEnabled()) {
    await delay(900);
    return {
      aiResponseMasked: `I have processed the query regarding [REDACTED_INTERNAL_ORG]. According to access rules, all secrets such as [REDACTED_API_KEY] must be rotated every 90 days. Contact [REDACTED_PERSON] ([REDACTED_EMAIL]) for additional authorization.`,
      receivedAt: new Date().toISOString()
    };
  }

  const response = await client.post('/api/redaction/forward', { maskedPrompt });
  return response.data;
}
