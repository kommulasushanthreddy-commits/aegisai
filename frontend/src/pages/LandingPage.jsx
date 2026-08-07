import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, ShieldAlert, Lock, Activity, ArrowRight, Sparkles, CheckCircle2, TrendingUp, Zap } from 'lucide-react';
import { AiBadge } from '../components/common/Badge';
import SecurityFlowDiagram from '../components/graphics/SecurityFlowDiagram';
import ThreatRadarGraphic from '../components/graphics/ThreatRadarGraphic';

const LandingPage = () => {
  return (
    <div className="space-y-20 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Hero Section */}
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-xs font-mono font-bold shadow-glow-cyan">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI SECURITY, PRIVACY & TRUST GATEWAY</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-100 tracking-tight leading-tight font-sans">
          Protect Enterprise Data Before It Touches <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-teal-200 to-[#00E676]">Third-Party LLMs</span>
        </h1>

        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Employees paste credentials and PII into AI tools daily. Shield AI sits between your workforce and public AI models — redacting sensitive entities, analyzing phishing threats, and maintaining a tamper-evident audit log.
        </p>

        {/* Hero Quick Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-2">
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card text-center space-y-1 hover:border-[#00D4FF]/40 transition-all">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Security Score</span>
            <div className="text-2xl font-black text-[#00E676] font-mono">96 / 100</div>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card text-center space-y-1 hover:border-[#00D4FF]/40 transition-all">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Threats Blocked</span>
            <div className="text-2xl font-black text-slate-100 font-mono">1,428</div>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card text-center space-y-1 hover:border-[#00D4FF]/40 transition-all">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Secrets Masked</span>
            <div className="text-2xl font-black text-[#00D4FF] font-mono">12,543</div>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card text-center space-y-1 hover:border-[#00D4FF]/40 transition-all">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Success Rate</span>
            <div className="text-2xl font-black text-[#00E676] font-mono">99.8%</div>
          </div>
        </div>

        {/* Hero CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/register"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00D4FF] to-[#0099FF] text-slate-950 font-extrabold text-base transition-all transform hover:-translate-y-1 shadow-glow-cyan flex items-center gap-2"
          >
            <span>Launch Security Gateway</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 rounded-2xl bg-[#131B2F] hover:bg-[#1A253E] text-slate-200 font-semibold text-base border border-[#1E293B] transition-all transform hover:-translate-y-0.5"
          >
            Log in to Console
          </Link>
        </div>
      </div>

      {/* GRAPHIC 1: Interactive Security Flow Diagram */}
      <SecurityFlowDiagram />

      {/* GRAPHIC 2: Threat Radar & Perimeter Shield */}
      <ThreatRadarGraphic />

      {/* Interactive Feature Demo Highlight */}
      <div className="p-8 rounded-3xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D4FF]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Eye className="w-6 h-6 text-[#00D4FF]" />
              Live Interactive Demonstration: Prompt Redaction Shield
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Watch Shield AI automatically detect credentials and PII in real-time.
            </p>
          </div>
          <AiBadge label="Redaction Shield Engine" />
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm">
          
          <div className="p-5 rounded-2xl bg-[#0B1220] border border-[#FFC107]/30 space-y-3">
            <span className="text-xs text-[#FFC107] font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> What the Employee Pastes
            </span>
            <div className="p-3.5 bg-[#131B2F] rounded-xl text-slate-300 leading-relaxed text-xs">
              "Hey ChatGPT, help me debug API key <span className="bg-[#FF5252]/20 text-[#FF5252] px-1 py-0.5 rounded">sk-proj-948271048</span> for customer <span className="bg-[#00D4FF]/20 text-[#00D4FF] px-1 py-0.5 rounded">sarah.connor@acme-corp.com</span> working on <span className="bg-purple-500/20 text-purple-300 px-1 py-0.5 rounded">Project Titan</span>."
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B1220] border border-[#00D4FF]/40 shadow-glow-cyan space-y-3">
            <span className="text-xs text-[#00D4FF] font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> What the AI Model Receives
            </span>
            <div className="p-3.5 bg-[#131B2F] rounded-xl text-[#00D4FF] leading-relaxed text-xs">
              "Hey ChatGPT, help me debug API key <span className="text-[#00D4FF] font-bold">[REDACTED_API_KEY]</span> for customer <span className="text-[#00D4FF] font-bold">[REDACTED_EMAIL]</span> working on <span className="text-[#00D4FF] font-bold">[REDACTED_INTERNAL_ORG]</span>."
            </div>
          </div>

        </div>
      </div>

      {/* The Four Pillars Table / Grid */}
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-100">The Four Pillars of Shield AI</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Built from the ground up for complete organizational compliance, zero data leakage, and verified trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card space-y-4 hover:border-[#00D4FF]/50 transition-all transform hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow-cyan">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider font-semibold">Pillar 1</span>
              <h3 className="text-lg font-bold text-slate-100 mt-1">Prompt Redaction Shield</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detects PII, secrets, credentials, and indirect project identifiers in prompts. Replaces them with placeholder tokens and unmasks replies locally.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card space-y-4 hover:border-[#FFC107]/50 transition-all transform hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-[#FFC107]/10 text-[#FFC107] border border-[#FFC107]/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow-amber">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#FFC107] uppercase tracking-wider font-semibold">Pillar 2</span>
              <h3 className="text-lg font-bold text-slate-100 mt-1">Phishing Analyzer</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scores suspicious emails and messages with granular red flags, domain verification, and explainable risk reasons—not just a percentage.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card space-y-4 hover:border-[#FF5252]/50 transition-all transform hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-[#FF5252]/10 text-[#FF5252] border border-[#FF5252]/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow-red">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#FF5252] uppercase tracking-wider font-semibold">Pillar 3</span>
              <h3 className="text-lg font-bold text-slate-100 mt-1">Anomaly Detection</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time plain-English flags for unusual account activity, bulk secret pasting, and off-hour access spikes for security administrators.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card space-y-4 hover:border-purple-500/50 transition-all transform hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase tracking-wider font-semibold">Pillar 4</span>
              <h3 className="text-lg font-bold text-slate-100 mt-1">Cryptographic Audit Log</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every scan and redaction is recorded to an append-only, tamper-evident hash chain with SHA-256 integrity verification.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LandingPage;
