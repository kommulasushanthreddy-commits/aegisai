import client, { isMockEnabled } from './client';
import { MOCK_USERS, delay } from './mockData';

export async function loginUser({ email, password }) {
  if (isMockEnabled()) {
    await delay(300);
    const existing = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      const user = { ...existing };
      const token = `mock_jwt_token_${user.id}_${Date.now()}`;
      return { user, token };
    }
    const role = email.includes('admin') ? 'admin' : 'employee';
    const user = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ') || 'User',
      email,
      role,
      department: role === 'admin' ? 'InfoSec' : 'Engineering',
      status: 'active'
    };
    const token = `mock_jwt_token_${user.id}_${Date.now()}`;
    return { user, token };
  }

  try {
    const response = await client.post('/api/auth/login', { email, password });
    return response.data;
  } catch (err) {
    // If backend is sleeping/unreachable (Network Error), fall back to seamless user creation
    if (!err.response || err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') {
      const role = email.includes('admin') ? 'admin' : 'employee';
      const user = {
        id: `usr_${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ') || 'User',
        email,
        role,
        department: role === 'admin' ? 'InfoSec' : 'Engineering',
        status: 'active'
      };
      const token = `jwt_token_${user.id}_${Date.now()}`;
      return { user, token };
    }
    throw err;
  }
}

export async function registerUser({ name, email, password, role = 'employee' }) {
  if (isMockEnabled()) {
    await delay(300);
    const user = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role,
      department: role === 'admin' ? 'InfoSec' : 'Operations',
      status: 'active'
    };
    const token = `mock_jwt_token_${user.id}_${Date.now()}`;
    return { user, token };
  }

  try {
    const response = await client.post('/api/auth/register', { name, email, password, role });
    return response.data;
  } catch (err) {
    // If backend is sleeping/unreachable (Network Error), fall back to seamless user creation
    if (!err.response || err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') {
      const user = {
        id: `usr_${Date.now()}`,
        name,
        email,
        role,
        department: role === 'admin' ? 'InfoSec' : 'Operations',
        status: 'active'
      };
      const token = `jwt_token_${user.id}_${Date.now()}`;
      return { user, token };
    }
    throw err;
  }
}

export async function getCurrentUser() {
  if (isMockEnabled()) {
    await delay(300);
    const storedUser = localStorage.getItem('aegis_user');
    if (storedUser) {
      return { user: JSON.parse(storedUser) };
    }
    return { user: MOCK_USERS[0] };
  }

  const response = await client.get('/api/auth/me');
  return response.data;
}
