import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, ShieldAlert, History, Activity, ArrowRight, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { RiskBadge, AiBadge, RoleBadge } from '../components/common/Badge';
import { fetchScanHistory } from '../api/admin';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';

const DashboardPage = () => {
  const { user, role } = useAuth();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchScanHistory(1, 'all');
        setScans(data.items || []);
      } catch (err) {
        console.error('Failed to load recent scan history:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#121723] via-[#121723] to-[#182030] border border-[#1e2638] flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-slate-100">Welcome back, {user?.name}</h1>
            <RoleBadge role={role} />
          </div>
          <p className="text-xs text-slate-400 font-mono">
            AegisAI Gateway Session ID: <span className="text-teal-400">ses_active_9481</span> • Security Posture: OPTIMAL
          </p>
        </div>

        {role === 'admin' && (
          <Link
            to="/admin"
            className="px-4 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-semibold hover:bg-purple-500/20 transition-all flex items-center gap-2"
          >
            <Activity className="w-4 h-4 text-purple-400" />
            <span>Open SOC Admin Dashboard</span>
          </Link>
        )}
      </div>

      {/* Quick Action Gateway Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Prompt Redaction Shield Card */}
        <div className="p-6 rounded-3xl bg-[#121723] border border-[#1e2638] hover:border-teal-500/40 transition-all group flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center group-hover:scale-105 transition-transform shadow-glow-teal">
                <Eye className="w-6 h-6" />
              </div>
              <AiBadge label="Redaction Gateway" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">Prompt Redaction Shield</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pasting code, financial data, or internal docs? Run it through the Redaction Shield first. We mask sensitive PII and secrets before sending to public LLMs.
            </p>
          </div>

          <Link
            to="/scan/redaction"
            className="w-full py-3 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition-colors shadow-glow-teal flex items-center justify-center gap-2 text-sm"
          >
            <span>Launch Redaction Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Phishing & Social-Engineering Analyzer Card */}
        <div className="p-6 rounded-3xl bg-[#121723] border border-[#1e2638] hover:border-amber-500/40 transition-all group flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                Threat Analyzer
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100">Phishing & Threat Analyzer</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Received a suspicious email, urgency request, or link? Paste the message to get immediate explainable risk breakdown and red flag evidence.
            </p>
          </div>

          <Link
            to="/scan/phishing"
            className="w-full py-3 rounded-xl bg-[#182030] hover:bg-[#2a344a] text-amber-300 font-bold border border-amber-500/30 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <span>Analyze Suspicious Message</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Recent Activity Feed */}
      <div className="p-6 rounded-3xl bg-[#121723] border border-[#1e2638] space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-teal-400" />
            <h3 className="text-lg font-bold text-slate-100">Recent Security Operations</h3>
          </div>
          <Link
            to="/history"
            className="text-xs text-teal-400 hover:underline font-mono font-semibold flex items-center gap-1"
          >
            View All History <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <LoadingSkeleton count={3} />
        ) : scans.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs font-mono">
            No scans performed in this session yet. Try launching the Redaction Shield above!
          </div>
        ) : (
          <div className="divide-y divide-[#1e2638]">
            {scans.slice(0, 4).map((scan) => (
              <div key={scan.id} className="py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    scan.type === 'redaction'
                      ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    {scan.type === 'redaction' ? <Eye className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-200 block">{scan.summary}</span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {new Date(scan.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {scan.type === 'redaction' ? (
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
                      {scan.entitiesFound} Entities Masked
                    </span>
                  ) : (
                    <RiskBadge level={scan.riskLevel} score={scan.riskScore} />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default DashboardPage;
