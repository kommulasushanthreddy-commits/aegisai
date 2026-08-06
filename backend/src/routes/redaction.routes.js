import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../middleware/validate.js';
import { authenticateToken } from '../middleware/auth.js';
import { scanAndRedactPrompt } from '../services/redactionEngine.js';
import { addAuditBlock } from '../services/auditChainService.js';

const router = Router();

const scanSchema = z.object({
  prompt: z.string().min(1, 'Prompt content is required')
});

const forwardSchema = z.object({
  maskedPrompt: z.string().min(1, 'Masked prompt content is required')
});

// POST /api/redaction/scan
router.post('/scan', authenticateToken, validateBody(scanSchema), (req, res) => {
  const { prompt } = req.body;
  const result = scanAndRedactPrompt(prompt);

  // Record event to hash-chained audit log
  const actor = req.user?.email || 'anonymous@acme-corp.com';
  const entityCount = result.entities.length;
  addAuditBlock({
    action: 'PROMPT_REDACTION',
    actor,
    detail: `Redacted ${entityCount} sensitive entity span${entityCount !== 1 ? 's' : ''}`
  });

  res.json({
    maskedPrompt: result.maskedPrompt,
    entities: result.entities,
    aiResponseMasked: result.aiResponseMasked,
    aiResponseUnmasked: result.aiResponseUnmasked,
    timestamp: new Date().toISOString()
  });
});

// POST /api/redaction/forward
router.post('/forward', authenticateToken, validateBody(forwardSchema), (req, res) => {
  const { maskedPrompt } = req.body;

  const actor = req.user?.email || 'anonymous@acme-corp.com';
  addAuditBlock({
    action: 'AI_GATEWAY_FORWARD',
    actor,
    detail: 'Forwarded safe masked prompt to AI Model Gateway'
  });

  res.json({
    aiResponseMasked: `Processed query for [REDACTED_INTERNAL_ORG]. Access credentials such as [REDACTED_API_KEY] should be rotated immediately. Contact [REDACTED_PERSON] ([REDACTED_EMAIL]) for official authorization.`,
    receivedAt: new Date().toISOString()
  });
});

export default router;
