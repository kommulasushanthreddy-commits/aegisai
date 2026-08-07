import React, { useState, useEffect } from 'react';
import { Globe, ShieldAlert, Activity, CheckCircle2, Zap } from 'lucide-react';

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
    startX: 240,
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
    startX: 490,
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
    startX: 570,
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
    startX: 680,
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
    startX: 745,
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
    startX: 865,
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

  // Dynamic live metric simulation
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
      
      {/* 1. Header & Legend */}
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
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></span> Safe
          </span>
          <span className="flex items-center gap-1.5 text-[#FACC15]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FACC15]"></span> Warning
          </span>
          <span className="flex items-center gap-1.5 text-[#EF4444]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span> Critical
          </span>
          <span className="flex items-center gap-1.5 text-[#00D4FF]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D4FF]"></span> Gateway
          </span>
        </div>
      </div>

      {/* 2. Real World Map Canvas with Radar Sweep & Animated Attack Paths */}
      <div className="relative h-80 bg-[#09090B] rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
        
        {/* Faint Rotating Radar Sweep Effect */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-[520px] h-[520px] rounded-full border border-[#00D4FF]/20 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00D4FF]/40 via-transparent to-transparent animate-spin origin-center" style={{ animationDuration: '9s' }}></div>
          </div>
        </div>

        {/* SVG World Map */}
        <svg className="w-full h-full relative z-10" viewBox="0 0 1000 500">
          
          {/* Hexagonal / Grid Background Overlay */}
          <pattern id="hexGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.025)" strokeWidth="1" />
          </pattern>
          <rect width="1000" height="500" fill="url(#hexGrid)" />

          {/* High-Precision Dark Blue World Continent Shapes */}
          <g className="fill-[#111827] stroke-[#1E293B] stroke-[1.5]">
            {/* North America */}
            <path d="M 100 90 Q 200 40 330,80 Q 370,140 290,220 Q 180,240 100,160 Z" />
            {/* Greenland */}
            <path d="M 360,25 Q 440,15 420,65 Q 370,75 360,25 Z" />
            {/* South America */}
            <path d="M 270,260 Q 350,270 320,430 Q 230,440 240,300 Z" />
            {/* Europe */}
            <path d="M 440,80 Q 560,70 590,160 Q 510,240 440,220 Q 420,150 440,80 Z" />
            {/* Africa */}
            <path d="M 450,230 Q 580,240 550,430 Q 440,430 430,300 Z" />
            {/* Asia */}
            <path d="M 590,70 Q 860,50 890,220 Q 740,290 600,210 Z" />
            {/* Japan Islands */}
            <path d="M 855,160 Q 875,150 870,190 Q 850,200 855,160 Z" />
            {/* Australia */}
            <path d="M 750,330 Q 870,320 860,430 Q 740,430 750,330 Z" />
          </g>

          {/* Animated Trajectory Curves to Gateway (New York: 240, 175) */}
          <g>
            {/* Critical Arc: Moscow (570, 105) -> NY (240, 175) */}
            <path
              d="M 570 105 Q 400 30 240 175"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="animate-pulse"
            />
            {/* Warning Arc: Frankfurt (490, 140) -> NY (240, 175) */}
            <path
              d="M 490 140 Q 365 90 240 175"
              fill="none"
              stroke="#FACC15"
              strokeWidth="2"
              strokeDasharray="5 5"
              opacity="0.8"
            />
            {/* Safe Arc: Bangalore (680, 245) -> NY (240, 175) */}
            <path
              d="M 680 245 Q 450 130 240 175"
              fill="none"
              stroke="#22C55E"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.6"
            />
            {/* Warning Arc: Singapore (745, 295) -> NY (240, 175) */}
            <path
              d="M 745 295 Q 500 190 240 175"
              fill="none"
              stroke="#FACC15"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.7"
            />
            {/* Safe Arc: Tokyo (865, 175) -> NY (240, 175) */}
            <path
              d="M 865 175 Q 550 60 240 175"
              fill="none"
              stroke="#22C55E"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.5"
            />
          </g>

          {/* Central Pulsing Destination Node (Gateway Hub at NY) */}
          <g transform="translate(240, 175)">
            <circle r="16" fill="#00D4FF" opacity="0.25" className="animate-ping" />
            <circle r="9" fill="#00D4FF" className="shadow-glow-cyan" />
            <circle r="4" fill="#09090B" />
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
                {/* Expanding Pulse Circle */}
                <span className={`animate-ping absolute inline-flex rounded-full opacity-75 ${
                  isGateway ? 'h-8 w-8 bg-[#00D4FF]' : isCritical ? 'h-9 w-9 bg-[#EF4444]' : isWarning ? 'h-7 w-7 bg-[#FACC15]' : 'h-6 w-6 bg-[#22C55E]'
                }`}></span>
                
                {/* Center Node Marker */}
                <span className={`relative inline-flex rounded-full shadow-lg ${
                  isGateway ? 'h-5 w-5 bg-[#00D4FF] border-2 border-white' : 'h-4 w-4 ' + (isCritical ? 'bg-[#EF4444]' : isWarning ? 'bg-[#FACC15]' : 'bg-[#22C55E]')
                }`}></span>
              </div>

              {/* City Label Badge */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] font-mono font-bold text-slate-200 px-1.5 py-0.5 rounded bg-[#09090B]/90 border border-white/10 whitespace-nowrap pointer-events-none">
                {node.flag} {node.city.split(' ')[0]}
              </div>

              {/* Rich Hover Tooltip (Exact Spec format) */}
              {isSelected && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-40 whitespace-nowrap p-3.5 bg-[#09090B] border border-[#00D4FF]/40 rounded-xl text-xs font-mono space-y-1 shadow-glow-cyan backdrop-blur-xl">
                  <div className="font-extrabold text-slate-100 flex items-center gap-1.5 text-sm">
                    <span>{node.flag}</span>
                    <span>{node.city.split(' ')[0]}</span>
                  </div>
                  <div className="text-slate-300">Threats: <span className="font-bold text-amber-400">{node.threats}</span></div>
                  <div className="text-slate-300">Status: <span className={`font-bold ${isCritical ? 'text-[#EF4444]' : isWarning ? 'text-[#FACC15]' : 'text-[#22C55E]'}`}>{node.status}</span></div>
                  <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800">Last activity: {node.lastActivity}</div>
                </div>
              )}
            </div>
          );
        })}

      </div>

      {/* 3. Improved Bottom Statistics Bar */}
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
