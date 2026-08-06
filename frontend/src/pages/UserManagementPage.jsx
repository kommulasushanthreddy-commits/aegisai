import React, { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import { fetchUsers } from '../api/admin';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { RoleBadge } from '../components/common/Badge';
import { Users, UserCheck, UserX, Shield, Search } from 'lucide-react';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data.users || []);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const toggleUserStatus = (id) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === id
          ? { ...u, status: u.status === 'active' ? 'flagged' : 'active' }
          : u
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-[#0a0d14]">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e2638] pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">User Governance & Access Control</h1>
              <p className="text-xs text-slate-400">
                Manage employee roles, access privileges, and security enforcement status.
              </p>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-[#121723] rounded-3xl border border-[#1e2638] overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-6">
              <LoadingSkeleton count={3} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1e2638] bg-[#0a0d14]/60 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    <th className="py-3.5 px-4">User</th>
                    <th className="py-3.5 px-4">Department</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Access Management</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2638] text-sm">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-[#182030]/50 transition-colors">
                      
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-100">{u.name}</div>
                        <div className="text-xs font-mono text-slate-400">{u.email}</div>
                      </td>

                      <td className="py-4 px-4 text-xs font-mono text-slate-300">
                        {u.department}
                      </td>

                      <td className="py-4 px-4">
                        <RoleBadge role={u.role} />
                      </td>

                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold uppercase ${
                          u.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}>
                          {u.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                            u.status === 'active'
                              ? 'bg-rose-500/10 text-rose-300 border-rose-500/30 hover:bg-rose-500/20'
                              : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20'
                          }`}
                        >
                          {u.status === 'active' ? 'Flag User' : 'Clear Flag'}
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default UserManagementPage;
