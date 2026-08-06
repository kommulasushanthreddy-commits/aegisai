import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../middleware/validate.js';
import { authenticateToken } from '../middleware/auth.js';
import { analyzePhishingThreat } from '../services/phishingEngine.js';
import { addAuditBlock } from '../services/auditChainService.js';

const router = Router();

const analyzeSchema = z.object({
  message: z.string().min(1, 'Message body is required'),
  sender: z.string().optional().default(''),
  subject: z.string().optional().default('')
});

// POST /api/phishing/analyze
router.post('/analyze', authenticateToken, validateBody(analyzeSchema), (req, res) => {
  const { message, sender, subject } = req.body;
  const result = analyzePhishingThreat({ message, sender, subject });

  const actor = req.user?.email || 'anonymous@acme-corp.com';
  addAuditBlock({
    action: 'PHISHING_ANALYSIS',
    actor,
    detail: `Analyzed message score ${result.riskScore}% (${result.riskLevel.toUpperCase()})`
  });

  res.json({
    riskScore: result.riskScore,
    riskLevel: result.riskLevel,
    flags: result.flags,
    recommendation: result.recommendation,
    analyzedAt: new Date().toISOString()
  });
});

export default router;
