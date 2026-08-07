import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendingUp, PieChart as PieIcon, Activity } from 'lucide-react';

const WEEKLY_TREND_DATA = [
  { day: 'Mon', scans: 180, redactions: 45, phishingBlocked: 25 },
  { day: 'Tue', scans: 220, redactions: 60, phishingBlocked: 35 },
  { day: 'Wed', scans: 310, redactions: 85, phishingBlocked: 42 },
  { day: 'Thu', scans: 290, redactions: 78, phishingBlocked: 50 },
  { day: 'Fri', scans: 255, redactions: 68, phishingBlocked: 30 },
  { day: 'Sat', scans: 140, redactions: 30, phishingBlocked: 15 },
  { day: 'Sun', scans: 110, redactions: 22, phishingBlocked: 10 }
];

const RISK_BREAKDOWN_DATA = [
  { name: 'Low Risk', value: 820, color: '#00E676' },
  { name: 'Medium Risk', value: 380, color: '#FFC107' },
  { name: 'High Risk', value: 168, color: '#FF9100' },
  { name: 'Critical Threat', value: 60, color: '#FF5252' }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0B1220] p-3 rounded-xl border border-[#1E293B] shadow-lg text-xs font-mono space-y-1">
        <p className="font-bold text-slate-200">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: <strong>{entry.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AnalyticsCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Chart 1: Scans & Threats Trend (Area Chart) */}
      <div className="lg:col-span-2 p-6 rounded-3xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card space-y-4 hover:border-[#00D4FF]/30 transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Weekly Threat & Scan Analytics</h3>
              <p className="text-xs text-slate-400">Daily breakdown of prompt redactions and phishing blocks.</p>
            </div>
          </div>
          <span className="text-xs font-mono text-[#00E676] bg-[#00E676]/10 px-2.5 py-1 rounded-full border border-[#00E676]/30">
            +18.4% vs last week
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={WEEKLY_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPhishing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF5252" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#FF5252" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="scans" name="Total Scans" stroke="#00D4FF" strokeWidth={2.5} fillOpacity={1} fill="url(#colorScans)" />
              <Area type="monotone" dataKey="phishingBlocked" name="Threats Blocked" stroke="#FF5252" strokeWidth={2} fillOpacity={1} fill="url(#colorPhishing)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Risk Breakdown (Donut Chart) */}
      <div className="lg:col-span-1 p-6 rounded-3xl bg-gradient-to-b from-[#131B2F] to-[#0D1424] border border-[#1E293B] shadow-soft-card space-y-4 hover:border-[#00D4FF]/30 transition-all flex flex-col justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center">
            <PieIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Risk Assessment Split</h3>
            <p className="text-xs text-slate-400">Distribution by threat severity.</p>
          </div>
        </div>

        <div className="h-52 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={RISK_BREAKDOWN_DATA}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
              >
                {RISK_BREAKDOWN_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#0B1220" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-[#1E293B]">
          {RISK_BREAKDOWN_DATA.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
              <span className="text-slate-300 text-[11px] truncate">{item.name}: <strong>{item.value}</strong></span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AnalyticsCharts;
