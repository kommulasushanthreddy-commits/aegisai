import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

const mockHistory = [
  {
    id: 'scn_101',
    type: 'redaction',
    summary: 'Pasted Q3 Financial Model with API Key sk-9482...',
    entitiesFound: 3,
    riskLevel: 'medium',
    timestamp: '2026-08-06T12:30:00Z'
  },
  {
    id: 'scn_102',
    type: 'phishing',
    summary: 'Suspicious email from support@auth-verify-corp.net',
    riskScore: 88,
    riskLevel: 'critical',
    timestamp: '2026-08-06T11:15:00Z'
  },
  {
    id: 'scn_103',
    type: 'redaction',
    summary: 'Debugging code snippet containing database credentials',
    entitiesFound: 2,
    riskLevel: 'high',
    timestamp: '2026-08-05T16:45:00Z'
  },
  {
    id: 'scn_104',
    type: 'phishing',
    summary: 'Routine webinar invitation from partner company',
    riskScore: 12,
    riskLevel: 'low',
    timestamp: '2026-08-05T09:20:00Z'
  }
];

// GET /api/scans
router.get('/', authenticateToken, (req, res) => {
  const page = parseInt(req.query.page || '1', 10);
  const type = req.query.type || 'all';

  let items = [...mockHistory];
  if (type !== 'all') {
    items = items.filter(i => i.type === type);
  }

  res.json({
    items,
    total: items.length,
    page
  });
});

export default router;
