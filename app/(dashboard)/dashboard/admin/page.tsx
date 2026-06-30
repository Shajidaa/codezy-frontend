"use client";

import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { 
  FaUsers, 
  FaMoneyCheckDollar, 

  FaArrowTrendUp, 
  FaBell, 
  FaCheck, 
  FaXmark, 
  FaMagnifyingGlass 
} from 'react-icons/fa6';

// Mock Data for Dashboard
const initialApplicants = [
  { id: "1", name: "Rahat Chowdhury", email: "rahat@gmail.com", level: "Level-2", status: "Paid", amount: "৳20,000", date: "May 18, 2026" },
  { id: "2", name: "Tasnim Ahmed", email: "tasnim@yahoo.com", level: "Level-1", status: "Pending", amount: "$75", date: "May 19, 2026" },
  { id: "3", name: "Fahim Shahriar", email: "fahim@codezy.com", level: "Level-2", status: "Paid", amount: "৳20,000", date: "May 20, 2026" },
  { id: "4", name: "Anika Rahman", email: "anika@outlook.com", level: "Level-1", status: "Failed", amount: "৳8,000", date: "May 20, 2026" },
];

export default function AdminPage() {
  const [applicants, setApplicants] = useState(initialApplicants);
  const [searchTerm, setSearchTerm] = useState("");

  const handleStatusChange = (id: string, newStatus: "Paid" | "Pending" | "Failed") => {
    setApplicants(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  const filteredApplicants = applicants.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen  text-[#FFFFFF] flex font-sans">
      
      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto max-w-[1600px] mx-auto w-full">
        
        {/* Top Navbar */}
        <header className="flex justify-between items-center mb-10 pb-6 border-b border-[#FFFFFF]/5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Platform Overview</h1>
            <p className="text-[#949293] text-sm">Real-time metrics for your ongoing launches.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-xl border border-[#FFFFFF]/5 bg-[#232121] text-[#949293] hover:text-[#FFFFFF] transition-colors relative">
              <FaBell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#EEB30D] rounded-full" />
            </button>
          </div>
        </header>

        {/* Analytics Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: "Total Revenue", value: "৳48,000", icon: <FaMoneyCheckDollar className="text-[#EEB30D]" size={20} />, trend: "+12.4% from last week" },
            { title: "Active Enrolments", value: "142 Students", icon: <FaUsers className="text-[#EEB30D]" size={20} />, trend: "Level-1: 68 | Level-2: 74" },
            { title: "Conversion Rate", value: "4.8%", icon: <FaArrowTrendUp className="text-[#EEB30D]" size={20} />, trend: "Industry Avg: 3.2%" },
            { title: "Live Bootcamps", value: "02 Active", icon: <FaUser className="text-[#EEB30D]" size={20} />, trend: "3-Month Cohorts" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-[#232121] border border-[#FFFFFF]/5 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#949293]">{stat.title}</span>
                <div className="w-8 h-8 rounded-lg bg-[#FFFFFF]/5 flex items-center justify-center">{stat.icon}</div>
              </div>
              <div className="text-2xl font-bold mb-2 tracking-tight">{stat.value}</div>
              <div className="text-xs text-[#949293] font-light">{stat.trend}</div>
            </div>
          ))}
        </section>

        {/* Live Applicant Management Table */}
        <section className="bg-[#232121] border border-[#FFFFFF]/5 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-[#FFFFFF]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-bold text-lg">Recent Course Applications</h3>
            <div className="relative max-w-xs w-full">
              <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-[#949293]" size={16} />
              <input 
                type="text" 
                placeholder="Search name or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#1A1818] border border-[#FFFFFF]/5 rounded-xl text-sm focus:outline-none focus:border-[#EEB30D]/50 transition-colors text-[#FFFFFF] placeholder-[#949293]/60"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1A1818] border-b border-[#FFFFFF]/5 text-xs font-semibold uppercase tracking-wider text-[#949293]">
                  <th className="p-5">Applicant</th>
                  <th className="p-5">Cohort Level</th>
                  <th className="p-5">Amount</th>
                  <th className="p-5">Date</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FFFFFF]/5 text-sm">
                {filteredApplicants.map((app) => (
                  <tr key={app.id} className="hover:bg-[#FFFFFF]/2 transition-colors">
                    <td className="p-5">
                      <div className="font-medium text-[#FFFFFF]">{app.name}</div>
                      <div className="text-xs text-[#949293] mt-0.5">{app.email}</div>
                    </td>
                    <td className="p-5 text-[#949293] font-medium">{app.level}</td>
                    <td className="p-5 font-mono text-[#FFFFFF]">{app.amount}</td>
                    <td className="p-5 text-[#949293]">{app.date}</td>
                    <td className="p-5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        app.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' :
                        app.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-5 text-right space-x-2">
                      {app.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(app.id, 'Paid')}
                            className="p-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-[#393536] rounded-xl transition-all"
                            title="Approve"
                          >
                            <FaCheck size={12} />
                          </button>
                          <button 
                            onClick={() => handleStatusChange(app.id, 'Failed')}
                            className="p-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-[#393536] rounded-xl transition-all"
                            title="Reject"
                          >
                            <FaXmark size={12} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}