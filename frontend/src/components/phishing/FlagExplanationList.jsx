import React from 'react';
import { AlertCircle, CheckCircle2, ShieldCheck, CornerDownRight, Lightbulb } from 'lucide-react';

const FlagExplanationList = ({ flags = [], recommendation = '', riskLevel = 'low' }) => {
  return (
    <div className="space-y-6">
      
      {/* Flags Breakdown */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-teal-400" /> Detected Threat Flags ({flags.length})
        </h4>

        <div className="space-y-3">
          {flags.map((flag, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#0a0d14] border border-[#1e2638] space-y-1 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center space-x-2 text-sm font-bold text-slate-100">
                <CornerDownRight className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{flag.label}</span>
              </div>
              <p className="text-xs text-slate-300 pl-6 leading-relaxed">
                {flag.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Guidance Line */}
      {recommendation && (
        <div className={`p-4 rounded-xl border flex items-start space-x-3 ${
          riskLevel === 'critical' || riskLevel === 'high'
            ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            : riskLevel === 'medium'
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
        }`}>
          <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-xs font-bold font-mono uppercase tracking-wider">
              Recommended Security Action:
            </span>
            <p className="text-sm font-medium leading-relaxed">
              {recommendation}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default FlagExplanationList;
