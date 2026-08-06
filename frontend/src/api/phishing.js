import client, { isMockEnabled } from './client';
import { processMockPhishing, delay } from './mockData';

export async function analyzePhishingMessage({ message, sender = '', subject = '' }) {
  if (isMockEnabled()) {
    await delay(500);
    return processMockPhishing(message, sender, subject);
  }

  try {
    const response = await client.post('/api/phishing/analyze', { message, sender, subject });
    return response.data;
  } catch (err) {
    if (!err.response || err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') {
      return processMockPhishing(message, sender, subject);
    }
    throw err;
  }
}
