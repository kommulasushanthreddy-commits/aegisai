import React from 'react';
import { PieChart, Globe, Lock, ShieldAlert, Eye, Terminal } from 'lucide-react';

const THREAT_TYPES = [
  { label: 'Secrets / API Keys Redacted', percentage: 42, color: '#3B82F6', icon: Lock },
  { label: 'Phishing Social-Engineering', percentage: 28, color: '#F59E0B', icon: ShieldAlert },
  { label: 'Indirect PII Exfiltration', percentage: 18, color: '#06B6D4', icon: Eye },
  { label: 'Prompt Injection Attacks', percentage: 12, color: '#EF4444', icon: Terminal }
];

const TOP_TARGETED_COUNTRIES = [
  { flag: '🇺🇸', country: 'United States', count: 450, share: '32%' },
  { flag: '🇩🇪', country: 'Germany', count: 320, share: '23%' },
  { flag: '🇷🇺', country: 'Russia (Source)', count: 280, share: '20%' },
  { flag: '🇸🇬', country: 'Singapore', count: 180, share: '13%' },
  { flag: '🇮🇳', country: 'India', count: 140, share: '12%' }
];

const ThreatDistributionWidget = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* 1. Threat Type Distribution (Donut Representation) */}
      <div className="glass-card p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-[#1F2937] pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/40 flex items-center justify-center">
              <PieChart className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-100 font-sans">Threat Type Distribution</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Past 30 Days</span>
        </div>

        {/* Donut Chart & Legend */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          {/* Custom SVG Donut */}
          <div className="flex justify-center relative">
            <svg className="w-36 h-36" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="38" fill="none" stroke="#3B82F6" strokeWidth="16" strokeDasharray="100 140" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" strokeWidth="16" strokeDasharray="67 173" strokeDashoffset="-100" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#06B6D4" strokeWidth="16" strokeDasharray="43 197" strokeDashoffset="-167" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#EF4444" strokeWidth="16" strokeDasharray="29 211" strokeDashoffset="-210" />
              <circle cx="50" cy="50" r="28" fill="#111827" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-black text-slate-100 font-mono">1,640</span>
              <span className="text-[9px] text-slate-400 font-mono uppercase">Total Vector Scans</span>
            </div>
          </div>

          {/* Legend Items */}
          <div className="space-y-2.5 font-sans text-xs">
            {THREAT_TYPES.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-slate-300 font-medium truncate max-w-[130px]">{item.label}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-100">{item.percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Top Targeted Countries Widget */}
      <div className="glass-card p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-[#1F2937] pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#06B6D4]/15 text-[#06B6D4] border border-[#06B6D4]/40 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-100 font-sans">Top Targeted Countries</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Geo Distribution</span>
        </div>

        <div className="space-y-3 font-sans text-xs">
          {TOP_TARGETED_COUNTRIES.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-slate-200 font-medium">
                <span className="flex items-center gap-2">
                  <span>{item.flag}</span>
                  <span>{item.country}</span>
                </span>
                <span className="font-mono text-slate-300">{item.count} attacks ({item.share})</span>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 w-full bg-[#081018] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-full"
                  style={{ width: item.share }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ThreatDistributionWidget;
