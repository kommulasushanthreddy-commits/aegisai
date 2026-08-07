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

import { getScanHistory, clearScanHistory } from '../utils/historyStorage';

export async function fetchScanHistory(page = 1, type = 'all') {
  const userScans = getScanHistory(type);

  if (isMockEnabled() || userScans.length > 0) {
    await delay(200);
    return {
      items: userScans,
      total: userScans.length,
      page
    };
  }

  try {
    const response = await client.get(`/api/scans?page=${page}&type=${type}`);
    return response.data;
  } catch (err) {
    return { items: userScans, total: userScans.length, page };
  }
}

export async function fetchUsers() {
  if (isMockEnabled()) {
    await delay(400);
    return { users: MOCK_USERS };
  }

  const response = await client.get('/api/admin/users');
  return response.data;
}
