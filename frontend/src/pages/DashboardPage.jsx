import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, ShieldAlert, Activity, ArrowRight, ShieldCheck, Lock, TrendingUp, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { RoleBadge } from '../components/common/Badge';
import SecurityGlobeGraphic from '../components/graphics/SecurityGlobeGraphic';
import AnalyticsCharts from '../components/dashboard/AnalyticsCharts';
import RecentActivityTimeline from '../components/dashboard/RecentActivityTimeline';

const DashboardPage = () => {
  const { user, role } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Header with Welcome + Live Status + Security Score 96/100 */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#131B2F] via-[#131B2F] to-[#1A253E] border border-[#1E293B] shadow-soft-card flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black text-slate-100 tracking-tight">
              Welcome Back, {user?.name || 'Security Specialist'} 👋
            </h1>
            <RoleBadge role={role} />
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E676]/10 border border-[#00E676]/30 text-[#00E676] text-xs font-mono font-bold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E676]"></span>
              </span>
              <span>Live Protection Enabled</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Gateway Session ID: <code className="text-[#00D4FF]">ses_active_9481</code>
            </span>
          </div>
        </div>

        {/* Security Score Badge Card */}
        <div className="flex items-center space-x-4 bg-[#0B1220] p-3.5 px-5 rounded-2xl border border-[#00D4FF]/30 shadow-glow-cyan">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#0099FF] text-slate-950 font-black text-lg flex items-center justify-center shadow-md">
            96
          </div>
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">SECURITY SCORE</div>
            <div className="text-sm font-extrabold text-[#00E676]">96 / 100 • EXCELLENT</div>
          </div>
        </div>
      </div>

      {/* 2. Quick Statistics Grid (4 Metric Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Threats Blocked */}
        <div className="p-5 rounded-3xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card space-y-2 hover:border-[#FF5252]/40 hover:-translate-y-1 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Threats Blocked</span>
            <div className="w-9 h-9 rounded-xl bg-[#FF5252]/10 text-[#FF5252] border border-[#FF5252]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-100 font-mono">1,428</div>
          <p className="text-[11px] text-[#00E676] font-mono flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12% this week
          </p>
        </div>

        {/* Metric 2: Sensitive Data Masked */}
        <div className="p-5 rounded-3xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card space-y-2 hover:border-[#00D4FF]/40 hover:-translate-y-1 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Secrets Protected</span>
            <div className="w-9 h-9 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-100 font-mono">12,543</div>
          <p className="text-[11px] text-[#00D4FF] font-mono">
            PII & Secret Keys Redacted
          </p>
        </div>

        {/* Metric 3: Phishing Emails Detected */}
        <div className="p-5 rounded-3xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card space-y-2 hover:border-[#FFC107]/40 hover:-translate-y-1 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Phishing Flagged</span>
            <div className="w-9 h-9 rounded-xl bg-[#FFC107]/10 text-[#FFC107] border border-[#FFC107]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-100 font-mono">184</div>
          <p className="text-[11px] text-[#FFC107] font-mono">
            High & Critical Severity
          </p>
        </div>

        {/* Metric 4: Success Rate */}
        <div className="p-5 rounded-3xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card space-y-2 hover:border-[#00E676]/40 hover:-translate-y-1 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Success Rate</span>
            <div className="w-9 h-9 rounded-xl bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-100 font-mono">99.8%</div>
          <p className="text-[11px] text-[#00E676] font-mono">
            Zero Data Leakage Verified
          </p>
        </div>

      </div>

      {/* 3. Action Cards (Prompt Shield & Threat Analyzer) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Prompt Redaction Shield Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card hover:border-[#00D4FF]/50 transition-all transform hover:-translate-y-1 group flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow-cyan">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 font-bold">
                12,543 Secrets Protected
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100">🛡️ Prompt Redaction Shield</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pasting code, financial data, or internal memos into ChatGPT/Gemini? Run it through the Redaction Shield to mask API keys, PII, and credentials before LLM dispatch.
            </p>
          </div>

          <Link
            to="/redaction"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00D4FF] to-[#0099FF] text-slate-950 font-extrabold hover:brightness-110 transition-all shadow-glow-cyan flex items-center justify-center gap-2 text-sm"
          >
            <span>[ Launch Scanner ]</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Phishing & Threat Analyzer Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card hover:border-[#FFC107]/50 transition-all transform hover:-translate-y-1 group flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#FFC107]/10 text-[#FFC107] border border-[#FFC107]/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow-amber">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#FFC107]/10 text-[#FFC107] border border-[#FFC107]/30 font-bold">
                184 Threats Intercepted
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100">⚠️ Phishing & Threat Analyzer</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Received a suspicious email, urgency reset link, or executive request? Paste the message to get immediate 9-vector threat scoring with explainable evidence flags.
            </p>
          </div>

          <Link
            to="/phishing"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-extrabold hover:brightness-110 transition-all shadow-glow-cyan flex items-center justify-center gap-2 text-sm"
          >
            <span>[ Analyze Message ]</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* 4. Visual Analytics Charts Section */}
      <AnalyticsCharts />

      {/* 5. Bottom Section: Security Globe + Recent Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivityTimeline />
        </div>
        <div className="lg:col-span-1">
          <SecurityGlobeGraphic />
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
