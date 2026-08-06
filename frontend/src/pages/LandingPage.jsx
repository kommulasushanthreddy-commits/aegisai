import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, ShieldAlert, Lock, Activity, ArrowRight, Sparkles, CheckCircle2, FileCode, Check } from 'lucide-react';
import { AiBadge } from '../components/common/Badge';

const LandingPage = () => {
  return (
    <div className="space-y-24 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Hero Section */}
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-medium shadow-glow-teal">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI SECURITY, PRIVACY & TRUST GATEWAY</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-100 tracking-tight leading-tight">
          Protect Enterprise Data Before It Touches <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-200 to-emerald-400">Third-Party LLMs</span>
        </h1>

        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Employees paste credentials and PII into AI tools daily. AegisAI sits between your workforce and public AI models — redacting sensitive entities, analyzing phishing threats, and maintaining a tamper-evident audit log.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/register"
            className="px-8 py-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-base transition-all shadow-glow-teal flex items-center gap-2"
          >
            <span>Launch Security Gateway</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 rounded-xl bg-[#121723] hover:bg-[#182030] text-slate-200 font-semibold text-base border border-[#1e2638] transition-all"
          >
            Log in to Console
          </Link>
        </div>
      </div>

      {/* Interactive Feature Demo Highlight */}
      <div className="p-8 rounded-3xl bg-gradient-to-b from-[#121723] to-[#0a0d14] border border-[#1e2638] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Eye className="w-6 h-6 text-teal-400" />
              Live Interactive Demonstration: Prompt Redaction Shield
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Watch AegisAI automatically detect credentials and PII in real-time.
            </p>
          </div>
          <AiBadge label="Redaction Shield Engine" />
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm">
          
          <div className="p-5 rounded-2xl bg-[#0a0d14] border border-amber-500/30 space-y-3">
            <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> What the Employee Pastes
            </span>
            <div className="p-3.5 bg-[#121723] rounded-xl text-slate-300 leading-relaxed text-xs">
              "Hey ChatGPT, help me debug API key <span className="bg-rose-500/20 text-rose-300 px-1 py-0.5 rounded">sk-proj-948271048</span> for customer <span className="bg-teal-500/20 text-teal-300 px-1 py-0.5 rounded">sarah.connor@acme-corp.com</span> working on <span className="bg-purple-500/20 text-purple-300 px-1 py-0.5 rounded">Project Titan</span>."
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0a0d14] border border-teal-500/40 shadow-glow-teal space-y-3">
            <span className="text-xs text-teal-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> What the AI Model Receives
            </span>
            <div className="p-3.5 bg-[#121723] rounded-xl text-teal-200 leading-relaxed text-xs">
              "Hey ChatGPT, help me debug API key <span className="text-teal-400 font-bold">[REDACTED_API_KEY]</span> for customer <span className="text-teal-400 font-bold">[REDACTED_EMAIL]</span> working on <span className="text-teal-400 font-bold">[REDACTED_INTERNAL_ORG]</span>."
            </div>
          </div>

        </div>
      </div>

      {/* The Four Pillars Table / Grid */}
      <div className="space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-slate-100">The Four Pillars of AegisAI</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Built from the ground up for complete organizational compliance, zero data leakage, and verified trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-[#121723] border border-[#1e2638] space-y-4 hover:border-teal-500/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold">Pillar 1</span>
              <h3 className="text-lg font-bold text-slate-100 mt-1">Prompt Redaction Shield</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detects PII, secrets, credentials, and indirect project identifiers in prompts. Replaces them with placeholder tokens and unmasks replies locally.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121723] border border-[#1e2638] space-y-4 hover:border-amber-500/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">Pillar 2</span>
              <h3 className="text-lg font-bold text-slate-100 mt-1">Phishing Analyzer</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scores suspicious emails and messages with granular red flags, domain verification, and explainable risk reasons—not just a percentage.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121723] border border-[#1e2638] space-y-4 hover:border-rose-500/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-rose-400 uppercase tracking-wider font-semibold">Pillar 3</span>
              <h3 className="text-lg font-bold text-slate-100 mt-1">Anomaly Detection</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time plain-English flags for unusual account activity, bulk secret pasting, and off-hour access spikes for security administrators.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121723] border border-[#1e2638] space-y-4 hover:border-purple-500/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
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
