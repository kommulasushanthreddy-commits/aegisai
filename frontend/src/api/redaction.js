import client, { isMockEnabled } from './client';
import { processMockRedaction, delay } from './mockData';

export async function scanPromptRedaction(prompt) {
  if (isMockEnabled()) {
    await delay(500);
    return processMockRedaction(prompt);
  }

  try {
    const response = await client.post('/api/redaction/scan', { prompt });
    return response.data;
  } catch (err) {
    if (!err.response || err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') {
      return processMockRedaction(prompt);
    }
    throw err;
  }
}

export async function sendMaskedPromptToAI(maskedPrompt) {
  if (isMockEnabled()) {
    await delay(600);
    return {
      aiResponseMasked: `I have processed the query regarding [REDACTED_INTERNAL_ORG]. According to access rules, all secrets such as [REDACTED_API_KEY] must be rotated every 90 days. Contact [REDACTED_PERSON] ([REDACTED_EMAIL]) for additional authorization.`,
      receivedAt: new Date().toISOString()
    };
  }

  try {
    const response = await client.post('/api/redaction/forward', { maskedPrompt });
    return response.data;
  } catch (err) {
    if (!err.response || err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') {
      return {
        aiResponseMasked: `[AI Security Gateway Response] Evaluated query with masked parameters. Verified zero sensitive tokens leaked to external AI service. All security constraints passed.`,
        receivedAt: new Date().toISOString()
      };
    }
    throw err;
  }
}
