const HISTORY_KEY = 'aegis_user_scan_history';

/**
 * Save a new scan record (Redaction or Phishing) to local storage
 */
export function saveScanRecord(record) {
  try {
    const existing = getScanHistory();
    const newRecord = {
      id: `scn_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      ...record
    };
    // Prepend new record so newest appears first
    const updated = [newRecord, ...existing];
    // Keep last 100 scans
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated.slice(0, 100)));
    return newRecord;
  } catch (err) {
    console.error('Failed to save scan record to history:', err);
    return null;
  }
}

/**
 * Get all stored scan records
 */
export function getScanHistory(type = 'all') {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const items = JSON.parse(raw);
    if (!Array.isArray(items)) return [];
    if (type === 'all') return items;
    return items.filter(item => item.type === type);
  } catch (err) {
    console.error('Failed to load scan history:', err);
    return [];
  }
}

/**
 * Clear all scan history
 */
export function clearScanHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
    return true;
  } catch (err) {
    console.error('Failed to clear scan history:', err);
    return false;
  }
}
