import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, AlertTriangle, ShieldCheck, Users, Activity } from 'lucide-react';

const Sidebar = () => {
  const links = [
    { to: '/admin', label: 'Overview & Analytics', icon: LayoutDashboard, exact: true },
    { to: '/admin/anomalies', label: 'Behavioral Anomalies', icon: AlertTriangle },
    { to: '/admin/audit-log', label: 'Hash-Chained Audit Log', icon: ShieldCheck },
    { to: '/admin/users', label: 'User Governance', icon: Users },
  ];

  return (
    <aside className="w-64 bg-[#121723] border-r border-[#1e2638] shrink-0 min-h-[calc(100vh-4rem)] p-4">
      <div className="mb-6 px-3">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
          <Activity className="w-4 h-4" /> Security Operations Center
        </span>
        <h2 className="text-sm font-bold text-slate-200 mt-1">Admin Management</h2>
      </div>

      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.exact}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#182030]'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-8 p-3.5 rounded-xl bg-[#0a0d14] border border-[#1e2638]">
        <div className="flex items-center space-x-2 text-xs text-emerald-400 font-mono font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>SYSTEM HEALTH: OK</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Audit Chain: <span className="text-teal-400 font-mono">VERIFIED INTACT</span>
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
