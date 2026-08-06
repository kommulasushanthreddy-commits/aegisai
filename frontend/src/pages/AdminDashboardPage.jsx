import React, { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import { fetchAdminStats } from '../api/admin';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, ShieldCheck, Eye, ShieldAlert, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchAdminStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex min-h-screen bg-[#0a0d14]">
        <Sidebar />
        <div className="flex-1 p-8">
          <LoadingSkeleton count={4} />
        </div>
      </div>
    );
  }

  const { kpis, scansOverTime, riskBreakdown } = stats;

  return (
    <div className="flex min-h-screen bg-[#0a0d14]">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e2638] pb-6">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-400">
              Security Operations Center (SOC)
            </span>
            <h1 className="text-2xl font-bold text-slate-100 mt-1">Enterprise AI Security Overview</h1>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/admin/anomalies"
              className="px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono font-semibold hover:bg-rose-500/20 transition-all flex items-center gap-1.5"
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>3 Active Anomalies</span>
            </Link>
            <Link
              to="/admin/audit-log"
              className="px-3.5 py-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-semibold hover:bg-teal-500/20 transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Hash Audit Chain Intact</span>
            </Link>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-5 rounded-2xl bg-[#121723] border border-[#1e2638] space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>TOTAL GATEWAY SCANS</span>
              <Activity className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-3xl font-black font-mono text-slate-100">
              {kpis.totalScans.toLocaleString()}
            </div>
            <span className="text-[11px] text-emerald-400 font-mono font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14% vs last week
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#121723] border border-[#1e2638] space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>REDACTIONS TODAY</span>
              <Eye className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-3xl font-black font-mono text-teal-400">
              {kpis.redactionsToday}
            </div>
            <span className="text-[11px] text-slate-400 font-mono">PII & secret leaks prevented</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#121723] border border-[#1e2638] space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>HIGH-RISK PHISHING (7D)</span>
              <ShieldAlert className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black font-mono text-amber-400">
              {kpis.highRiskThisWeek}
            </div>
            <span className="text-[11px] text-amber-400/80 font-mono">Requires analyst review</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#121723] border border-[#1e2638] space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>ACTIVE ANOMALIES</span>
              <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
            </div>
            <div className="text-3xl font-black font-mono text-rose-400">
              {kpis.activeAnomalies}
            </div>
            <span className="text-[11px] text-rose-400 font-mono font-semibold">Flagged for investigation</span>
          </div>

        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Scan Volume Over Time (Area Chart) */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-[#121723] border border-[#1e2638] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-100">Gateway Traffic & Scan Volume</h3>
                <p className="text-xs text-slate-400">Daily breakdown of prompt redactions vs phishing checks</p>
              </div>
              <span className="text-xs font-mono text-teal-400 px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/30">
                LIVE TELEMETRY
              </span>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scansOverTime}>
                  <defs>
                    <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#64748b" tickLine={false} style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }} />
                  <YAxis stroke="#64748b" tickLine={false} style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0a0d14', borderColor: '#1e2638', borderRadius: '12px', color: '#f8fafc' }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#14b8a6" strokeWidth={3} fillOpacity={1} fill="url(#colorScans)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Severity Breakdown (Donut Chart) */}
          <div className="lg:col-span-1 p-6 rounded-3xl bg-[#121723] border border-[#1e2638] space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-100">Threat Risk Distribution</h3>
              <p className="text-xs text-slate-400">Severity categories across all analyzed traffic</p>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {riskBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0a0d14', borderColor: '#1e2638', borderRadius: '12px', color: '#f8fafc' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2">
              {riskBreakdown.map((item) => (
                <div key={item.label} className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-300 truncate">{item.label} ({item.value})</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default AdminDashboardPage;
