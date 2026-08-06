import React from 'react';
import { RiskBadge } from '../common/Badge';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';

const RiskGauge = ({ score = 0, level = 'low' }) => {
  const getScoreColor = () => {
    if (score >= 80) return 'text-rose-500 stroke-rose-500 border-rose-500/30';
    if (score >= 60) return 'text-orange-500 stroke-orange-500 border-orange-500/30';
    if (score >= 35) return 'text-amber-500 stroke-amber-500 border-amber-500/30';
    return 'text-emerald-400 stroke-emerald-400 border-emerald-500/30';
  };

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#121723] rounded-2xl border border-[#1e2638] space-y-4 text-center">
      <div className="relative flex items-center justify-center">
        {/* Radial SVG gauge */}
        <svg className="w-36 h-36 transform -rotate-90">
          <circle
            cx="72"
            cy="72"
            r="40"
            className="stroke-[#1e2638]"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="72"
            cy="72"
            r="40"
            className={`transition-all duration-1000 ease-out ${getScoreColor()}`}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl font-black font-mono text-slate-100 tracking-tight">
            {score}<span className="text-xs text-slate-400">%</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">THREAT SCORE</span>
        </div>
      </div>

      <div>
        <div className="mb-1">
          <RiskBadge level={level} />
        </div>
        <p className="text-xs text-slate-400 mt-2">
          {score >= 80 && 'Dangerous high probability of social engineering or credential theft.'}
          {score >= 60 && 'Suspicious markers detected. Exercise extreme caution.'}
          {score >= 35 && 'Moderate risk markers. Verify sender authenticity.'}
          {score < 35 && 'Low risk. Standard corporate email characteristics.'}
        </p>
      </div>
    </div>
  );
};

export default RiskGauge;
