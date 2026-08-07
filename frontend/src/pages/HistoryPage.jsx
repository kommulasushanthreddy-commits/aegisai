import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { History, Eye, ShieldAlert, Filter, ChevronRight, Trash2, ArrowRight, CornerDownRight } from 'lucide-react';
import { fetchScanHistory } from '../api/admin';
import { clearScanHistory } from '../utils/historyStorage';
import { RiskBadge } from '../components/common/Badge';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import Modal from '../components/common/Modal';

const HistoryPage = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [selectedScan, setSelectedScan] = useState(null);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await fetchScanHistory(1, filterType);
      setScans(data.items || []);
    } catch (err) {
      console.error('Failed to fetch scan history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [filterType]);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your scan history?')) {
      clearScanHistory();
      setScans([]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e2638] pb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Scan & Redaction History</h1>
            <p className="text-xs text-slate-400">
              Audit trail of your prompt redactions and phishing threat evaluations.
            </p>
          </div>
        </div>

        {/* Filter & Clear Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 bg-[#121723] p-1.5 rounded-xl border border-[#1e2638]">
            <span className="text-xs font-mono text-slate-400 px-2 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {['all', 'redaction', 'phishing'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                  filterType === type
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-glow-teal'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {scans.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-mono border border-rose-500/30 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>
      </div>

      {/* History List / Table Container */}
      <div className="bg-[#121723] rounded-3xl border border-[#1e2638] overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-6">
            <LoadingSkeleton count={4} />
          </div>
        ) : scans.length === 0 ? (
          <div className="text-center py-16 px-4 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0a0d14] border border-[#1e2638] flex items-center justify-center mx-auto text-slate-500">
              <History className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-200">No Scan History Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {filterType !== 'all'
                  ? `No scan records match the "${filterType}" filter.`
                  : 'You have not performed any scans yet. Run a prompt scan or phishing check to see records here.'}
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <Link
                to="/redaction"
                className="px-4 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Test Redaction Shield</span>
              </Link>
              <Link
                to="/phishing"
                className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Test Phishing Analyzer</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1e2638] bg-[#0a0d14]/50 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4">Scan Type</th>
                  <th className="py-3.5 px-4">Content Summary</th>
                  <th className="py-3.5 px-4">Result Indicator</th>
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2638] text-sm">
                {scans.map((scan) => (
                  <tr key={scan.id} className="hover:bg-[#182030]/50 transition-colors">
                    
                    {/* Scan Type */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium ${
                        scan.type === 'redaction'
                          ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                      }`}>
                        {scan.type === 'redaction' ? <Eye className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                        <span className="capitalize">{scan.type}</span>
                      </span>
                    </td>

                    {/* Summary */}
                    <td className="py-4 px-4 text-slate-200 font-mono text-xs max-w-md truncate">
                      {scan.summary}
                    </td>

                    {/* Result Indicator */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {scan.type === 'redaction' ? (
                        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
                          {scan.entitiesFound ?? 0} Entities Masked
                        </span>
                      ) : (
                        <RiskBadge level={scan.riskLevel || 'low'} score={scan.riskScore || 0} />
                      )}
                    </td>

                    {/* Timestamp */}
                    <td className="py-4 px-4 text-xs font-mono text-slate-400 whitespace-nowrap">
                      {scan.timestamp ? new Date(scan.timestamp).toLocaleString() : 'Just now'}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedScan(scan)}
                        className="px-3 py-1.5 rounded-lg bg-[#182030] hover:bg-[#2a344a] text-slate-300 text-xs font-mono border border-[#1e2638] inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Inspect</span>
                        <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detailed Modal on Inspect */}
      {selectedScan && (
        <Modal
          isOpen={!!selectedScan}
          onClose={() => setSelectedScan(null)}
          title={`Scan Audit Log: ${selectedScan.id}`}
        >
          <div className="space-y-4 font-mono text-xs text-slate-300">
            <div className="flex justify-between items-center pb-2 border-b border-[#1e2638]">
              <span className="text-slate-400">Scan Type: <strong className="text-teal-400 uppercase">{selectedScan.type}</strong></span>
              <span className="text-slate-400">{selectedScan.timestamp ? new Date(selectedScan.timestamp).toLocaleString() : 'Just now'}</span>
            </div>

            {/* Input Content */}
            <div className="space-y-1">
              <span className="text-slate-400 font-bold block">Input Content Evaluated:</span>
              <div className="p-3 bg-[#0a0d14] rounded-xl border border-[#1e2638] text-slate-200 leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto">
                {selectedScan.fullContent || selectedScan.summary}
              </div>
            </div>

            {/* Redaction Specific Output */}
            {selectedScan.type === 'redaction' && selectedScan.maskedContent && (
              <div className="space-y-1">
                <span className="text-teal-400 font-bold block">Masked Output Sent to AI:</span>
                <div className="p-3 bg-[#0a0d14] rounded-xl border border-teal-500/30 text-teal-200 leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {selectedScan.maskedContent}
                </div>
              </div>
            )}

            {/* Phishing Specific Flags */}
            {selectedScan.type === 'phishing' && selectedScan.flags?.length > 0 && (
              <div className="space-y-2">
                <span className="text-amber-400 font-bold block">Threat Flags Triggered ({selectedScan.flags.length}):</span>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {selectedScan.flags.map((flag, idx) => (
                    <div key={idx} className="p-2 rounded bg-[#0a0d14] border border-[#1e2638] text-slate-200 flex items-start gap-2">
                      <CornerDownRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-100">{flag.label}</span>
                        {flag.explanation && <p className="text-[11px] text-slate-400 mt-0.5">{flag.explanation}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assessment Footer */}
            <div className="flex justify-between items-center pt-3 border-t border-[#1e2638]">
              <span className="text-slate-400">Security Status:</span>
              {selectedScan.type === 'redaction' ? (
                <span className="text-teal-300 font-bold px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/30">
                  {selectedScan.entitiesFound ?? 0} Entities Redacted
                </span>
              ) : (
                <RiskBadge level={selectedScan.riskLevel || 'low'} score={selectedScan.riskScore || 0} />
              )}
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default HistoryPage;
