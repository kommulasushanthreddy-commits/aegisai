import React from 'react';

const SecurityScoreRing = ({ score = 98 }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center space-x-4">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
          {/* Track */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            className="stroke-slate-800"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Animated Arc */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            className="stroke-[#00D4FF] transition-all duration-1000 ease-out"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Percentage */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-xl font-black font-mono text-[#00D4FF] tracking-tight">
            {score}%
          </span>
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest leading-none">
            SCORE
          </span>
        </div>
      </div>

      <div className="space-y-0.5">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">SECURITY SCORE</div>
        <div className="text-base font-extrabold text-[#22C55E]">98 / 100 • EXCELLENT</div>
        <p className="text-[11px] text-slate-400 font-mono">Zero unmasked vulnerabilities</p>
      </div>
    </div>
  );
};

export default SecurityScoreRing;
