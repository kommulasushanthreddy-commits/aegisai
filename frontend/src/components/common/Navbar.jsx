import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Eye, ShieldAlert, History, LayoutDashboard, LogOut, Activity, Sparkles, BarChart2 } from 'lucide-react';
import { RoleBadge } from './Badge';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, isAuthenticated, logout, role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#09090B]/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#0099FF] flex items-center justify-center text-slate-950 font-bold shadow-glow-cyan group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-5 h-5 fill-slate-950 stroke-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-100 flex items-center gap-1">
                Aegis<span className="text-[#00D4FF]">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider font-mono uppercase -mt-1">
                Security Gateway
              </span>
            </div>
          </Link>

          {/* Navigation Links with Icons & Glow Highlights */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-1.5 font-mono text-xs">
              <Link
                to="/dashboard"
                className={`px-3.5 py-2 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                  location.pathname === '/dashboard'
                    ? 'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/40 shadow-glow-cyan'
                    : 'text-slate-300 hover:bg-[#111827] hover:text-slate-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-[#00D4FF]" />
                <span>🏠 Dashboard</span>
              </Link>

              <Link
                to="/scan/redaction"
                className={`px-3.5 py-2 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                  isActive('/scan/redaction')
                    ? 'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/40 shadow-glow-cyan'
                    : 'text-slate-300 hover:bg-[#111827] hover:text-slate-100'
                }`}
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>🛡️ Shield</span>
              </Link>

              <Link
                to="/scan/phishing"
                className={`px-3.5 py-2 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                  isActive('/scan/phishing')
                    ? 'bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/40 shadow-glow-yellow'
                    : 'text-slate-300 hover:bg-[#111827] hover:text-slate-100'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>📧 Phishing</span>
              </Link>

              <Link
                to="/history"
                className={`px-3.5 py-2 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                  isActive('/history')
                    ? 'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/40 shadow-glow-cyan'
                    : 'text-slate-300 hover:bg-[#111827] hover:text-slate-100'
                }`}
              >
                <History className="w-4 h-4 text-emerald-400" />
                <span>📜 History</span>
              </Link>

              {role === 'admin' && (
                <Link
                  to="/admin"
                  className={`px-3.5 py-2 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                    isActive('/admin')
                      ? 'bg-purple-500/10 text-purple-300 border border-purple-500/40 shadow-glow-indigo'
                      : 'text-slate-300 hover:bg-[#111827] hover:text-slate-100'
                  }`}
                >
                  <BarChart2 className="w-4 h-4 text-purple-400" />
                  <span>📊 Analytics</span>
                </Link>
              )}
            </div>
          )}

          {/* User Profile, Theme Toggle & Status */}
          <div className="flex items-center space-x-3">
            
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Live Status Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
              </span>
              <span className="font-bold">🟢 Live Protection Enabled</span>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3 pl-2 border-l border-slate-800">
                <div className="flex flex-col text-right hidden sm:flex">
                  <span className="text-xs font-semibold text-slate-200">{user?.name}</span>
                  <div className="flex items-center justify-end space-x-1">
                    <RoleBadge role={role} />
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 rounded-xl text-slate-400 hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-slate-300 hover:text-slate-100 hover:bg-[#111827] transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="btn-primary py-2 px-4 text-xs font-mono"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Started</span>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
