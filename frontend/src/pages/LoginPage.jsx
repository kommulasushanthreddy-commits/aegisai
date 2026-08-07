import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Mail, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { AiBadge } from '../components/common/Badge';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    const res = await login(email, password);
    if (res.success) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } else {
      setServerError(res.error || 'Invalid credentials');
    }
  };

  // Quick Demo Shortcut Logins
  const handleQuickLogin = async (demoRole) => {
    const demoEmail = demoRole === 'admin' ? 'admin@aegis.security' : 'sarah.connor@acme-corp.com';
    setEmail(demoEmail);
    setPassword('password123');
    const res = await login(demoEmail, 'password123');
    if (res.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#121723] p-8 rounded-3xl border border-[#1e2638] shadow-2xl relative">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-700 mx-auto flex items-center justify-center text-slate-950 font-bold shadow-glow-teal">
            <Shield className="w-7 h-7 fill-slate-950 stroke-slate-950" />
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Access Shield AI Console</h2>
          <p className="text-xs text-slate-400">Enter your credentials to manage AI security policy</p>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          
          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Corporate Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={`w-full pl-10 pr-4 py-2.5 bg-[#0a0d14] border rounded-xl text-slate-200 text-sm focus:outline-none transition-colors ${
                  errors.email ? 'border-rose-500/80 focus:border-rose-500' : 'border-[#1e2638] focus:border-teal-500/80'
                }`}
              />
            </div>
            {errors.email && <p className="text-[11px] text-rose-400 font-mono mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2.5 bg-[#0a0d14] border rounded-xl text-slate-200 text-sm focus:outline-none transition-colors ${
                  errors.password ? 'border-rose-500/80 focus:border-rose-500' : 'border-[#1e2638] focus:border-teal-500/80'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-[11px] text-rose-400 font-mono mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition-colors shadow-glow-teal flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
          </button>
        </form>

        {/* Demo Quick Logins */}
        <div className="pt-4 border-t border-[#1e2638] space-y-2 text-center">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Quick Demo Persona Sign-In:
          </span>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => handleQuickLogin('employee')}
              className="px-3 py-2 rounded-lg bg-[#0a0d14] border border-teal-500/30 text-teal-300 text-xs font-mono font-medium hover:bg-teal-500/10 transition-colors"
            >
              Demo Employee
            </button>
            <button
              onClick={() => handleQuickLogin('admin')}
              className="px-3 py-2 rounded-lg bg-[#0a0d14] border border-purple-500/30 text-purple-300 text-xs font-mono font-medium hover:bg-purple-500/10 transition-colors"
            >
              Demo Admin (SOC)
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400 pt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-teal-400 font-semibold hover:underline">
            Create One Here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
