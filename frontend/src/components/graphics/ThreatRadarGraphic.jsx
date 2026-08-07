import React from 'react';
import { ShieldCheck, ShieldAlert, Activity, AlertOctagon, CheckCircle2, Lock } from 'lucide-react';

const ThreatRadarGraphic = () => {
  return (
    <div className="p-8 rounded-3xl bg-[#121723] border border-[#1e2638] shadow-2xl space-y-6 relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e2638] pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-400" />
            Live Perimeter Threat Radar & Defense Shield
          </h3>
          <p className="text-xs text-slate-400">
            Real-time visualization of corporate network boundary inspection and zero-trust policy enforcement.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>SHIELD STATUS: OPTIMAL</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        
        {/* Left Column: Visual Radar Target */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center p-6 bg-[#0a0d14] rounded-2xl border border-[#1e2638] relative">
          <div className="relative w-48 h-48 flex items-center justify-center">
            
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border border-teal-500/30 animate-pulse"></div>
            
            {/* Middle Ring */}
            <div className="absolute inset-4 rounded-full border border-teal-500/20"></div>
            
            {/* Inner Ring */}
            <div className="absolute inset-10 rounded-full border border-teal-500/40"></div>
            
            {/* Crosshairs */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-teal-500/20 -translate-x-1/2"></div>
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-teal-500/20 -translate-y-1/2"></div>

            {/* Scanning Radar Line */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-500/20 via-transparent to-transparent animate-spin origin-center"></div>

            {/* Target Ping Points */}
            <div className="absolute top-10 left-12 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shadow-glow-amber"></div>
            <div className="absolute bottom-12 right-14 w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping shadow-glow-red"></div>
            <div className="absolute top-20 right-10 w-2 h-2 rounded-full bg-teal-400"></div>

            {/* Center Core */}
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400 text-teal-300 flex items-center justify-center z-10 shadow-glow-teal">
              <Lock className="w-6 h-6" />
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-400 mt-4 tracking-widest uppercase">
            Perimeter Security Radar
          </span>
        </div>

        {/* Right Columns: Security Metrics & Real-time Safeguards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
            
            <div className="p-3.5 rounded-xl bg-[#0a0d14] border border-[#1e2638] space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">Detection Speed</span>
              <div className="text-lg font-bold text-teal-400">12 ms</div>
              <span className="text-[10px] text-slate-500">Zero latency overhead</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0a0d14] border border-[#1e2638] space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">Intercept Accuracy</span>
              <div className="text-lg font-bold text-emerald-400">99.8%</div>
              <span className="text-[10px] text-slate-500">Multi-pass regex engine</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0a0d14] border border-[#1e2638] space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 uppercase">Hash Chain Integrity</span>
              <div className="text-lg font-bold text-purple-400">SHA-256</div>
              <span className="text-[10px] text-slate-500">Tamper-proof audit log</span>
            </div>

          </div>

          {/* Key Compliance Graphic Badges */}
          <div className="p-4 rounded-xl bg-[#0a0d14] border border-[#1e2638] space-y-2">
            <span className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
              Enforced Compliance Guidelines
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> SOC2 Type II Ready
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> HIPAA PII Masked
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> ISO 27001 Gateway
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ThreatRadarGraphic;
