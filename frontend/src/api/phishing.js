import client, { isMockEnabled } from './client';
import { processMockPhishing, delay } from './mockData';

export async function analyzePhishingMessage({ message, sender = '', subject = '' }) {
  if (isMockEnabled()) {
    await delay(650);
    return processMockPhishing(message, sender, subject);
  }

  const response = await client.post('/api/phishing/analyze', { message, sender, subject });
  return response.data;
}
