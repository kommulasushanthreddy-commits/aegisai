import React from 'react';
import { ShieldAlert, ShieldCheck, Zap } from 'lucide-react';

const ThreatTicker = () => {
  return (
    <div className="bg-[#09090B] border-b border-white/5 py-1.5 px-4 overflow-hidden text-xs font-mono">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D4FF]"></span>
          </span>
          <span className="text-[#00D4FF] font-bold uppercase tracking-wider text-[10px]">THREAT FEED:</span>
        </div>

        {/* Ticker Items */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar text-slate-300 text-[11px] whitespace-nowrap">
          <span className="flex items-center gap-1.5">
            <span className="text-[#EF4444] font-bold">🔴 BLOCKED:</span> Phishing attempt from Moscow (IP 185.220.101.5)
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#22C55E] font-bold">🟢 MASKED:</span> API Key <code className="text-[#00D4FF]">sk-proj-9482...</code> redacted in prompt
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#FACC15] font-bold">🟡 FLAGGED:</span> Suspicious domain <code className="text-amber-300">verify-auth-domain.net</code>
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#22C55E] font-bold">🟢 VERIFIED:</span> SHA-256 Audit Log chain integrity (0 tampering)
          </span>
        </div>

        {/* Right Live Indicator */}
        <div className="hidden md:flex items-center gap-1 text-[10px] text-slate-500 shrink-0">
          <Zap className="w-3 h-3 text-[#00D4FF]" />
          <span>Real-time Stream</span>
        </div>

      </div>
    </div>
  );
};

export default ThreatTicker;
