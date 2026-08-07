import React from 'react';
import { Shield, Lock, Globe, Cpu, Zap, Activity } from 'lucide-react';

const SecurityGlobeGraphic = () => {
  return (
    <div className="p-6 rounded-3xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card relative overflow-hidden flex flex-col items-center justify-center text-center space-y-4 hover:border-[#00D4FF]/40 transition-all group">
      
      {/* Glow background backdrop */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#00D4FF]/5 via-transparent to-purple-500/5 pointer-events-none"></div>

      <div className="relative w-52 h-52 flex items-center justify-center">
        
        {/* Outer Orbit Ring 1 */}
        <div className="absolute inset-0 rounded-full border border-[#00D4FF]/30 border-dashed animate-spin origin-center" style={{ animationDuration: '25s' }}></div>

        {/* Outer Orbit Ring 2 (Reverse) */}
        <div className="absolute inset-3 rounded-full border border-purple-500/20 border-dashed animate-spin origin-center" style={{ animationDuration: '18s', animationDirection: 'reverse' }}></div>

        {/* Middle Pulse Circle */}
        <div className="absolute inset-8 rounded-full border border-[#00E676]/30 animate-ping" style={{ animationDuration: '4s' }}></div>

        {/* Grid Latitude/Longitude Ellipses */}
        <div className="absolute inset-6 rounded-full border border-[#00D4FF]/20 transform rotate-45"></div>
        <div className="absolute inset-6 rounded-full border border-[#00D4FF]/20 transform -rotate-45"></div>

        {/* Floating Node Indicators */}
        <div className="absolute top-4 left-10 w-2.5 h-2.5 rounded-full bg-[#00E676] animate-pulse shadow-glow-green"></div>
        <div className="absolute bottom-6 right-10 w-2.5 h-2.5 rounded-full bg-[#FF5252] animate-pulse shadow-glow-red"></div>
        <div className="absolute top-14 right-4 w-2 h-2 rounded-full bg-[#00D4FF] shadow-glow-cyan"></div>

        {/* Center Shield Core */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#0099FF] p-0.5 shadow-glow-cyan-lg transform group-hover:scale-110 transition-transform">
          <div className="w-full h-full bg-[#0B1220] rounded-[14px] flex items-center justify-center text-[#00D4FF]">
            <Shield className="w-8 h-8 fill-[#00D4FF]/20 stroke-[#00D4FF]" />
          </div>
        </div>
      </div>

      <div className="space-y-1 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E676]/10 border border-[#00E676]/30 text-[#00E676] text-xs font-mono font-bold">
          <span className="w-2 h-2 rounded-full bg-[#00E676] animate-ping"></span>
          <span>GLOBAL SHIELD: ACTIVE</span>
        </div>
        <h4 className="text-sm font-bold text-slate-100">Zero-Trust Security Perimeter</h4>
        <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
          Real-time threat monitoring and prompt intercept active across all regional AI gateways.
        </p>
      </div>

    </div>
  );
};

export default SecurityGlobeGraphic;
