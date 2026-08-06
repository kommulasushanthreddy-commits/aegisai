import { computeBlockHash, GENESIS_HASH } from '../utils/cryptoHash.js';

// In-Memory fallback store for audit blocks
const auditBlocks = [
  {
    index: 1,
    timestamp: new Date(Date.now() - 3600 * 6000).toISOString(),
    action: 'PROMPT_REDACTION',
    actor: 'sarah.connor@acme-corp.com',
    detail: 'Redacted 3 entities ([EMAIL], [API_KEY])',
    prevHash: GENESIS_HASH,
    hash: computeBlockHash({
      prevHash: GENESIS_HASH,
      index: 1,
      timestamp: new Date(Date.now() - 3600 * 6000).toISOString(),
      action: 'PROMPT_REDACTION',
      actor: 'sarah.connor@acme-corp.com',
      detail: 'Redacted 3 entities ([EMAIL], [API_KEY])'
    })
  }
];

export function addAuditBlock({ action, actor, detail = '' }) {
  const lastBlock = auditBlocks[auditBlocks.length - 1];
  const prevHash = lastBlock ? lastBlock.hash : GENESIS_HASH;
  const index = auditBlocks.length + 1;
  const timestamp = new Date().toISOString();

  const hash = computeBlockHash({ prevHash, index, timestamp, action, actor, detail });

  const block = {
    index,
    timestamp,
    action,
    actor,
    detail,
    prevHash,
    hash
  };

  auditBlocks.push(block);
  return block;
}

export function getAuditBlocks() {
  const chainValid = verifyChainIntegrity(auditBlocks);
  return {
    items: auditBlocks,
    chainValid,
    totalCount: auditBlocks.length
  };
}

export function verifyChainIntegrity(blocks) {
  if (!blocks || blocks.length === 0) return true;
  let expectedPrevHash = GENESIS_HASH;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.prevHash !== expectedPrevHash) {
      return false;
    }
    const computed = computeBlockHash({
      prevHash: block.prevHash,
      index: block.index,
      timestamp: block.timestamp,
      action: block.action,
      actor: block.actor,
      detail: block.detail
    });
    if (computed !== block.hash) {
      return false;
    }
    expectedPrevHash = block.hash;
  }
  return true;
}
