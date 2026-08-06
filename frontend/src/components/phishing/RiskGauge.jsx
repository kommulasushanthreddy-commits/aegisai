import React from 'react';
import { RiskBadge } from '../common/Badge';

const RiskGauge = ({ score = 0, level = 'low' }) => {
  const getScoreColor = () => {
    if (score >= 80) return 'stroke-rose-500';
    if (score >= 60) return 'stroke-orange-500';
    if (score >= 35) return 'stroke-amber-500';
    return 'stroke-emerald-400';
  };

  const getScoreTextColor = () => {
    if (score >= 80) return 'text-rose-400';
    if (score >= 60) return 'text-orange-400';
    if (score >= 35) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const getDescription = () => {
    if (score >= 80) return 'Dangerous. High probability of social engineering or credential theft.';
    if (score >= 60) return 'Suspicious markers detected. Exercise extreme caution before interacting.';
    if (score >= 35) return 'Moderate risk markers present. Verify sender authenticity.';
    return 'Low risk. Standard corporate email characteristics detected.';
  };

  const getBgColor = () => {
    if (score >= 80) return 'border-rose-500/25 bg-rose-500/5';
    if (score >= 60) return 'border-orange-500/25 bg-orange-500/5';
    if (score >= 35) return 'border-amber-500/25 bg-amber-500/5';
    return 'border-emerald-500/25 bg-emerald-500/5';
  };

  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`flex flex-col items-center justify-center p-6 rounded-3xl border shadow-xl space-y-5 text-center ${getBgColor()}`}>

      {/* SVG Radial Gauge */}
      <div className="relative flex items-center justify-center">
        <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 112 112">
          {/* Background track */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            className="stroke-[#1e2638]"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Animated foreground arc */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            className={`transition-all duration-1000 ease-out ${getScoreColor()}`}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Score Label */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`text-4xl font-black font-mono tracking-tight ${getScoreTextColor()}`}>
            {score}
          </span>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-tight">
            THREAT %
          </span>
        </div>
      </div>

      {/* Risk Level Badge */}
      <div className="flex flex-col items-center gap-2 w-full">
        <RiskBadge level={level} />
        <p className="text-xs text-slate-300 leading-relaxed text-center break-words w-full px-2">
          {getDescription()}
        </p>
      </div>

    </div>
  );
};

export default RiskGauge;
