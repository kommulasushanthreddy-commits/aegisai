import crypto from 'crypto';

/**
 * Computes a SHA-256 hash string for an audit log entry.
 * Formula: sha256(prevHash + ":" + index + ":" + timestamp + ":" + action + ":" + actor)
 */
export function computeBlockHash({ prevHash, index, timestamp, action, actor, detail = '' }) {
  const payload = `${prevHash}:${index}:${timestamp}:${action}:${actor}:${detail}`;
  return crypto.createHash('sha256').update(payload).digest('hex');
}

/**
 * Initial Genesis Hash for block 0
 */
export const GENESIS_HASH = '00008f3a9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e';
