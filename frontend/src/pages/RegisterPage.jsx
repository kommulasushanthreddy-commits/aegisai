import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Mail, User, Eye, EyeOff, UserPlus, AlertCircle, ShieldCheck } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
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

    const res = await register(name, email, password, role);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setServerError(res.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#121723] p-8 rounded-3xl border border-[#1e2638] shadow-2xl">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-700 mx-auto flex items-center justify-center text-slate-950 font-bold shadow-glow-teal">
            <Shield className="w-7 h-7 fill-slate-950 stroke-slate-950" />
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Create Shield AI Account</h2>
          <p className="text-xs text-slate-400">Set up security profile for enterprise gateway</p>
        </div>

        {serverError && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Connor"
                className={`w-full pl-10 pr-4 py-2.5 bg-[#0a0d14] border rounded-xl text-slate-200 text-sm focus:outline-none transition-colors ${
                  errors.name ? 'border-rose-500/80 focus:border-rose-500' : 'border-[#1e2638] focus:border-teal-500/80'
                }`}
              />
            </div>
            {errors.name && <p className="text-[11px] text-rose-400 font-mono mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
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
                placeholder="sarah.connor@acme-corp.com"
                className={`w-full pl-10 pr-4 py-2.5 bg-[#0a0d14] border rounded-xl text-slate-200 text-sm focus:outline-none transition-colors ${
                  errors.email ? 'border-rose-500/80 focus:border-rose-500' : 'border-[#1e2638] focus:border-teal-500/80'
                }`}
              />
            </div>
            {errors.email && <p className="text-[11px] text-rose-400 font-mono mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
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

          {/* Role Selection */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Account Role Designation
            </label>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <label
                className={`p-3 rounded-xl border flex flex-col items-center cursor-pointer transition-all ${
                  role === 'employee'
                    ? 'bg-teal-500/10 border-teal-500/50 text-teal-300'
                    : 'bg-[#0a0d14] border-[#1e2638] text-slate-400 hover:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="employee"
                  checked={role === 'employee'}
                  onChange={() => setRole('employee')}
                  className="sr-only"
                />
                <ShieldCheck className="w-5 h-5 mb-1 text-teal-400" />
                <span className="text-xs font-bold font-mono">Employee</span>
                <span className="text-[10px] text-slate-400">Scan & Redact</span>
              </label>

              <label
                className={`p-3 rounded-xl border flex flex-col items-center cursor-pointer transition-all ${
                  role === 'admin'
                    ? 'bg-purple-500/10 border-purple-500/50 text-purple-300'
                    : 'bg-[#0a0d14] border-[#1e2638] text-slate-400 hover:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                  className="sr-only"
                />
                <Shield className="w-5 h-5 mb-1 text-purple-400" />
                <span className="text-xs font-bold font-mono">Admin (SOC)</span>
                <span className="text-[10px] text-slate-400">Full Audits & KPIs</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition-colors shadow-glow-teal flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            <span>{loading ? 'Creating Account...' : 'Register Account'}</span>
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-400 font-semibold hover:underline">
            Log In Here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
