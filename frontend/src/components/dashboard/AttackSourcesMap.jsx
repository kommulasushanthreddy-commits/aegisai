import React, { useState } from 'react';
import { Globe, ShieldAlert, Navigation, Activity, CheckCircle2 } from 'lucide-react';

const ATTACK_ORIGINS = [
  {
    id: 'org_1',
    region: 'Eastern Europe (Moscow, RU)',
    ip: '185.220.101.5',
    type: 'Credential Harvesting & Phishing',
    attacks: '128 threats intercepted',
    status: 'critical',
    startX: 560,
    startY: 130,
    endX: 250,
    endY: 160
  },
  {
    id: 'org_2',
    region: 'East Asia (Tokyo, JP)',
    ip: '103.20.12.88',
    type: 'Bulk Prompt Secret Pasting',
    attacks: '45 API keys redacted',
    status: 'normal',
    startX: 820,
    startY: 180,
    endX: 250,
    endY: 160
  },
  {
    id: 'org_3',
    region: 'South America (São Paulo, BR)',
    ip: '177.12.90.14',
    type: 'Off-Hour Access Anomaly',
    attacks: '3 shadow attempts',
    status: 'medium',
    startX: 320,
    startY: 340,
    endX: 250,
    endY: 160
  },
  {
    id: 'org_4',
    region: 'North America (US-East)',
    ip: '198.51.100.45',
    type: 'Internal Gateway Routing',
    attacks: '1,420 safe prompts',
    status: 'safe',
    startX: 250,
    startY: 160,
    endX: 250,
    endY: 160
  }
];

const AttackSourcesMap = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <div className="glass-card p-6 space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 font-sans tracking-tight">Global Attack Origin & Threat Vector Map</h2>
            <p className="text-xs text-[#9CA3AF]">Real-time animated ingress trajectories targeting enterprise AI gateways.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-full bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping"></span>
          <span>Perimeter Active</span>
        </div>
      </div>

      {/* Realistic World Map Graphic Canvas */}
      <div className="relative h-72 bg-[#09090B] rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
        
        {/* World Map SVG Canvas with Continent Paths & Trajectory Arcs */}
        <svg className="w-full h-full" viewBox="0 0 1000 500">
          <defs>
            {/* Gradient for trajectory attack lines */}
            <linearGradient id="attackArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FACC15" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Detailed SVG World Continent Outlines */}
          <g className="fill-[#1F2937]/70 stroke-[#374151] stroke-[1]">
            {/* North America */}
            <path d="M120,80 Q220,40 320,80 Q380,140 300,220 Q180,240 110,160 Z" />
            {/* Greenland */}
            <path d="M360,30 Q440,20 420,70 Q370,80 360,30 Z" />
            {/* South America */}
            <path d="M280,260 Q360,270 330,420 Q240,430 250,300 Z" />
            {/* Europe & Middle East */}
            <path d="M450,80 Q560,70 590,170 Q510,260 450,240 Q430,160 450,80 Z" />
            {/* Africa */}
            <path d="M460,230 Q580,240 550,420 Q450,420 440,300 Z" />
            {/* Asia & India */}
            <path d="M590,80 Q850,60 880,220 Q740,280 610,210 Z" />
            {/* Australia */}
            <path d="M760,320 Q870,310 860,420 Q750,420 760,320 Z" />
          </g>

          {/* Animated Trajectory Attack Arcs (Curved lines connecting threat origins to central target) */}
          <g>
            {/* Trajectory 1: Moscow -> US Central */}
            <path
              d="M560,130 Q400,60 250,160"
              fill="none"
              stroke="url(#attackArcGrad)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="animate-pulse"
            />

            {/* Trajectory 2: Tokyo -> US Central */}
            <path
              d="M820,180 Q530,90 250,160"
              fill="none"
              stroke="#00D4FF"
              strokeWidth="2"
              strokeDasharray="5 5"
              opacity="0.6"
            />

            {/* Trajectory 3: Brazil -> US Central */}
            <path
              d="M320,340 Q280,240 250,160"
              fill="none"
              stroke="#FACC15"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.7"
            />
          </g>

          {/* Central Security Gateway Destination Node */}
          <g transform="translate(250, 160)">
            <circle r="14" fill="#00D4FF" opacity="0.2" className="animate-ping" />
            <circle r="8" fill="#00D4FF" />
            <circle r="4" fill="#09090B" />
          </g>
        </svg>

        {/* Pulsing Origin Markers on Map Overlay */}
        {ATTACK_ORIGINS.map((node) => {
          const isSelected = hoveredNode?.id === node.id;
          return (
            <div
              key={node.id}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{ top: `${(node.startY / 500) * 100}%`, left: `${(node.startX / 1000) * 100}%` }}
            >
              <div className="relative flex items-center justify-center">
                <span className={`animate-ping absolute inline-flex h-7 w-7 rounded-full opacity-75 ${
                  node.status === 'critical' ? 'bg-[#EF4444]' : node.status === 'medium' ? 'bg-[#FACC15]' : 'bg-[#00D4FF]'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${
                  node.status === 'critical' ? 'bg-[#EF4444]' : node.status === 'medium' ? 'bg-[#FACC15]' : 'bg-[#00D4FF]'
                }`}></span>
              </div>

              {/* Hover Tooltip */}
              {isSelected && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-30 whitespace-nowrap p-3 bg-[#09090B] border border-[#00D4FF]/40 rounded-xl text-xs font-mono space-y-1 shadow-2xl backdrop-blur-md">
                  <div className="font-extrabold text-slate-100 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#00D4FF]" />
                    <span>{node.region}</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">IP Address: <span className="text-slate-200">{node.ip}</span></div>
                  <div className="text-slate-400 text-[11px]">Vector: <span className="text-amber-300">{node.type}</span></div>
                  <div className="text-[#00D4FF] font-bold text-[11px] pt-1 border-t border-slate-800">{node.attacks}</div>
                </div>
              )}
            </div>
          );
        })}

        {/* Central Hub Label */}
        <div className="absolute top-[34%] left-[26%] text-[10px] font-mono text-[#00D4FF] font-bold px-2 py-0.5 rounded bg-[#09090B]/80 border border-[#00D4FF]/30 pointer-events-none">
          AegisAI Gateway Hub
        </div>
      </div>

      {/* Region Footer Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        {ATTACK_ORIGINS.map((node) => (
          <div
            key={node.id}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
            className={`p-3 rounded-xl bg-[#09090B]/80 border transition-all cursor-pointer ${
              hoveredNode?.id === node.id ? 'border-[#00D4FF] bg-[#111827]' : 'border-white/10 hover:border-slate-700'
            }`}
          >
            <span className="text-[10px] text-[#9CA3AF] block truncate font-sans font-semibold">{node.region.split(' ')[0]}</span>
            <div className="font-bold text-slate-100 text-xs mt-0.5">{node.attacks}</div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AttackSourcesMap;
