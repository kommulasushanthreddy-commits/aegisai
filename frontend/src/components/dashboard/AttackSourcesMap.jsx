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
    startY: 180
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
    startY: 145
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
    startY: 110
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
    startY: 248
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
    startY: 298
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
    startY: 180
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

  // Dynamic live metric updates simulating live SOC telemetry
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
      
      {/* 1. Header with Live Status & Palette Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1F2937] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/40 flex items-center justify-center shadow-glow-cyan">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-100 font-sans tracking-tight">Global Threat Intelligence Centerpiece</h2>
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

      {/* 2. World Map Graphic Canvas with Floating Particles & Moving Attack Trajectories */}
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

        {/* SVG World Map */}
        <svg className="w-full h-full relative z-10" viewBox="0 0 1000 500">
          
          {/* Subtle Grid Pattern Overlay */}
          <pattern id="socGrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(59, 130, 246, 0.035)" strokeWidth="1" />
          </pattern>
          <rect width="1000" height="500" fill="url(#socGrid)" />

          {/* High-Precision Dark Blue World Continent Shapes with Glowing Borders */}
          <g className="fill-[#111827] stroke-[#3B82F6]/40 stroke-[1.5]">
            {/* North America */}
            <path d="M 90 90 Q 200 35 340,75 Q 380,135 295,225 Q 175,245 90,165 Z" />
            {/* Greenland */}
            <path d="M 355,20 Q 435,10 415,60 Q 365,70 355,20 Z" />
            {/* South America */}
            <path d="M 265,255 Q 355,265 325,435 Q 225,445 235,295 Z" />
            {/* Europe */}
            <path d="M 435,75 Q 565,65 595,155 Q 515,245 435,225 Q 415,145 435,75 Z" />
            {/* Africa */}
            <path d="M 445,225 Q 585,235 555,435 Q 435,435 425,295 Z" />
            {/* Asia */}
            <path d="M 585,65 Q 865,45 895,215 Q 745,295 595,205 Z" />
            {/* Japan Islands */}
            <path d="M 858,155 Q 878,145 873,195 Q 853,205 858,155 Z" />
            {/* Australia */}
            <path d="M 745,325 Q 875,315 865,435 Q 735,435 745,325 Z" />
          </g>

          {/* Animated Trajectory Curves to Gateway (New York: 250, 180) */}
          <g>
            {/* Critical Arc: Moscow (575, 110) -> NY (250, 180) */}
            <path
              d="M 575 110 Q 400 30 250 180"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
              strokeDasharray="8 8"
              className="animate-attack-line"
            />
            {/* Warning Arc: Frankfurt (495, 145) -> NY (250, 180) */}
            <path
              d="M 495 145 Q 365 95 250 180"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2"
              strokeDasharray="7 7"
              className="animate-attack-line"
              opacity="0.85"
            />
            {/* Safe Arc: Bangalore (685, 248) -> NY (250, 180) */}
            <path
              d="M 685 248 Q 450 135 250 180"
              fill="none"
              stroke="#22C55E"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="animate-attack-line"
              opacity="0.75"
            />
            {/* Warning Arc: Singapore (750, 298) -> NY (250, 180) */}
            <path
              d="M 750 298 Q 500 195 250 180"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.8"
              strokeDasharray="6 6"
              className="animate-attack-line"
              opacity="0.8"
            />
            {/* Safe Arc: Tokyo (868, 180) -> NY (250, 180) */}
            <path
              d="M 868 180 Q 550 65 250 180"
              fill="none"
              stroke="#22C55E"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              className="animate-attack-line"
              opacity="0.6"
            />
          </g>

          {/* Central Destination Gateway Node (New York: 250, 180) */}
          <g transform="translate(250, 180)">
            <circle r="20" fill="#06B6D4" opacity="0.25" className="animate-ping" />
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
                {/* Expanding Pulse Circle */}
                <span className={`animate-ping absolute inline-flex rounded-full opacity-75 ${
                  isGateway ? 'h-9 w-9 bg-[#06B6D4]' : isCritical ? 'h-10 w-10 bg-[#EF4444]' : isWarning ? 'h-8 w-8 bg-[#F59E0B]' : 'h-7 w-7 bg-[#22C55E]'
                }`}></span>
                
                {/* Center Node Marker */}
                <span className={`relative inline-flex rounded-full shadow-lg ${
                  isGateway ? 'h-5.5 w-5.5 bg-[#06B6D4] border-2 border-white' : 'h-4.5 w-4.5 ' + (isCritical ? 'bg-[#EF4444]' : isWarning ? 'bg-[#F59E0B]' : 'bg-[#22C55E]')
                }`}></span>
              </div>

              {/* City Label Badge */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] font-mono font-bold text-slate-200 px-2 py-0.5 rounded-lg bg-[#081018]/95 border border-[#1F2937] shadow-lg whitespace-nowrap pointer-events-none">
                {node.flag} {node.city.split(' ')[0]}
              </div>

              {/* Rich Hover Tooltip (Exact Spec format) */}
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
