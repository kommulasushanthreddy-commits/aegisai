import React from 'react';
import { Eye, ShieldAlert, Lock, CheckCircle2, Clock } from 'lucide-react';

const MOCK_TIMELINE_ITEMS = [
  {
    id: 1,
    title: 'Prompt Redacted',
    desc: 'Masked sk-proj-9482 API key & employee email from LLM payload',
    time: '08:04 AM',
    status: 'green',
    icon: Eye,
    category: 'Redaction Shield'
  },
  {
    id: 2,
    title: 'Phishing Threat Blocked',
    desc: 'High-risk email from support@verify-auth-domain.net (Risk 98%)',
    time: '07:32 AM',
    status: 'red',
    icon: ShieldAlert,
    category: 'Threat Analyzer'
  },
  {
    id: 3,
    title: 'Secret Key Masked',
    desc: 'Interupted database password string DB_PASSWORD=SuperSecure...',
    time: '06:10 AM',
    status: 'yellow',
    icon: Lock,
    category: 'Redaction Shield'
  },
  {
    id: 4,
    title: 'Audit Log Integrity Verified',
    desc: 'Cryptographic SHA-256 hash chain verified with zero tampering',
    time: '05:45 AM',
    status: 'green',
    icon: CheckCircle2,
    category: 'Audit Engine'
  }
];

const RecentActivityTimeline = () => {
  return (
    <div className="p-6 rounded-3xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card space-y-5 hover:border-[#00D4FF]/30 transition-all">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Live Security Timeline</h3>
            <p className="text-xs text-slate-400">Real-time audit log of intercepted prompts & threat checks.</p>
          </div>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-[#0B1220] px-2.5 py-1 rounded-full border border-[#1E293B]">
          Real-time Stream
        </span>
      </div>

      {/* Timeline List */}
      <div className="space-y-3">
        {MOCK_TIMELINE_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-[#0B1220] border border-[#1E293B] hover:border-[#00D4FF]/40 transition-all flex items-start justify-between gap-4 group hover:-translate-y-0.5"
            >
              <div className="flex items-start space-x-3">
                {/* Status Dot */}
                <div className="mt-1">
                  {item.status === 'green' && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00E676]"></span>
                    </span>
                  )}
                  {item.status === 'red' && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5252] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF5252]"></span>
                    </span>
                  )}
                  {item.status === 'yellow' && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFC107] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FFC107]"></span>
                    </span>
                  )}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-100 group-hover:text-[#00D4FF] transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#131B2F] text-slate-400 border border-[#1E293B]">
                      {item.category}
                    </span>
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

export default RecentActivityTimeline;
