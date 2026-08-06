import client, { isMockEnabled } from './client';
import { MOCK_ADMIN_STATS, MOCK_ANOMALIES, generateMockAuditLogs, MOCK_HISTORY, MOCK_USERS, delay } from './mockData';

export async function fetchAdminStats() {
  if (isMockEnabled()) {
    await delay(500);
    return MOCK_ADMIN_STATS;
  }

  const response = await client.get('/api/admin/stats');
  return response.data;
}

export async function fetchAnomalies() {
  if (isMockEnabled()) {
    await delay(450);
    return { items: MOCK_ANOMALIES };
  }

  const response = await client.get('/api/admin/anomalies');
  return response.data;
}

export async function fetchAuditLogs(page = 1) {
  if (isMockEnabled()) {
    await delay(550);
    return generateMockAuditLogs();
  }

  const response = await client.get(`/api/audit-log?page=${page}`);
  return response.data;
}

export async function fetchScanHistory(page = 1, type = 'all') {
  if (isMockEnabled()) {
    await delay(400);
    let items = [...MOCK_HISTORY];
    if (type !== 'all') {
      items = items.filter(i => i.type === type);
    }
    return { items, total: items.length, page };
  }

  const response = await client.get(`/api/scans?page=${page}&type=${type}`);
  return response.data;
}

export async function fetchUsers() {
  if (isMockEnabled()) {
    await delay(400);
    return { users: MOCK_USERS };
  }

  const response = await client.get('/api/admin/users');
  return response.data;
}
