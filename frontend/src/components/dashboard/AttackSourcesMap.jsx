import React from 'react';
import { Globe, ShieldAlert, Navigation } from 'lucide-react';

const ATTACK_NODES = [
  { region: 'North America (US-East)', ip: '198.51.100.45', attacks: '42 blocked', status: 'normal', top: '35%', left: '22%' },
  { region: 'Western Europe (DE)', ip: '185.220.101.5', attacks: '128 blocked', status: 'high', top: '30%', left: '48%' },
  { region: 'East Asia (JP)', ip: '103.20.12.88', attacks: '14 blocked', status: 'normal', top: '40%', left: '80%' },
  { region: 'South America (BR)', ip: '177.12.90.14', attacks: '3 shadow attempts', status: 'medium', top: '65%', left: '32%' },
];

const AttackSourcesMap = () => {
  return (
    <div className="glass-card p-6 space-y-4 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Global Attack Sources Map</h3>
            <p className="text-xs text-slate-400">Real-time threat origination coordinates & perimeter defense.</p>
          </div>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping"></span>
          Live Ingress Watch
        </span>
      </div>

      {/* Map Graphic Container */}
      <div className="relative h-64 bg-[#09090B] rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden">
        
        {/* World Map SVG Silhouette Graphic */}
        <svg className="w-full h-full opacity-20 stroke-slate-600 fill-slate-800" viewBox="0 0 1000 500">
          {/* North America */}
          <path d="M150,120 Q200,80 300,100 Q350,150 280,220 Q200,240 150,180 Z" />
          {/* South America */}
          <path d="M280,260 Q340,270 320,400 Q260,420 250,300 Z" />
          {/* Europe & Africa */}
          <path d="M450,100 Q550,90 580,180 Q520,280 460,260 Q440,180 450,100 Z" />
          <path d="M480,240 Q580,250 560,400 Q480,410 460,300 Z" />
          {/* Asia & Australia */}
          <path d="M600,100 Q800,80 850,220 Q750,260 620,200 Z" />
          <path d="M750,320 Q850,310 840,410 Q740,400 750,320 Z" />
        </svg>

        {/* Dynamic Threat Pins */}
        {ATTACK_NODES.map((node, idx) => (
          <div
            key={idx}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ top: node.top, left: node.left }}
          >
            <div className="relative flex items-center justify-center">
              <span className={`animate-ping absolute inline-flex h-6 w-6 rounded-full opacity-75 ${
                node.status === 'high' ? 'bg-[#EF4444]' : node.status === 'medium' ? 'bg-[#FACC15]' : 'bg-[#00D4FF]'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${
                node.status === 'high' ? 'bg-[#EF4444]' : node.status === 'medium' ? 'bg-[#FACC15]' : 'bg-[#00D4FF]'
              }`}></span>
            </div>

            {/* Hover Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20 whitespace-nowrap p-2 bg-[#09090B] border border-slate-700 rounded-lg text-[11px] font-mono space-y-0.5 shadow-2xl">
              <div className="font-bold text-slate-100">{node.region}</div>
              <div className="text-slate-400">IP: {node.ip}</div>
              <div className="text-[#00D4FF]">{node.attacks}</div>
            </div>
          </div>
        ))}

      </div>

      {/* Region Footer Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
        {ATTACK_NODES.map((node, idx) => (
          <div key={idx} className="p-2.5 rounded-xl bg-[#09090B] border border-slate-800 space-y-0.5">
            <span className="text-[10px] text-slate-400 block truncate">{node.region.split(' ')[0]}</span>
            <div className="font-bold text-slate-200 text-[11px]">{node.attacks}</div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AttackSourcesMap;
