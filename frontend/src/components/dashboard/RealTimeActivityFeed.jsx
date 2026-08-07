import React from 'react';
import { Eye, ShieldAlert, Lock, CheckCircle2, Clock } from 'lucide-react';

const REALTIME_ITEMS = [
  {
    id: 1,
    title: 'Secret detected',
    desc: 'API Key sk-proj-9482 intercepted in LLM prompt payload',
    time: '2 sec ago',
    status: 'green',
    icon: Lock
  },
  {
    id: 2,
    title: 'Prompt sanitized',
    desc: 'Replaced 3 PII entities with safe tokens [REDACTED_EMAIL]',
    time: '1 min ago',
    status: 'green',
    icon: Eye
  },
  {
    id: 3,
    title: 'Phishing blocked',
    desc: 'Flagged suspicious sender support@verify-auth-domain.net',
    time: '3 min ago',
    status: 'red',
    icon: ShieldAlert
  },
  {
    id: 4,
    title: 'Scan completed',
    desc: 'Completed multi-pass threat regex audit (0 threats remaining)',
    time: '5 min ago',
    status: 'yellow',
    icon: Clock
  },
  {
    id: 5,
    title: 'Audit Hash Logged',
    desc: 'Appended tamper-evident SHA-256 block hash to audit ledger',
    time: '8 min ago',
    status: 'green',
    icon: CheckCircle2
  }
];

const RealTimeActivityFeed = () => {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Real-Time Security Activity Feed</h3>
            <p className="text-xs text-slate-400">Live operational telemetry stream across workforce gateways.</p>
          </div>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping"></span>
          Streaming
        </span>
      </div>

      <div className="space-y-3">
        {REALTIME_ITEMS.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-[#09090B]/60 border border-white/5 hover:border-[#00D4FF]/40 transition-all flex items-start justify-between gap-3 group hover:-translate-y-0.5"
            >
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  {item.status === 'green' && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22C55E]"></span>
                    </span>
                  )}
                  {item.status === 'red' && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#EF4444]"></span>
                    </span>
                  )}
                  {item.status === 'yellow' && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FACC15] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FACC15]"></span>
                    </span>
                  )}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-100 group-hover:text-[#00D4FF] transition-colors">
                      {item.title}
                    </span>
                    <IconComponent className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-mono">
                    {item.desc}
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-mono text-slate-400 shrink-0">
                {item.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RealTimeActivityFeed;
