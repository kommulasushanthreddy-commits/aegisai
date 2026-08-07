import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Eye, ShieldAlert, Lock, Activity, ArrowRight, TrendingUp, TrendingDown, Sparkles, CheckCircle2, Play, FileText, Edit3, ArrowUpRight, ArrowDownRight, Clock, Cpu, Server } from 'lucide-react';
import SecurityScoreRing from '../components/dashboard/SecurityScoreRing';
import AttackSourcesMap from '../components/dashboard/AttackSourcesMap';
import AnalyticsCharts from '../components/dashboard/AnalyticsCharts';
import RealTimeActivityFeed from '../components/dashboard/RealTimeActivityFeed';
import ThreatGaugeWidget from '../components/dashboard/ThreatGaugeWidget';
import ThreatDistributionWidget from '../components/dashboard/ThreatDistributionWidget';
import ThreatTicker from '../components/common/ThreatTicker';
import DisplayNameModal from '../components/common/DisplayNameModal';

const DashboardPage = () => {
  const { user, role } = useAuth();
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [utcTime, setUtcTime] = useState('');

  // Live UTC Clock for Enterprise SOC Header
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setUtcTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Prompt for display name if user has not set a custom display name yet
  useEffect(() => {
    if (user && !user.hasCustomName) {
      setIsNameModalOpen(true);
    }
  }, [user]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Interactive Display Name Modal */}
      <DisplayNameModal isOpen={isNameModalOpen} onClose={() => setIsNameModalOpen(false)} />

      {/* Top Live Threat Ticker Banner */}
      <ThreatTicker />

      {/* 1. Enterprise SOC Top Header with UTC Clock, Uptime, AI Status & Threat Level */}
      <div className="glass-card p-8 flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-black text-slate-100 tracking-tight font-sans flex items-center gap-3">
              <span>👋 Welcome back, {user?.name || 'User'}</span>
              <button
                onClick={() => setIsNameModalOpen(true)}
                title="Change Display Name"
                className="p-1.5 rounded-xl bg-[#1F2937]/80 hover:bg-[#06B6D4]/20 border border-[#374151] text-slate-400 hover:text-[#06B6D4] transition-all"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </h1>
          </div>

          {/* SOC Telemetry Status Bar */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            
            {/* Live Clock Badge */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#081018] border border-[#1F2937] text-slate-300 font-bold">
              <Clock className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>{utcTime || '04:47:12 UTC'}</span>
            </div>

            {/* AI Status Badge */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
              </span>
              <span>AI Status: 🟢 Online & Intercepting</span>
            </div>

            {/* System Uptime Badge */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold">
              <Server className="w-3.5 h-3.5 text-purple-400" />
              <span>System Uptime: 99.998%</span>
            </div>

            {/* Threat Level Badge */}
            <div className="px-3.5 py-1.5 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] font-bold">
              Threat Level: Low
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link to="/scan/redaction" className="btn-primary">
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Run Security Scan</span>
            </Link>
            <Link to="/history" className="btn-secondary">
              <FileText className="w-4 h-4" />
              <span>View Reports</span>
            </Link>
          </div>
        </div>

        {/* Security Score Ring */}
        <div className="p-4 rounded-2xl bg-[#081018]/90 border border-[#1F2937] shadow-glow-cyan">
          <SecurityScoreRing score={98} />
        </div>
      </div>

      {/* 2. Four Premium KPI Cards with Sparkline Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI 1: Threats Blocked */}
        <div className="glass-card p-6 space-y-3 hover:border-[#EF4444]/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Threats Blocked</span>
            <div className="w-10 h-10 rounded-xl bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-black text-slate-100 font-mono">1,428</div>
            {/* Sparkline Chart */}
            <svg className="w-16 h-8" viewBox="0 0 60 30">
              <polyline fill="none" stroke="#EF4444" strokeWidth="2.5" points="0,25 15,18 30,22 45,10 60,5" />
            </svg>
          </div>
          <div className="flex items-center justify-between text-xs font-mono pt-1">
            <span className="text-[#22C55E] font-bold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12% this week
            </span>
            <span className="text-[#9CA3AF]">99.8% precision</span>
          </div>
        </div>

        {/* KPI 2: Secrets Masked */}
        <div className="glass-card p-6 space-y-3 hover:border-[#06B6D4]/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Secrets Masked</span>
            <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/15 text-[#06B6D4] border border-[#06B6D4]/30 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-black text-slate-100 font-mono">12,543</div>
            {/* Sparkline Chart */}
            <svg className="w-16 h-8" viewBox="0 0 60 30">
              <polyline fill="none" stroke="#06B6D4" strokeWidth="2.5" points="0,28 15,20 30,15 45,8 60,3" />
            </svg>
          </div>
          <div className="flex items-center justify-between text-xs font-mono pt-1">
            <span className="text-[#06B6D4] font-bold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +24% this week
            </span>
            <span className="text-[#9CA3AF]">Zero leakage</span>
          </div>
        </div>

        {/* KPI 3: Suspicious Emails */}
        <div className="glass-card p-6 space-y-3 hover:border-[#F59E0B]/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Suspicious Emails</span>
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-black text-slate-100 font-mono">184</div>
            {/* Sparkline Chart */}
            <svg className="w-16 h-8" viewBox="0 0 60 30">
              <polyline fill="none" stroke="#F59E0B" strokeWidth="2.5" points="0,10 15,22 30,14 45,20 60,26" />
            </svg>
          </div>
          <div className="flex items-center justify-between text-xs font-mono pt-1">
            <span className="text-[#22C55E] font-bold flex items-center gap-1">
              <ArrowDownRight className="w-3.5 h-3.5" /> -5% reduction
            </span>
            <span className="text-[#9CA3AF]">9 vectors</span>
          </div>
        </div>

        {/* KPI 4: Risk Score */}
        <div className="glass-card p-6 space-y-3 hover:border-[#22C55E]/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Risk Score</span>
            <div className="w-10 h-10 rounded-xl bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-black text-[#22C55E] font-mono">12 / 100</div>
            {/* Sparkline Chart */}
            <svg className="w-16 h-8" viewBox="0 0 60 30">
              <polyline fill="none" stroke="#22C55E" strokeWidth="2.5" points="0,8 15,12 30,18 45,24 60,28" />
            </svg>
          </div>
          <div className="flex items-center justify-between text-xs font-mono pt-1">
            <span className="text-[#22C55E] font-bold flex items-center gap-1">
              <ArrowDownRight className="w-3.5 h-3.5" /> -8 pts risk
            </span>
            <span className="text-[#9CA3AF]">Low Exposure</span>
          </div>
        </div>

      </div>

      {/* 3. Global Threat Intelligence Centerpiece Map with India Hub Highlight */}
      <AttackSourcesMap />

      {/* 4. Threat Level Gauge & Distribution Widgets */}
      <ThreatGaugeWidget />
      <ThreatDistributionWidget />

      {/* 5. Analytics Charts & Real-Time Security Activity Feed */}
      <AnalyticsCharts />
      <RealTimeActivityFeed />

    </div>
  );
};

export default DashboardPage;
