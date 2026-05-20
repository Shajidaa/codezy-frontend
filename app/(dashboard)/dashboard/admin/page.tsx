"use client";
import  { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  GraduationCap, 
  TrendingUp, 
  Settings, 
  Bell, 
  CheckCircle, 
  XCircle, 
  Search,
  SlidersHorizontal
} from 'lucide-react';

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
    <div className="min-h-screen bg-[#1A1818] text-brand-white flex">
      
     

      {/* Main Content Area */}
      <main className="flex-1  overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="flex justify-between items-center mb-10 pb-6 border-b border-brand-white/5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Platform Overview</h1>
            <p className="text-brand-gray text-sm">Real-time metrics for your ongoing launches.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-xl border border-brand-white/5 bg-[#232121] text-brand-gray hover:text-brand-white transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-gold rounded-full" />
            </button>
          </div>
        </header>

        {/* Analytics Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: "Total Revenue", value: "৳48,000", icon: <DollarSign className="text-brand-gold" size={20} />, trend: "+12.4% from last week" },
            { title: "Active Enrolments", value: "142 Students", icon: <Users className="text-brand-gold" size={20} />, trend: "Level-1: 68 | Level-2: 74" },
            { title: "Conversion Rate", value: "4.8%", icon: <TrendingUp className="text-brand-gold" size={20} />, trend: "Industry Avg: 3.2%" },
            { title: "Live Bootcamps", value: "02 Active", icon: <GraduationCap className="text-brand-gold" size={20} />, trend: "3-Month Cohorts" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-[#232121] border border-brand-white/5 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-gray">{stat.title}</span>
                <div className="w-8 h-8 rounded-lg bg-brand-white/5 flex items-center justify-center">{stat.icon}</div>
              </div>
              <div className="text-2xl font-bold mb-2 tracking-tight">{stat.value}</div>
              <div className="text-xs text-brand-gray font-light">{stat.trend}</div>
            </div>
          ))}
        </section>

        {/* Live Applicant Management Table */}
        <section className="bg-[#232121] border border-brand-white/5 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-brand-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-bold text-lg">Recent Course Applications</h3>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray" size={16} />
              <input 
                type="text" 
                placeholder="Search name or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#1A1818] border border-brand-white/5 rounded-xl text-sm focus:outline-none focus:border-brand-gold/50 transition-colors text-brand-white placeholder-brand-gray/60"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#1A1818]/50 text-brand-gray border-b border-brand-white/5">
                  <th className="p-4 font-medium">Applicant Details</th>
                  <th className="p-4 font-medium">Target Level</th>
                  <th className="p-4 font-medium">Fee Amount</th>
                  <th className="p-4 font-medium">Payment Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-white/5">
                {filteredApplicants.map((app) => (
                  <tr key={app.id} className="hover:bg-brand-white/[0.01] transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-brand-white">{app.name}</div>
                      <div className="text-xs text-brand-gray">{app.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 text-xs rounded-md font-medium bg-brand-white/5 border border-brand-white/10">
                        {app.level}
                      </span>
                    </td>
                    <td className="p-4 font-medium tracking-tight">{app.amount}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full font-medium ${
                        app.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        app.status === 'Pending' ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20' :
                        'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          app.status === 'Paid' ? 'bg-emerald-400' :
                          app.status === 'Pending' ? 'bg-brand-gold' :
                          'bg-rose-400'
                        }`} />
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleStatusChange(app.id, "Paid")}
                          title="Approve & Mark Paid"
                          className="p-1.5 rounded-lg bg-emerald-500/5 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/10 transition-colors"
                        >
                          <CheckCircle size={15} />
                        </button>
                        <button 
                          onClick={() => handleStatusChange(app.id, "Failed")}
                          title="Reject / Failed"
                          className="p-1.5 rounded-lg bg-rose-500/5 hover:bg-rose-500/20 text-rose-400 border border-rose-500/10 transition-colors"
                        >
                          <XCircle size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredApplicants.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-brand-gray font-light">
                      No applicants found mapping your query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}