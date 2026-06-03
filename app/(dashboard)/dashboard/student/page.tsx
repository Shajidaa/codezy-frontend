export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-brand-dark">My Learning Path</h1>
        <p className="text-gray-500">Welcome back! Continue where you left off.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Enrolled Courses" value="12" />
        <StatCard title="Hours Learned" value="48h" />
        <StatCard title="Certificates" value="3" />
      </div>

      {/* Course List Component  */}
    </div>
  );
}

function StatCard({ title, value }: { title: string, value: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-2xl font-black text-brand-dark">{value}</p>
    </div>
  );
}