import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, FileText, Settings, Bell, CheckCircle2, ShieldCheck, Download, RefreshCw } from 'lucide-react';

const QuickActionsPanel = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState('');

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportMessage('Security Audit PDF Report exported successfully!');
      setTimeout(() => setExportMessage(''), 3000);
    }, 1200);
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Rocket className="w-4 h-4 text-[#00D4FF]" />
          Quick Actions & Operations
        </h3>
        <span className="text-xs font-mono text-slate-400">Security Console Controls</span>
      </div>

      {exportMessage && (
        <div className="p-3 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-mono flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{exportMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        
        {/* Action 1: Run Full Scan */}
        <Link
          to="/scan/redaction"
          className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-[#00D4FF] text-slate-950 font-extrabold flex flex-col items-center justify-center text-center space-y-2 hover:brightness-110 transition-all hover:-translate-y-1 shadow-glow-cyan group"
        >
          <Rocket className="w-5 h-5 group-hover:scale-110 transition-transform fill-slate-950" />
          <span>🚀 Run Full Scan</span>
        </Link>

        {/* Action 2: Export Report */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="p-4 rounded-2xl bg-[#111827] border border-white/10 hover:border-[#00D4FF]/40 text-slate-200 font-bold flex flex-col items-center justify-center text-center space-y-2 hover:-translate-y-1 transition-all group disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <RefreshCw className="w-5 h-5 text-[#00D4FF] animate-spin" />
              <span className="text-[#00D4FF]">Exporting...</span>
            </>
          ) : (
            <>
              <FileText className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>📄 Export Report</span>
            </>
          )}
        </button>

        {/* Action 3: Security Settings */}
        <Link
          to="/admin"
          className="p-4 rounded-2xl bg-[#111827] border border-white/10 hover:border-purple-500/40 text-slate-200 font-bold flex flex-col items-center justify-center text-center space-y-2 hover:-translate-y-1 transition-all group"
        >
          <Settings className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
          <span>⚙️ Security Settings</span>
        </Link>

        {/* Action 4: Notifications */}
        <button
          onClick={() => alert('All security policies active. No pending critical alerts.')}
          className="p-4 rounded-2xl bg-[#111827] border border-white/10 hover:border-[#22C55E]/40 text-slate-200 font-bold flex flex-col items-center justify-center text-center space-y-2 hover:-translate-y-1 transition-all group relative"
        >
          <Bell className="w-5 h-5 text-[#22C55E] group-hover:scale-110 transition-transform" />
          <span>🔔 Notifications ({notificationCount})</span>
        </button>

      </div>
    </div>
  );
};

export default QuickActionsPanel;
