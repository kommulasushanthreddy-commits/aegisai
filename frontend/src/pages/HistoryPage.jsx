import React, { useState, useEffect } from 'react';
import { History, Eye, ShieldAlert, Filter, Search, ChevronRight } from 'lucide-react';
import { fetchScanHistory } from '../api/admin';
import { RiskBadge, AiBadge } from '../components/common/Badge';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import Pagination from '../components/common/Pagination';
import Modal from '../components/common/Modal';

const HistoryPage = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedScan, setSelectedScan] = useState(null);

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      try {
        const data = await fetchScanHistory(currentPage, filterType);
        setScans(data.items || []);
      } catch (err) {
        console.error('Failed to fetch scan history:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, [currentPage, filterType]);

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
              Audit trail of your personal scan submissions and intercepted prompt redactions.
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-2 bg-[#121723] p-1.5 rounded-xl border border-[#1e2638]">
          <span className="text-xs font-mono text-slate-400 px-2 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {['all', 'redaction', 'phishing'].map((type) => (
            <button
              key={type}
              onClick={() => {
                setFilterType(type);
                setCurrentPage(1);
              }}
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
      </div>

      {/* History Table Container */}
      <div className="bg-[#121723] rounded-3xl border border-[#1e2638] overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-6">
            <LoadingSkeleton count={4} />
          </div>
        ) : scans.length === 0 ? (
          <div className="text-center py-12 text-slate-400 font-mono text-xs">
            No historical scan records found for filter "{filterType}".
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1e2638] bg-[#0a0d14]/50 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4">Scan Type</th>
                  <th className="py-3.5 px-4">Summary</th>
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
                    <td className="py-4 px-4 text-slate-200 font-medium max-w-md truncate">
                      {scan.summary}
                    </td>

                    {/* Result Indicator */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {scan.type === 'redaction' ? (
                        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
                          {scan.entitiesFound} Entities Masked
                        </span>
                      ) : (
                        <RiskBadge level={scan.riskLevel} score={scan.riskScore} />
                      )}
                    </td>

                    {/* Timestamp */}
                    <td className="py-4 px-4 text-xs font-mono text-slate-400 whitespace-nowrap">
                      {new Date(scan.timestamp).toLocaleString()}
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

        <Pagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />
      </div>

      {/* Detail Modal */}
      {selectedScan && (
        <Modal
          isOpen={!!selectedScan}
          onClose={() => setSelectedScan(null)}
          title={`Scan Detail: ${selectedScan.id}`}
        >
          <div className="space-y-4 font-mono text-xs text-slate-300">
            <div className="flex justify-between items-center pb-2 border-b border-[#1e2638]">
              <span className="text-slate-400">Type: <strong className="text-teal-400 uppercase">{selectedScan.type}</strong></span>
              <span className="text-slate-400">{new Date(selectedScan.timestamp).toLocaleString()}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Operation Summary:</span>
              <div className="p-3 bg-[#0a0d14] rounded-xl border border-[#1e2638] text-slate-200">
                {selectedScan.summary}
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span>Security Assessment:</span>
              {selectedScan.type === 'redaction' ? (
                <span className="text-teal-300 font-bold">{selectedScan.entitiesFound} Entities Redacted</span>
              ) : (
                <RiskBadge level={selectedScan.riskLevel} score={selectedScan.riskScore} />
              )}
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default HistoryPage;
