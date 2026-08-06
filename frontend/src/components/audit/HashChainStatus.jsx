import React from 'react';
import { ShieldCheck, Link as LinkIcon, CheckCircle2, Lock } from 'lucide-react';

const HashChainStatus = ({ isValid = true, count = 0 }) => {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-950/40 via-[#121723] to-[#121723] border border-teal-500/30 flex flex-wrap items-center justify-between gap-4 shadow-glow-teal">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-slate-100">Append-Only Cryptographic Audit Log</h3>
            {isValid ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                CHAIN VALID & INTACT
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                TAMPER ALERT DETECTED
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Every redaction, phishing check, and anomaly alert is permanently hash-chained using SHA-256 blocks.
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3 font-mono text-xs text-slate-300 bg-[#0a0d14] px-3 py-2 rounded-xl border border-[#1e2638]">
        <LinkIcon className="w-4 h-4 text-teal-400" />
        <span>Blocks Verified: <strong className="text-teal-300">{count}</strong></span>
      </div>
    </div>
  );
};

export default HashChainStatus;
