import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { getAuditBlocks } from '../services/auditChainService.js';

const router = Router();

// GET /api/admin/stats
router.get('/stats', authenticateToken, requireAdmin, (req, res) => {
  res.json({
    kpis: {
      totalScans: 1428,
      redactionsToday: 64,
      highRiskThisWeek: 18,
      activeAnomalies: 3
    },
    scansOverTime: [
      { date: 'Mon', count: 180, redactions: 45, phishing: 25 },
      { date: 'Tue', count: 220, redactions: 60, phishing: 35 },
      { date: 'Wed', count: 310, redactions: 85, phishing: 42 },
      { date: 'Thu', count: 290, redactions: 78, phishing: 50 },
      { date: 'Fri', count: 255, redactions: 68, phishing: 30 },
      { date: 'Sat', count: 90, redactions: 20, phishing: 10 },
      { date: 'Sun', count: 83, redactions: 18, phishing: 12 }
    ],
    riskBreakdown: [
      { label: 'Low Risk', value: 820, color: '#10b981' },
      { label: 'Medium Risk', value: 380, color: '#f59e0b' },
      { label: 'High Risk', value: 168, color: '#f97316' },
      { label: 'Critical Threat', value: 60, color: '#ef4444' }
    ]
  });
});

// GET /api/admin/anomalies
router.get('/anomalies', authenticateToken, requireAdmin, (req, res) => {
  res.json({
    items: [
      {
        id: 'anm_801',
        summary: 'High volume prompt pasting (45 prompts in 3 mins) with sensitive API keys detected.',
        severity: 'critical',
        user: 'm***@dunder-mipex.com',
        userFull: 'Michael Scott',
        location: 'Frankfurt, DE (VPN)',
        timestamp: new Date().toISOString(),
        status: 'investigating'
      },
      {
        id: 'anm_802',
        summary: 'Off-hours batch scan submitted from unusual IP range (185.220.101.4).',
        severity: 'high',
        user: 'j***@acme-corp.com',
        userFull: 'John Doe',
        location: 'Unknown Proxy Node',
        timestamp: new Date(Date.now() - 3600 * 2000).toISOString(),
        status: 'flagged'
      },
      {
        id: 'anm_803',
        summary: 'Repeated ingestion of customer PII into public LLM prompt wrapper.',
        severity: 'medium',
        user: 's***@acme-corp.com',
        userFull: 'Sarah Connor',
        location: 'San Francisco, USA',
        timestamp: new Date(Date.now() - 3600 * 24000).toISOString(),
        status: 'resolved'
      }
    ]
  });
});

// GET /api/audit-log
router.get('/audit-log', authenticateToken, requireAdmin, (req, res) => {
  const auditData = getAuditBlocks();
  res.json(auditData);
});

// GET /api/admin/users
router.get('/users', authenticateToken, requireAdmin, (req, res) => {
  res.json({
    users: [
      {
        id: 'usr_emp_01',
        name: 'Sarah Connor',
        email: 'sarah.connor@acme-corp.com',
        role: 'employee',
        department: 'Engineering',
        status: 'active'
      },
      {
        id: 'usr_adm_01',
        name: 'Alex Vance (Admin)',
        email: 'admin@aegis.security',
        role: 'admin',
        department: 'InfoSec',
        status: 'active'
      },
      {
        id: 'usr_emp_02',
        name: 'Michael Scott',
        email: 'm.scott@dunder-mipex.com',
        role: 'employee',
        department: 'Sales',
        status: 'flagged'
      }
    ]
  });
});

export default router;
