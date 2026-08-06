import React, { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import { fetchAnomalies } from '../api/admin';
import { RiskBadge } from '../components/common/Badge';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { AlertTriangle, ShieldAlert, CheckCircle2, User, MapPin, Clock } from 'lucide-react';

const AnomaliesFeedPage = () => {
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnomalies = async () => {
      try {
        const data = await fetchAnomalies();
        setAnomalies(data.items || []);
      } catch (err) {
        console.error('Failed to fetch anomalies:', err);
      } finally {
        setLoading(false);
      }
    };
    loadAnomalies();
  }, []);

  const handleResolve = (id) => {
    setAnomalies(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'resolved' } : a))
    );
  };

  return (
    <div className="flex min-h-screen bg-[#0a0d14]">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e2638] pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center justify-center shadow-glow-red">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Behavioral Anomaly Detector</h1>
              <p className="text-xs text-slate-400">
                Pillar 3: Real-time plain-English flags for unusual account activity, secret pasting, and off-hour access.
              </p>
            </div>
          </div>
        </div>

        {/* Anomalies List */}
        {loading ? (
          <LoadingSkeleton count={3} />
        ) : anomalies.length === 0 ? (
          <div className="text-center py-12 text-slate-400 font-mono text-xs">
            No active behavioral anomalies detected.
          </div>
        ) : (
          <div className="space-y-4">
            {anomalies.map((item) => (
              <div
                key={item.id}
                className={`p-6 rounded-3xl border transition-all ${
                  item.status === 'resolved'
                    ? 'bg-[#121723]/60 border-[#1e2638] opacity-75'
                    : item.severity === 'critical'
                    ? 'bg-[#121723] border-rose-500/40 shadow-glow-red'
                    : 'bg-[#121723] border-amber-500/30'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  
                  {/* Left info */}
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex items-center space-x-3">
                      <RiskBadge level={item.severity} />
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {new Date(item.timestamp).toLocaleString()}
                      </span>
                      {item.status === 'resolved' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          RESOLVED
                        </span>
                      )}
                    </div>

                    <p className="text-base font-semibold text-slate-100 leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                      <span className="flex items-center gap-1.5 bg-[#0a0d14] px-2.5 py-1 rounded-lg border border-[#1e2638]">
                        <User className="w-3.5 h-3.5 text-teal-400" /> Affected User: <strong className="text-slate-200">{item.user}</strong>
                      </span>
                      <span className="flex items-center gap-1.5 bg-[#0a0d14] px-2.5 py-1 rounded-lg border border-[#1e2638]">
                        <MapPin className="w-3.5 h-3.5 text-purple-400" /> Origin: <strong className="text-slate-200">{item.location}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Right Action */}
                  <div>
                    {item.status !== 'resolved' ? (
                      <button
                        onClick={() => handleResolve(item.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-300 font-semibold text-xs border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Mark Resolved</span>
                      </button>
                    ) : (
                      <span className="text-xs font-mono text-slate-500">Case Closed</span>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default AnomaliesFeedPage;
