"use client";

import { useState } from "react";
import { Users, Search, Shield, User, X } from "lucide-react";

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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {filteredUsers.map((u) => (
            <div key={u.id} className="p-5 rounded-3xl bg-white/50 border border-[#BDD390]/60 shadow-sm hover:bg-white/80 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-black text-[#3D2E24] flex items-center gap-1.5">
                    {u.role === "Admin" ? <Shield className="h-4 w-4 text-emerald-800" /> : <User className="h-4 w-4 text-[#3D2E24]/60" />}
                    {u.name}
                  </h4>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${u.role === 'Admin' ? 'bg-[#3D2E24] text-[#BDD390]' : 'bg-[#BDD390] text-[#3D2E24]'}`}>
                    {u.role}
                  </span>
                </div>
                <p className="text-xs text-[#3D2E24]/70 mt-2">{u.email}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#BDD390]/40 flex justify-between items-center text-[11px] text-[#3D2E24]/60">
                <span>Joined: {u.joined}</span>
                <span className="font-bold text-emerald-800 bg-[#BDD390]/50 px-2 py-0.5 rounded-lg">{u.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}