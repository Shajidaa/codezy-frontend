"use client";
import { useEffect, useState } from 'react';

interface PaymentInfo {
  lastThreeDigits: string;
  method: string;
  transactionId: string;
}

interface StudentInfo {
  contact: string;
  email: string;
  name: string;
  whatsapp: string;
}

interface Enrollment {
  _id: string;
  coursePlanId: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
  paymentInfo: PaymentInfo;
  studentInfo: StudentInfo;
}

export default function PaidStudentPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [paidStudents, setPaidStudents] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaidStudents = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enrollments`);
        const data = await response.json();
        setPaidStudents(data);
      } catch (error) {
        console.error("Failed fetching enrollments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaidStudents();
  }, []);

  const filteredStudents = paidStudents.filter((student) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.studentInfo.name.toLowerCase().includes(searchLower) ||
      student.studentInfo.email.toLowerCase().includes(searchLower) ||
      student.paymentInfo.transactionId.toLowerCase().includes(searchLower)
    );
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[var(--color-brand-dark)] text-[var(--color-brand-white)] p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--color-brand-white)]">
              Enrollment Management
            </h1>
            <p className="text-xs text-[var(--color-brand-gray)] mt-1">
              Verify incoming payments and manage manual application processing workflows.
            </p>
          </div>

          {/* Search bar input container */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search student, email, or TXID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#2A2728] border border-[var(--color-brand-gray)]/20 rounded-lg py-2 pl-4 pr-10 text-xs text-[var(--color-brand-white)] placeholder-[var(--color-brand-gray)] focus:outline-none focus:border-[var(--color-brand-gold)] transition-colors"
            />
          </div>
        </div>

        {/* High-Density Data Table Panel */}
        <div className="bg-[#2A2728] border border-[var(--color-brand-gray)]/10 rounded-xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--color-brand-gold)]"></div>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[var(--color-brand-gray)] text-xs">No pending student enrollment matches this search filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-brand-gray)]/10 bg-[#232021]">
                    <th className="py-4 px-5 text-xs font-semibold text-[var(--color-brand-gray)] uppercase tracking-wider">Student Profile</th>
                    <th className="py-4 px-5 text-xs font-semibold text-[var(--color-brand-gray)] uppercase tracking-wider">Contact Info</th>
                    <th className="py-4 px-5 text-xs font-semibold text-[var(--color-brand-gray)] uppercase tracking-wider">Course Target</th>
                    <th className="py-4 px-5 text-xs font-semibold text-[var(--color-brand-gray)] uppercase tracking-wider">Payment Mechanics</th>
                    <th className="py-4 px-5 text-xs font-semibold text-[var(--color-brand-gray)] uppercase tracking-wider text-center">Status</th>
                    <th className="py-4 px-5 text-xs font-semibold text-[var(--color-brand-gray)] uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-brand-gray)]/5">
                  {filteredStudents.map((enrollment) => (
                    <tr 
                      key={enrollment._id} 
                      className="hover:bg-[#322E2F] transition-colors group"
                    >
                      {/* Column 1: Student Core Identity */}
                      <td className="py-4 px-5 vertical-align-top">
                        <div className="font-semibold text-sm text-[var(--color-brand-white)]">
                          {enrollment.studentInfo.name}
                        </div>
                        <div className="text-xs text-[var(--color-brand-gray)] font-mono mt-0.5 break-all max-w-[200px]">
                          {enrollment.studentInfo.email}
                        </div>
                        <div className="text-[10px] text-[var(--color-brand-gray)]/50 font-mono mt-1">
                          ID: {enrollment._id}
                        </div>
                      </td>

                      {/* Column 2: Communications Matrix */}
                      <td className="py-4 px-5 text-xs text-[var(--color-brand-white)]/90">
                        <div className="space-y-0.5">
                          <div><span className="text-[var(--color-brand-gray)]">Call:</span> {enrollment.studentInfo.contact}</div>
                          <div><span className="text-[var(--color-brand-gray)]">WA:</span> {enrollment.studentInfo.whatsapp}</div>
                        </div>
                      </td>

                      {/* Column 3: Course / Tier Assignment */}
                      <td className="py-4 px-5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[var(--color-brand-gold)] text-[var(--color-brand-dark)]">
                          {enrollment.coursePlanId}
                        </span>
                        <div className="text-[10px] text-[var(--color-brand-gray)] mt-1.5">
                          {new Date(enrollment.createdAt).toLocaleDateString(undefined, {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </div>
                      </td>

                      {/* Column 4: Financial Audit Trails */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-extrabold px-1.5 py-0.2 bg-pink-600/10 text-pink-400 border border-pink-500/20 rounded uppercase tracking-wide">
                            {enrollment.paymentInfo.method}
                          </span>
                          <span className="text-xs text-[var(--color-brand-gray)] font-mono">
                            (xxx-{enrollment.paymentInfo.lastThreeDigits})
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 max-w-[220px]">
                          <span className="font-mono text-xs text-amber-400/90 truncate bg-[var(--color-brand-dark)] px-2 py-0.5 rounded border border-[var(--color-brand-gray)]/10">
                            {enrollment.paymentInfo.transactionId}
                          </span>
                          <button
                            onClick={() => handleCopy(enrollment.paymentInfo.transactionId)}
                            className="text-[10px] text-[var(--color-brand-gray)] hover:text-[var(--color-brand-gold)] font-medium uppercase tracking-wider transition-colors"
                            title="Copy Transaction ID"
                          >
                            Copy
                          </button>
                        </div>
                      </td>

                      {/* Column 5: Status Indicators */}
                      <td className="py-4 px-5 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium capitalize bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {enrollment.status}
                        </span>
                      </td>

                      {/* Column 6: Administrative Verification Engines */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="px-2.5 py-1 text-xs font-medium text-[var(--color-brand-gray)] hover:text-rose-400 rounded transition-colors">
                            Reject
                          </button>
                          <button className="px-3 py-1 text-xs font-semibold bg-[var(--color-brand-gold)] text-[var(--color-brand-dark)] hover:opacity-90 rounded shadow-sm transition-opacity">
                            Approve
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}