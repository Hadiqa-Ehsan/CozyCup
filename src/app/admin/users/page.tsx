"use client";

import { useState } from "react";
import { Users, Search, Shield, User, X, CheckCircle2 } from "lucide-react";

const initialUsers = [
  { id: "u1", name: "Hadiqa Ehsan", email: "hadiqa@cozycup.com", role: "Admin", joined: "May 2026", status: "Active" },
  { id: "u2", name: "Ali Khan", email: "ali@gmail.com", role: "Customer", joined: "June 2026", status: "Active" },
  { id: "u3", name: "Sara Ahmed", email: "sara@gmail.com", role: "Customer", joined: "July 2026", status: "Active" }
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(
    u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
         u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 text-[#3D2E24] font-sans pb-12">
      <header className="flex flex-col gap-4 rounded-3xl bg-[#F3EDD8]/80 p-6 backdrop-blur-[12px] border border-[#BDD390] shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#3D2E24]">Manage Users</h1>
          <p className="text-sm font-medium text-[#3D2E24]/70">View platform accounts and customer profiles</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3D2E24]/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users or email..."
            className="rounded-2xl border border-[#BDD390] bg-white/70 py-2.5 pl-10 pr-8 text-sm font-medium text-[#3D2E24] placeholder-[#3D2E24]/40 focus:outline-none focus:ring-2 focus:ring-[#3D2E24]/20 shadow-sm w-72"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-[#3D2E24]/10 rounded-full p-1 hover:bg-[#3D2E24]/20"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </header>

      <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-[#3D2E24] flex items-center gap-2">
            <Users className="h-5 w-5 text-[#3D2E24]" /> Registered Members
          </h2>
          <span className="text-xs font-bold bg-[#BDD390] px-3 py-1 rounded-xl text-[#3D2E24]">
            {filteredUsers.length} Users Listed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#BDD390]/60">
            <thead>
              <tr>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Member Name</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Email Address</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Role</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Joined Date</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BDD390]/30">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-white/40 transition-colors">
                  <td className="py-4 text-xs font-bold text-[#3D2E24] flex items-center gap-2">
                    {u.role === "Admin" ? <Shield className="h-4 w-4 text-emerald-800" /> : <User className="h-4 w-4 text-[#3D2E24]/60" />}
                    {u.name}
                  </td>
                  <td className="py-4 text-xs font-medium text-[#3D2E24]/80">{u.email}</td>
                  <td className="py-4 text-xs">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${u.role === 'Admin' ? 'bg-[#3D2E24] text-[#BDD390]' : 'bg-[#BDD390] text-[#3D2E24]'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 text-xs font-medium text-[#3D2E24]/70">{u.joined}</td>
                  <td className="py-4 text-xs">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-200 text-emerald-900 border border-emerald-300">
                      <CheckCircle2 className="h-3 w-3" /> {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}