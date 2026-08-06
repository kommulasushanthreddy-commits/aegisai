import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Eye, ShieldAlert, History, LayoutDashboard, LogOut, User, Sparkles, Activity } from 'lucide-react';
import { RoleBadge } from './Badge';

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
    <nav className="sticky top-0 z-40 bg-[#0a0d14]/90 backdrop-blur-md border-b border-[#1e2638]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center text-slate-950 font-bold shadow-glow-teal group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-5 h-5 fill-slate-950 stroke-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-100 flex items-center gap-1">
                Aegis<span className="text-teal-400">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider font-mono uppercase -mt-1">
                Security & Trust Gateway
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  location.pathname === '/dashboard'
                    ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                    : 'text-slate-300 hover:bg-[#121723] hover:text-slate-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/scan/redaction"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  isActive('/scan/redaction')
                    ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30 shadow-glow-teal'
                    : 'text-slate-300 hover:bg-[#121723] hover:text-slate-100'
                }`}
              >
                <Eye className="w-4 h-4 text-teal-400" />
                <span>Redaction Shield</span>
              </Link>

              <Link
                to="/scan/phishing"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  isActive('/scan/phishing')
                    ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                    : 'text-slate-300 hover:bg-[#121723] hover:text-slate-100'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Phishing Analyzer</span>
              </Link>

              <Link
                to="/history"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  isActive('/history')
                    ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                    : 'text-slate-300 hover:bg-[#121723] hover:text-slate-100'
                }`}
              >
                <History className="w-4 h-4" />
                <span>History</span>
              </Link>

              {role === 'admin' && (
                <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                    isActive('/admin')
                      ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                      : 'text-slate-300 hover:bg-[#121723] hover:text-slate-100'
                  }`}
                >
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span>Admin Panel</span>
                </Link>
              )}
            </div>
          )}

          {/* User Profile & Actions */}
          <div className="flex items-center space-x-3">
            {/* Mock Mode Indicator */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-[#121723] border border-[#1e2638] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
              <span>MOCK SEED ACTIVE</span>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3 pl-2 border-l border-[#1e2638]">
                <div className="flex flex-col text-right hidden sm:flex">
                  <span className="text-xs font-semibold text-slate-200">{user?.name}</span>
                  <div className="flex items-center justify-end space-x-1">
                    <RoleBadge role={role} />
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-slate-100 hover:bg-[#121723] transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 rounded-lg text-sm font-medium bg-teal-500 text-slate-950 hover:bg-teal-400 transition-colors shadow-glow-teal flex items-center gap-1"
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
