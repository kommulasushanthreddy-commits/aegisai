import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Eye, ShieldAlert, Lock, Activity, ArrowRight, TrendingUp, Sparkles, CheckCircle2, Play, FileText } from 'lucide-react';
import SecurityScoreRing from '../components/dashboard/SecurityScoreRing';
import AttackSourcesMap from '../components/dashboard/AttackSourcesMap';
import AnalyticsCharts from '../components/dashboard/AnalyticsCharts';
import RealTimeActivityFeed from '../components/dashboard/RealTimeActivityFeed';
import QuickActionsPanel from '../components/dashboard/QuickActionsPanel';
import ThreatTicker from '../components/common/ThreatTicker';

const DashboardPage = () => {
  const { user, role } = useAuth();

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Live Threat Ticker Banner */}
      <ThreatTicker />

      {/* 1. Premium Dashboard Header */}
      <div className="glass-card p-8 flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-black text-slate-100 tracking-tight font-sans">
            👋 Welcome back, {user?.name || 'Sushanth'}
          </h1>

          {/* Quick System Status Strip */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
              </span>
              <span>System Status: 🟢 Protected</span>
            </div>

            <div className="px-3 py-1 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#6366F1] font-bold">
              Threat Level: Low
            </div>

            <div className="px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/50 text-[#9CA3AF]">
              Last Scan: 2 min ago
            </div>
          </div>

          {/* Header Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link to="/scan/redaction" className="btn-primary">
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Run Security Scan</span>
            </Link>
            <Link to="/history" className="btn-secondary">
              <FileText className="w-4 h-4" />
              <span>View Reports</span>
            </Link>
          </div>
        </div>

        {/* Security Score Ring */}
        <div className="p-4 rounded-2xl bg-[#09090B]/80 border border-white/10 shadow-glow-cyan">
          <SecurityScoreRing score={98} />
        </div>
      </div>

      {/* 2. Quick Operations Panel */}
      <QuickActionsPanel />

      {/* 3. Four KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI 1: Threats Blocked */}
        <div className="glass-card p-6 space-y-3 hover:border-[#EF4444]/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#9CA3AF] uppercase tracking-wider">Threats Blocked</span>
            <div className="w-10 h-10 rounded-xl bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-100 font-mono">1,428</div>
          <p className="text-xs text-[#22C55E] font-mono flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +12% vs last week
          </p>
        </div>

        {/* KPI 2: Secrets Masked */}
        <div className="glass-card p-6 space-y-3 hover:border-[#00D4FF]/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#9CA3AF] uppercase tracking-wider">Secrets Masked</span>
            <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-100 font-mono">12,543</div>
          <p className="text-xs text-[#00D4FF] font-mono flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +24% vs last week
          </p>
        </div>

        {/* KPI 3: Suspicious Emails */}
        <div className="glass-card p-6 space-y-3 hover:border-[#FACC15]/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#9CA3AF] uppercase tracking-wider">Suspicious Emails</span>
            <div className="w-10 h-10 rounded-xl bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/30 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-100 font-mono">184</div>
          <p className="text-xs text-[#FACC15] font-mono">
            -5% vs last week
          </p>
        </div>

        {/* KPI 4: Risk Score */}
        <div className="glass-card p-6 space-y-3 hover:border-[#22C55E]/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#9CA3AF] uppercase tracking-wider">Risk Score</span>
            <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#22C55E] font-mono">12 / 100</div>
          <p className="text-xs text-[#22C55E] font-mono">
            -8 pts risk reduction
          </p>
        </div>

      </div>

      {/* 4. Threat Detection Line Chart + World Attack Sources Map */}
      <div className="space-y-8">
        <AnalyticsCharts />
        <AttackSourcesMap />
      </div>

      {/* 5. Scanner Action Cards (Prompt Shield + Phishing Analyzer) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Prompt Shield */}
        <div className="glass-card p-8 flex flex-col justify-between space-y-6 hover:border-[#00D4FF]/40">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center shadow-glow-cyan">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 font-bold">
                12,543 Secrets Protected
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-100 tracking-tight">🛡️ Prompt Redaction Shield</h2>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Detects API keys, PII, and credentials in prompts and replaces them with safe tokens before LLM dispatch.
            </p>
          </div>

          <Link to="/scan/redaction" className="btn-primary">
            <span>[ Launch Redaction Scanner ]</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Phishing Analyzer */}
        <div className="glass-card p-8 flex flex-col justify-between space-y-6 hover:border-[#FACC15]/40">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/30 flex items-center justify-center shadow-glow-yellow">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/30 font-bold">
                184 Threats Intercepted
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-100 tracking-tight">📧 Phishing & Threat Analyzer</h2>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Analyze suspicious emails or urgency requests with 9-vector risk scoring and explainable evidence flags.
            </p>
          </div>

          <Link to="/scan/phishing" className="btn-secondary">
            <span>[ Analyze Suspicious Message ]</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* 6. Real-Time Security Activity Feed */}
      <RealTimeActivityFeed />

    </div>
  );
};

export default DashboardPage;
