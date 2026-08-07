import React from 'react';
import { ShieldCheck, Zap, Activity, Cpu, Sparkles, TrendingDown } from 'lucide-react';

const ThreatGaugeWidget = () => {
  return (
    <div className="glass-card p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1F2937] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/40 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-100 font-sans">Threat Level & Risk Gauge</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Automated telemetry evaluation from CrowdStrike & Defender streams.</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E]">
          Low Risk (12/100)
        </span>
      </div>

      {/* Main Gauge Graphic & Score Display */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        
        {/* Semi-Circle SVG Arc Gauge Meter */}
        <div className="flex flex-col items-center justify-center relative sm:col-span-1">
          <svg className="w-40 h-24" viewBox="0 0 200 120">
            {/* Background Track Arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#1F2937"
              strokeWidth="18"
              strokeLinecap="round"
            />
            {/* Active Gauge Value Arc (Low Risk = ~20% of 180 degrees) */}
            <path
              d="M 20 100 A 80 80 0 0 1 65 38"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Text inside Arc */}
          <div className="absolute top-12 text-center">
            <span className="text-2xl font-black text-slate-100 font-mono">12</span>
            <span className="text-[10px] text-slate-400 block font-mono">/ 100 RISK</span>
          </div>
        </div>

        {/* Breakdown Metric Cards */}
        <div className="sm:col-span-2 space-y-3 font-sans text-xs">
          
          <div className="p-3.5 rounded-xl bg-[#081018]/90 border border-[#1F2937] flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Cpu className="w-4 h-4 text-[#06B6D4]" />
              <span className="text-slate-300 font-semibold">AI Detection Precision</span>
            </div>
            <span className="font-mono font-black text-[#22C55E] text-sm">99.8%</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#081018]/90 border border-[#1F2937] flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Activity className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-slate-300 font-semibold">Zero-Day Vulnerability Score</span>
            </div>
            <span className="font-mono font-black text-[#3B82F6] text-sm">Low (0.02%)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#081018]/90 border border-[#1F2937] flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-slate-300 font-semibold">Avg Interception Latency</span>
            </div>
            <span className="font-mono font-black text-purple-400 text-sm">4.2 ms</span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ThreatGaugeWidget;
