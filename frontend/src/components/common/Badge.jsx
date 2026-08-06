import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, Info, Bot } from 'lucide-react';

export const RiskBadge = ({ level = 'low', score = null }) => {
  const normalized = level.toLowerCase();
  
  const styles = {
    low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]',
    medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.15)]',
    high: 'bg-orange-500/10 text-orange-400 border-orange-500/30 shadow-[0_0_12px_rgba(249,115,22,0.15)]',
    critical: 'bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_12px_rgba(239,68,68,0.2)] animate-pulse-glow',
  };

  const icons = {
    low: <ShieldCheck className="w-3.5 h-3.5 mr-1" />,
    medium: <AlertTriangle className="w-3.5 h-3.5 mr-1" />,
    high: <ShieldAlert className="w-3.5 h-3.5 mr-1" />,
    critical: <ShieldAlert className="w-3.5 h-3.5 mr-1" />,
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${styles[normalized] || styles.low}`}>
      {icons[normalized] || icons.low}
      {normalized} {score !== null ? `(${score}%)` : ''}
    </span>
  );
};

export const AiBadge = ({ label = 'AI Shield Active' }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-300 border border-teal-500/30 shadow-glow-teal">
      <Bot className="w-3.5 h-3.5 mr-1 text-teal-400 animate-pulse" />
      {label}
    </span>
  );
};

export const RoleBadge = ({ role = 'employee' }) => {
  const isAdmin = role.toLowerCase() === 'admin';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wide border ${
      isAdmin
        ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
        : 'bg-slate-700/50 text-slate-300 border-slate-600/50'
    }`}>
      {role}
    </span>
  );
};
