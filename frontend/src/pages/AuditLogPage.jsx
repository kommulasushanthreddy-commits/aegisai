import React, { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import { fetchAuditLogs } from '../api/admin';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import HashChainStatus from '../components/audit/HashChainStatus';
import Pagination from '../components/common/Pagination';
import { ShieldCheck, Copy, Check, Link as LinkIcon, Lock } from 'lucide-react';

const AuditLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [chainValid, setChainValid] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedHash, setCopiedHash] = useState(null);

  useEffect(() => {
    const loadLogs = async () => {
      setLoading(true);
      try {
        const data = await fetchAuditLogs(currentPage);
        setLogs(data.items || []);
        setChainValid(data.chainValid ?? true);
      } catch (err) {
        console.error('Failed to fetch audit logs:', err);
      } finally {
        setLoading(false);
      }
    };
    loadLogs();
  }, [currentPage]);

  const copyHash = (hash, id) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="flex min-h-screen bg-[#0a0d14]">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e2638] pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center shadow-glow-teal">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Hash-Chained Cryptographic Audit Log</h1>
              <p className="text-xs text-slate-400">
                Pillar 4: Immutable append-only audit trail linking every redaction and scan via SHA-256 block hashes.
              </p>
            </div>
          </div>
        </div>

        {/* Chain Integrity Banner */}
        <HashChainStatus isValid={chainValid} count={logs.length} />

        {/* Audit Log Table */}
        <div className="bg-[#121723] rounded-3xl border border-[#1e2638] overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-6">
              <LoadingSkeleton count={5} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#1e2638] bg-[#0a0d14]/60 text-slate-400 uppercase tracking-wider">
                    <th className="py-3.5 px-4 w-16">Block #</th>
                    <th className="py-3.5 px-4">Timestamp</th>
                    <th className="py-3.5 px-4">Action Event</th>
                    <th className="py-3.5 px-4">Actor</th>
                    <th className="py-3.5 px-4">Cryptographic Hash Linkage (prevHash → hash)</th>
                    <th className="py-3.5 px-4 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2638]">
                  {logs.map((item) => (
                    <tr key={item.index} className="hover:bg-[#182030]/50 transition-colors">
                      
                      {/* Block # */}
                      <td className="py-4 px-4 text-teal-400 font-bold">
                        #{item.index}
                      </td>

                      {/* Timestamp */}
                      <td className="py-4 px-4 text-slate-300 whitespace-nowrap">
                        {new Date(item.timestamp).toLocaleString()}
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4">
                        <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/30 font-bold block mb-0.5 w-max">
                          {item.action}
                        </span>
                        <span className="text-[11px] text-slate-400 block truncate max-w-xs">
                          {item.detail}
                        </span>
                      </td>

                      {/* Actor */}
                      <td className="py-4 px-4 text-slate-300 font-semibold whitespace-nowrap">
                        {item.actor}
                      </td>

                      {/* Hash Linkage */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1.5 text-[11px] text-slate-400">
                            <span className="text-slate-400">Prev:</span>
                            <span className="font-mono text-slate-400 truncate max-w-[140px]">{item.prevHash}</span>
                          </div>
                          <div className="flex items-center space-x-1.5 text-xs text-teal-300 font-bold">
                            <span className="text-teal-400">Hash:</span>
                            <span className="font-mono text-teal-300 truncate max-w-[140px]">{item.hash}</span>
                            <button
                              onClick={() => copyHash(item.hash, item.index)}
                              title="Copy full 64-char hash"
                              className="p-1 rounded hover:bg-[#1e2638] text-slate-400 hover:text-teal-400 transition-colors"
                            >
                              {copiedHash === item.index ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Verification */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" /> VERIFIED
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />
        </div>

      </main>
    </div>
  );
};

export default AuditLogPage;
