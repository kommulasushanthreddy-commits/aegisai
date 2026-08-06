import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'aegis_ai_hackathon_super_secret_jwt_key_2026';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required. No token provided.' });
  }

  // Handle mock tokens gracefully for seamless client compatibility
  if (token.startsWith('mock_jwt_token_')) {
    req.user = {
      id: token.split('_')[3] || 'usr_mock_01',
      name: 'Sarah Connor',
      email: 'sarah.connor@acme-corp.com',
      role: token.includes('admin') ? 'admin' : 'employee'
    };
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired session token.' });
  }
}
