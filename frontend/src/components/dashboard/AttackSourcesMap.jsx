import React, { useState, useEffect } from 'react';
import { Globe, ShieldAlert, Navigation, Activity, CheckCircle2, Zap } from 'lucide-react';

const GLOBAL_NODES = [
  {
    id: 'node_ny',
    flag: '🇺🇸',
    city: 'New York (US-East)',
    ip: '198.51.100.45',
    threats: 0,
    risk: 'Gateway Hub',
    lastAttack: '0 sec ago (Hub)',
    status: 'gateway',
    startX: 240,
    startY: 160
  },
  {
    id: 'node_de',
    flag: '🇩🇪',
    city: 'Frankfurt',
    ip: '185.220.101.5',
    threats: 84,
    risk: 'Warning',
    lastAttack: '8 sec ago',
    status: 'warning',
    startX: 480,
    startY: 120
  },
  {
    id: 'node_in',
    flag: '🇮🇳',
    city: 'Bangalore',
    ip: '103.20.12.88',
    threats: 12,
    risk: 'Safe Route',
    lastAttack: '45 sec ago',
    status: 'safe',
    startX: 680,
    startY: 230
  },
  {
    id: 'node_jp',
    flag: '🇯🇵',
    city: 'Tokyo',
    ip: '133.242.18.5',
    threats: 4,
    risk: 'Safe Route',
    lastAttack: '2 min ago',
    status: 'safe',
    startX: 830,
    startY: 170
  },
  {
    id: 'node_sg',
    flag: '🇸🇬',
    city: 'Singapore',
    ip: '128.199.200.1',
    threats: 128,
    risk: 'Medium Risk',
    lastAttack: '14 sec ago',
    status: 'warning',
    startX: 750,
    startY: 280
  },
  {
    id: 'node_ru',
    flag: '🇷🇺',
    city: 'Moscow',
    ip: '185.220.101.88',
    threats: 342,
    risk: 'Critical Attack',
    lastAttack: '2 sec ago',
    status: 'critical',
    startX: 570,
    startY: 100
  }
];

const AttackSourcesMap = () => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [liveMetrics, setLiveMetrics] = useState({
    activeAttacks: 24,
    liveConnections: 3482,
    blockedToday: 1428,
    countries: 18
  });

  // Small live metric counter update every 4s to simulate real-time SOC activity
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        ...prev,
        activeAttacks: 22 + Math.floor(Math.random() * 5),
        liveConnections: 3480 + Math.floor(Math.random() * 10)
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-6 space-y-5 relative">
      
      {/* 1. Header with Live Status & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-black text-slate-100 font-sans tracking-tight">Global Threat Intelligence Map</h2>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-0.5">Real-time attack trajectories targeting enterprise AI gateways.</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono bg-[#09090B]/80 px-3.5 py-1.5 rounded-xl border border-white/10">
          <span className="flex items-center gap-1.5 text-[#22C55E]">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span> Safe
          </span>
          <span className="flex items-center gap-1.5 text-[#FACC15]">
            <span className="w-2 h-2 rounded-full bg-[#FACC15]"></span> Warning
          </span>
          <span className="flex items-center gap-1.5 text-[#EF4444]">
            <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span> Critical
          </span>
          <span className="flex items-center gap-1.5 text-[#00D4FF]">
            <span className="w-2 h-2 rounded-full bg-[#00D4FF]"></span> Gateway
          </span>
        </div>
      </div>

      {/* 2. World Map Graphic Canvas with Radar Sweep & Animated Trajectories */}
      <div className="relative h-80 bg-[#09090B] rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
        
        {/* Faint Rotating Radar Sweep Effect in background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full border border-[#00D4FF]/20 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00D4FF]/30 via-transparent to-transparent animate-spin origin-center" style={{ animationDuration: '10s' }}></div>
          </div>
        </div>

        {/* SVG World Map */}
        <svg className="w-full h-full relative z-10" viewBox="0 0 1000 500">
          
          {/* Subtle Grid Overlay */}
          <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
          </pattern>
          <rect width="1000" height="500" fill="url(#mapGrid)" />

          {/* Dark Blue World Continent Outlines */}
          <g className="fill-[#111827] stroke-[#1E293B] stroke-[1.5]">
            {/* North America */}
            <path d="M120,80 Q220,40 320,80 Q380,140 300,220 Q180,240 110,160 Z" />
            {/* South America */}
            <path d="M280,260 Q360,270 330,420 Q240,430 250,300 Z" />
            {/* Europe */}
            <path d="M450,80 Q560,70 590,170 Q510,260 450,240 Q430,160 450,80 Z" />
            {/* Africa */}
            <path d="M460,230 Q580,240 550,420 Q450,420 440,300 Z" />
            {/* Asia */}
            <path d="M590,80 Q850,60 880,220 Q740,280 610,210 Z" />
            {/* Australia */}
            <path d="M760,320 Q870,310 860,420 Q750,420 760,320 Z" />
          </g>

          {/* Animated Trajectory Trajectory Curves to Gateway (New York: 240, 160) */}
          <g>
            {/* Critical Arc: Moscow (570, 100) -> NY (240, 160) */}
            <path
              d="M570,100 Q400,30 240,160"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="animate-pulse"
            />
            {/* Warning Arc: Frankfurt (480, 120) -> NY (240, 160) */}
            <path
              d="M480,120 Q360,80 240,160"
              fill="none"
              stroke="#FACC15"
              strokeWidth="2"
              strokeDasharray="5 5"
              opacity="0.8"
            />
            {/* Safe Arc: Bangalore (680, 230) -> NY (240, 160) */}
            <path
              d="M680,230 Q450,120 240,160"
              fill="none"
              stroke="#22C55E"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.6"
            />
            {/* Warning Arc: Singapore (750, 280) -> NY (240, 160) */}
            <path
              d="M750,280 Q500,180 240,160"
              fill="none"
              stroke="#FACC15"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.7"
            />
          </g>

        </svg>

        {/* Pulsing Global Location Nodes Overlay */}
        {GLOBAL_NODES.map((node) => {
          const isSelected = hoveredNode?.id === node.id;
          const isGateway = node.status === 'gateway';
          const isCritical = node.status === 'critical';
          const isWarning = node.status === 'warning';

          return (
            <div
              key={node.id}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
              style={{ top: `${(node.startY / 500) * 100}%`, left: `${(node.startX / 1000) * 100}%` }}
            >
              <div className="relative flex items-center justify-center">
                {/* Expanding Ripple Ring */}
                <span className={`animate-ping absolute inline-flex h-8 w-8 rounded-full opacity-75 ${
                  isGateway ? 'bg-[#00D4FF]' : isCritical ? 'bg-[#EF4444]' : isWarning ? 'bg-[#FACC15]' : 'bg-[#22C55E]'
                }`}></span>
                {/* Node Point */}
                <span className={`relative inline-flex rounded-full shadow-lg transition-transform ${
                  isGateway ? 'h-5 w-5 bg-[#00D4FF] border-2 border-white' : 'h-4 w-4 ' + (isCritical ? 'bg-[#EF4444]' : isWarning ? 'bg-[#FACC15]' : 'bg-[#22C55E]')
                }`}></span>
              </div>

              {/* City Label Badge */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] font-mono font-bold text-slate-200 px-1.5 py-0.5 rounded bg-[#09090B]/90 border border-white/10 whitespace-nowrap pointer-events-none">
                {node.flag} {node.city.split(' ')[0]}
              </div>

              {/* Detailed Hover Tooltip */}
              {isSelected && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-40 whitespace-nowrap p-3 bg-[#09090B] border border-[#00D4FF]/40 rounded-xl text-xs font-mono space-y-1 shadow-glow-cyan backdrop-blur-xl">
                  <div className="font-extrabold text-slate-100 flex items-center gap-1.5">
                    <span>{node.flag}</span>
                    <span>{node.city}</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">IP: <span className="text-slate-200">{node.ip}</span></div>
                  <div className="text-slate-400 text-[11px]">Threats: <span className="text-amber-300 font-bold">{node.threats}</span></div>
                  <div className="text-slate-400 text-[11px]">Risk: <span className={isCritical ? 'text-[#EF4444] font-bold' : 'text-[#22C55E] font-bold'}>{node.risk}</span></div>
                  <div className="text-[#00D4FF] text-[10px] pt-1 border-t border-slate-800">Last attack: {node.lastAttack}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Bottom Statistics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs pt-1">
        
        <div className="p-3.5 rounded-2xl bg-[#09090B]/80 border border-white/10 space-y-0.5">
          <span className="text-[10px] text-[#9CA3AF] uppercase block">🌍 Total Attacks</span>
          <div className="text-lg font-black text-slate-100">1,640</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#09090B]/80 border border-white/10 space-y-0.5">
          <span className="text-[10px] text-[#9CA3AF] uppercase block">🛡 Blocked</span>
          <div className="text-lg font-black text-[#22C55E]">{liveMetrics.blockedToday}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#09090B]/80 border border-white/10 space-y-0.5">
          <span className="text-[10px] text-[#9CA3AF] uppercase block">🚨 Active Threats</span>
          <div className="text-lg font-black text-[#EF4444]">{liveMetrics.activeAttacks}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#09090B]/80 border border-white/10 space-y-0.5">
          <span className="text-[10px] text-[#9CA3AF] uppercase block">🌐 Countries</span>
          <div className="text-lg font-black text-[#00D4FF]">{liveMetrics.countries}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#09090B]/80 border border-white/10 space-y-0.5 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-[#9CA3AF] uppercase block">⚡ Live Connections</span>
          <div className="text-lg font-black text-indigo-400">{liveMetrics.liveConnections}</div>
        </div>

      </div>

    </div>
  );
};

export default AttackSourcesMap;
