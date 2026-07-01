import { useEffect, useState } from 'react';
import { generateRoadmap, getTwin } from '../services/api';

interface DashboardPageProps {
  onOpenMentor: () => void;
}

export default function DashboardPage({ onOpenMentor }: DashboardPageProps) {
  const [twin, setTwin] = useState<any>(null);
  const [roadmap, setRoadmap] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const fetchData = async () => {
      try {
        const twinData = await getTwin(user.id || 'demo-user');
        setTwin(twinData);
        const roadmapData = await generateRoadmap(['Python', 'DSA', 'Backend']);
        setRoadmap(roadmapData.roadmap);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">Loading your career operating system...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Career command center</p>
          <h2 className="mt-2 text-3xl font-semibold">Welcome back, {twin?.userId ? 'builder' : 'future founder'}.</h2>
          <p className="mt-2 text-slate-400">Your digital twin is learning from your latest momentum and shaping your next best move.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/70 p-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">Career health</p>
            <div className="mt-4 flex items-end gap-4">
              <div className="text-5xl font-semibold">{twin?.careerHealth ?? 84}</div>
              <div className="text-slate-400">/ 100</div>
            </div>
            <p className="mt-4 text-slate-300">{twin?.explanation ?? 'Your digital twin is learning from your recent momentum.'}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">Readiness</p>
                <p className="mt-2 text-2xl font-semibold">{twin?.readiness ?? 78}%</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">Dream role fit</p>
                <p className="mt-2 text-2xl font-semibold">{twin?.dreamRoleFit ?? 74}%</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-400">Today's mission</p>
            <ul className="mt-4 space-y-3">
              <li className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">Complete one technical deep dive</li>
              <li className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">Ship a portfolio improvement</li>
              <li className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">Practice one mock interview answer</li>
            </ul>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Adaptive roadmap</p>
            <button className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300" onClick={onOpenMentor} type="button">
              Open mentor workspace
            </button>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {roadmap.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">Step {index + 1}</p>
                <p className="mt-2 text-lg font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
