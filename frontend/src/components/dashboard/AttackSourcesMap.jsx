import React, { useState, useEffect } from 'react';
import { Globe, ShieldAlert, Activity, CheckCircle2, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const GLOBAL_NODES = [
  {
    id: 'node_ny',
    flag: '🇺🇸',
    city: 'New York (Gateway Hub)',
    ip: '198.51.100.45',
    threats: 0,
    status: 'Gateway',
    lastActivity: '0 sec ago (Hub)',
    nodeStatus: 'gateway',
    startX: 250,
    startY: 175
  },
  {
    id: 'node_de',
    flag: '🇩🇪',
    city: 'Frankfurt',
    ip: '185.220.101.5',
    threats: 84,
    status: 'Warning',
    lastActivity: '8 sec ago',
    nodeStatus: 'warning',
    startX: 495,
    startY: 140
  },
  {
    id: 'node_ru',
    flag: '🇷🇺',
    city: 'Moscow',
    ip: '185.220.101.88',
    threats: 342,
    status: 'Critical Attack',
    lastActivity: '2 sec ago',
    nodeStatus: 'critical',
    startX: 575,
    startY: 105
  },
  {
    id: 'node_in',
    flag: '🇮🇳',
    city: 'Bangalore',
    ip: '103.20.12.88',
    threats: 45,
    status: 'Safe',
    lastActivity: '12 sec ago',
    nodeStatus: 'safe',
    startX: 685,
    startY: 245
  },
  {
    id: 'node_sg',
    flag: '🇸🇬',
    city: 'Singapore',
    ip: '128.199.200.1',
    threats: 128,
    status: 'Warning',
    lastActivity: '14 sec ago',
    nodeStatus: 'warning',
    startX: 750,
    startY: 295
  },
  {
    id: 'node_jp',
    flag: '🇯🇵',
    city: 'Tokyo',
    ip: '133.242.18.5',
    threats: 14,
    status: 'Safe',
    lastActivity: '45 sec ago',
    nodeStatus: 'safe',
    startX: 868,
    startY: 175
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

  // Dynamic live metric telemetry simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        ...prev,
        activeAttacks: 22 + Math.floor(Math.random() * 5),
        liveConnections: 3480 + Math.floor(Math.random() * 10)
      }));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-6 space-y-6 relative overflow-hidden">
      
      {/* 1. Header with Live Telemetry & Palette Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1F2937] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/40 flex items-center justify-center shadow-glow-cyan">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-100 font-sans tracking-tight">Global Threat Intelligence SOC Map</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Real-time attack trajectories targeting enterprise AI gateway endpoints.</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono bg-[#081018]/90 px-4 py-2 rounded-xl border border-[#1F2937] shadow-inner">
          <span className="flex items-center gap-1.5 text-[#22C55E] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></span> Safe
          </span>
          <span className="flex items-center gap-1.5 text-[#F59E0B] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span> Warning
          </span>
          <span className="flex items-center gap-1.5 text-[#EF4444] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span> Critical
          </span>
          <span className="flex items-center gap-1.5 text-[#06B6D4] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]"></span> Gateway Hub
          </span>
        </div>
      </div>

      {/* 2. Realistic Dark SVG World Map Canvas with Hex Grid, Radar Sweep & Attack Trajectories */}
      <div className="relative h-96 bg-[#081018] rounded-2xl border border-[#1F2937] flex items-center justify-center overflow-hidden shadow-2xl">
        
        {/* Floating Background Ambient Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-1/4 w-2 h-2 rounded-full bg-[#3B82F6]/40 animate-float-particle"></div>
          <div className="absolute top-1/3 right-1/3 w-2.5 h-2.5 rounded-full bg-[#06B6D4]/30 animate-float-particle" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-[#22C55E]/40 animate-float-particle" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-[#EF4444]/20 animate-float-particle" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Faint Rotating Radar Sweep Line */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-[580px] h-[580px] rounded-full border border-[#06B6D4]/30 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#06B6D4]/40 via-transparent to-transparent animate-spin origin-center" style={{ animationDuration: '10s' }}></div>
          </div>
        </div>

        {/* SVG World Map Canvas */}
        <svg className="w-full h-full relative z-10" viewBox="0 0 1000 500">
          
          {/* Faint Hexagonal Grid Overlay */}
          <pattern id="hexGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(59, 130, 246, 0.04)" strokeWidth="1" />
          </pattern>
          <rect width="1000" height="500" fill="url(#hexGrid)" />

          {/* Realistic Dark Navy Continents (#10284A) with Thin Blue Outlines (#3B82F6) */}
          <g className="fill-[#10284A] stroke-[#3B82F6] stroke-[1.2]">
            {/* North America */}
            <path d="M 80,70 Q 150,30 330,65 Q 370,120 300,210 Q 190,225 100,160 Q 70,110 80,70 Z" />
            {/* Greenland */}
            <path d="M 350,15 Q 430,10 410,55 Q 360,65 350,15 Z" />
            {/* South America */}
            <path d="M 260,245 Q 350,255 320,430 Q 220,440 230,285 Z" />
            {/* Europe */}
            <path d="M 430,65 Q 560,55 590,145 Q 510,235 430,215 Q 410,135 430,65 Z" />
            {/* UK & Ireland */}
            <path d="M 425,75 Q 440,70 435,95 Q 420,95 425,75 Z" />
            {/* Africa */}
            <path d="M 440,215 Q 580,225 550,430 Q 430,430 420,285 Z" />
            {/* Asia */}
            <path d="M 580,55 Q 870,35 900,210 Q 740,290 590,195 Z" />
            {/* Japan Islands */}
            <path d="M 855,145 Q 875,135 870,185 Q 850,195 855,145 Z" />
            {/* Australia */}
            <path d="M 740,315 Q 870,305 860,425 Q 730,425 740,315 Z" />
          </g>

          {/* Animated Curved Trajectory Paths to Gateway (New York: 250, 175) */}
          <g>
            {/* 🔴 Critical Arc: Moscow (575, 105) -> NY (250, 175) */}
            <path
              d="M 575 105 Q 400 25 250 175"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
              strokeDasharray="7 7"
              className="animate-attack-line"
            />
            {/* 🟡 Warning Arc: Frankfurt (495, 140) -> NY (250, 175) */}
            <path
              d="M 495 140 Q 365 90 250 175"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="animate-attack-line"
              opacity="0.85"
            />
            {/* 🟢 Safe Arc: Bangalore (685, 245) -> NY (250, 175) */}
            <path
              d="M 685 245 Q 450 130 250 175"
              fill="none"
              stroke="#22C55E"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="animate-attack-line"
              opacity="0.75"
            />
            {/* 🟡 Warning Arc: Singapore (750, 295) -> NY (250, 175) */}
            <path
              d="M 750 295 Q 500 190 250 175"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.8"
              strokeDasharray="6 6"
              className="animate-attack-line"
              opacity="0.8"
            />
            {/* 🟢 Safe Arc: Tokyo (868, 175) -> NY (250, 175) */}
            <path
              d="M 868 175 Q 550 60 250 175"
              fill="none"
              stroke="#22C55E"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              className="animate-attack-line"
              opacity="0.6"
            />
          </g>

          {/* Central Gateway Destination Node (New York: 250, 175) */}
          <g transform="translate(250, 175)">
            <circle r="20" fill="#06B6D4" opacity="0.3" className="animate-ping" />
            <circle r="10" fill="#06B6D4" className="shadow-glow-cyan" />
            <circle r="4" fill="#081018" />
          </g>

        </svg>

        {/* Accurately Positioned Location Nodes Overlay */}
        {GLOBAL_NODES.map((node) => {
          const isSelected = hoveredNode?.id === node.id;
          const isGateway = node.nodeStatus === 'gateway';
          const isCritical = node.nodeStatus === 'critical';
          const isWarning = node.nodeStatus === 'warning';

          return (
            <div
              key={node.id}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
              style={{ top: `${(node.startY / 500) * 100}%`, left: `${(node.startX / 1000) * 100}%` }}
            >
              <div className="relative flex items-center justify-center">
                {/* Expanding Pulsing Circle */}
                <span className={`animate-ping absolute inline-flex rounded-full opacity-75 ${
                  isGateway ? 'h-9 w-9 bg-[#06B6D4]' : isCritical ? 'h-10 w-10 bg-[#EF4444]' : isWarning ? 'h-8 w-8 bg-[#F59E0B]' : 'h-7 w-7 bg-[#22C55E]'
                }`}></span>
                
                {/* Center Node Marker */}
                <span className={`relative inline-flex rounded-full shadow-lg ${
                  isGateway ? 'h-5.5 w-5.5 bg-[#06B6D4] border-2 border-white' : 'h-4.5 w-4.5 ' + (isCritical ? 'bg-[#EF4444]' : isWarning ? 'bg-[#F59E0B]' : 'bg-[#22C55E]')
                }`}></span>
              </div>

              {/* Non-overlapping City Label Badge */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] font-mono font-bold text-slate-200 px-2 py-0.5 rounded-lg bg-[#081018]/95 border border-[#1F2937] shadow-lg whitespace-nowrap pointer-events-none">
                {node.flag} {node.city.split(' ')[0]}
              </div>

              {/* Rich Hover Tooltip */}
              {isSelected && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-40 whitespace-nowrap p-4 bg-[#081018] border border-[#06B6D4]/50 rounded-2xl text-xs font-mono space-y-1.5 shadow-2xl backdrop-blur-2xl">
                  <div className="font-extrabold text-slate-100 flex items-center gap-2 text-sm border-b border-[#1F2937] pb-1.5">
                    <span>{node.flag}</span>
                    <span>{node.city}</span>
                  </div>
                  <div className="text-slate-300">Threats Blocked: <span className="font-bold text-[#F59E0B]">{node.threats}</span></div>
                  <div className="text-slate-300">Status: <span className={`font-bold ${isCritical ? 'text-[#EF4444]' : isWarning ? 'text-[#F59E0B]' : 'text-[#22C55E]'}`}>{node.status}</span></div>
                  <div className="text-slate-400 text-[11px] pt-1.5 border-t border-[#1F2937]">Last activity: {node.lastActivity}</div>
                </div>
              )}
            </div>
          );
        })}

      </div>

      {/* 3. Bottom Statistics Bar with Trend Indicators & Micro Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 font-sans text-xs pt-1">
        
        <div className="p-4 rounded-2xl bg-[#081018]/90 border border-[#1F2937] space-y-1 hover:border-[#3B82F6]/50 transition-all">
          <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-mono tracking-wider">
            <span>🌍 Total Attacks</span>
            <span className="text-[#3B82F6] flex items-center"><ArrowUpRight className="w-3 h-3" /> +14%</span>
          </div>
          <div className="text-xl font-black text-slate-100 font-mono">1,640</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#081018]/90 border border-[#1F2937] space-y-1 hover:border-[#22C55E]/50 transition-all">
          <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-mono tracking-wider">
            <span>🛡 Blocked</span>
            <span className="text-[#22C55E] flex items-center"><ArrowUpRight className="w-3 h-3" /> +99.8%</span>
          </div>
          <div className="text-xl font-black text-[#22C55E] font-mono">{liveMetrics.blockedToday}</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#081018]/90 border border-[#1F2937] space-y-1 hover:border-[#EF4444]/50 transition-all">
          <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-mono tracking-wider">
            <span>🚨 Active Threats</span>
            <span className="text-[#EF4444] flex items-center"><ArrowDownRight className="w-3 h-3" /> -6%</span>
          </div>
          <div className="text-xl font-black text-[#EF4444] font-mono">{liveMetrics.activeAttacks}</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#081018]/90 border border-[#1F2937] space-y-1 hover:border-[#06B6D4]/50 transition-all">
          <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-mono tracking-wider">
            <span>🌐 Countries</span>
            <span className="text-[#06B6D4] font-bold">Active</span>
          </div>
          <div className="text-xl font-black text-[#06B6D4] font-mono">{liveMetrics.countries}</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#081018]/90 border border-[#1F2937] space-y-1 col-span-2 sm:col-span-1 hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-mono tracking-wider">
            <span>⚡ Live Sockets</span>
            <span className="text-purple-400 flex items-center"><ArrowUpRight className="w-3 h-3" /> +3%</span>
          </div>
          <div className="text-xl font-black text-purple-400 font-mono">{liveMetrics.liveConnections}</div>
        </div>

      </div>

    </div>
  );
};

export default AttackSourcesMap;
