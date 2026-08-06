import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { validateBody } from '../middleware/validate.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'aegis_ai_hackathon_super_secret_jwt_key_2026';

// User store (in-memory fallback & mock list)
const users = [
  {
    id: 'usr_emp_01',
    name: 'Sarah Connor',
    email: 'sarah.connor@acme-corp.com',
    passwordHash: bcrypt.hashSync('password123', 10),
    role: 'employee',
    department: 'Engineering'
  },
  {
    id: 'usr_adm_01',
    name: 'Alex Vance (Admin)',
    email: 'admin@aegis.security',
    passwordHash: bcrypt.hashSync('password123', 10),
    role: 'admin',
    department: 'InfoSec'
  }
];

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['employee', 'admin']).optional().default('employee')
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

// POST /api/auth/register
router.post('/register', validateBody(registerSchema), async (req, res) => {
  const { name, email, password, role } = req.body;

  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = {
    id: `usr_${Date.now()}`,
    name,
    email,
    passwordHash,
    role: role || 'employee',
    department: role === 'admin' ? 'InfoSec' : 'Engineering'
  };

  users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  const userProfile = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    department: newUser.department
  };

  res.status(201).json({ user: userProfile, token });
});

// POST /api/auth/login
router.post('/login', validateBody(loginSchema), async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    // Demo auto-provision fallback if requested email is new during live demo
    const isDemoAdmin = email.includes('admin');
    const demoUser = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].replace('.', ' '),
      email,
      passwordHash: await bcrypt.hash(password, 10),
      role: isDemoAdmin ? 'admin' : 'employee',
      department: isDemoAdmin ? 'InfoSec' : 'Operations'
    };
    users.push(demoUser);

    const token = jwt.sign(
      { id: demoUser.id, name: demoUser.name, email: demoUser.email, role: demoUser.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      user: { id: demoUser.id, name: demoUser.name, email: demoUser.email, role: demoUser.role, department: demoUser.department },
      token
    });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role, department: user.department },
    token
  });
});

// GET /api/auth/me
router.get('/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
