import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ResumeMentorPage from './pages/ResumeMentorPage';

const twinMetrics = [
  { label: 'Career Readiness', value: '84%' },
  { label: 'Learning Speed', value: '92%' },
  { label: 'Resume Score', value: '89/100' },
  { label: 'Dream Role Fit', value: '78%' },
];

const roadmapSteps = [
  'Core CS fundamentals',
  'Backend systems',
  'Cloud foundations',
  'Launch portfolio',
  'Internship readiness',
];

const missionItems = [
  'Solve 3 DSA problems',
  'Ship one portfolio project',
  'Practice 20 minutes of communication',
  'Update GitHub with a new contribution',
];

interface LandingPageProps {
  onContinue: () => void;
}

function LandingPage({ onContinue }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col px-6 py-6 lg:px-8">
        <header className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Nexus • AI Career Operating System</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Your career digital twin, built to grow with you.</h1>
            </div>
            <div className="flex gap-3">
              <button onClick={onContinue} className="rounded-full bg-cyan-500 px-5 py-2.5 font-medium text-slate-950 transition hover:bg-cyan-400">Get started</button>
              <a href="#twin" className="rounded-full border border-white/15 px-5 py-2.5 font-medium text-slate-100 transition hover:bg-white/10">Explore twin</a>
            </div>
          </div>
        </header>

        <main className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/70 p-8 shadow-2xl shadow-cyan-950/40"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Launch-ready MVP</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight">Track progress, predict growth, and receive daily guidance.</h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              Career Twin AI turns your activity into a living digital twin that explains why your career score changes, what to improve next, and how your choices will shape your future.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {twinMetrics.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="twin"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">Career Digital Twin</p>
                <h3 className="mt-2 text-2xl font-semibold">Live growth model</h3>
              </div>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">Healthy</span>
            </div>

            <div className="mt-6 flex items-center justify-center">
              <div className="flex h-44 w-44 items-center justify-center rounded-full border-[12px] border-cyan-400/70 border-t-transparent bg-slate-900/80 text-center shadow-inner shadow-cyan-900/40">
                <div>
                  <p className="text-5xl font-semibold text-white">84</p>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Career Health</p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Explainable AI insight</span>
                  <span>+6% this week</span>
                </div>
                <p className="mt-2 text-sm text-slate-300">You improved due to stronger project consistency, better communication, and more focused study hours.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Projected milestone</span>
                  <span>~5 months</span>
                </div>
                <p className="mt-2 text-sm text-slate-300">At this pace, you could reach your target internship readiness with one more high-impact project.</p>
              </div>
            </div>
          </motion.section>
        </main>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Dynamic roadmap</p>
            <h3 className="mt-2 text-2xl font-semibold">Adaptive growth path</h3>
            <div className="mt-6 space-y-3">
              {roadmapSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-semibold text-cyan-300">{index + 1}</div>
                  <p className="text-slate-200">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-400">Daily missions</p>
            <h3 className="mt-2 text-2xl font-semibold">A focused plan for today</h3>
            <div className="mt-6 space-y-3">
              {missionItems.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-3">
                  <p className="text-slate-200">{item}</p>
                  <span className="rounded-full bg-fuchsia-500/15 px-3 py-1 text-sm text-fuchsia-300">+120 XP</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="launch" className="mt-8 rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Launch plan</p>
          <h3 className="mt-3 text-3xl font-semibold">Build a premium experience for students, universities, and employers.</h3>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">The MVP focuses on the core pillar: a living career digital twin, explainable AI insights, adaptive roadmaps, and daily missions. That is enough to create a strong launch story and a compelling product demo.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="mailto:hello@careertwin.ai" className="rounded-full bg-white px-5 py-2.5 font-medium text-slate-950 transition hover:bg-slate-100">Contact founder</a>
            <a href="#twin" className="rounded-full border border-white/15 px-5 py-2.5 font-medium text-slate-100 transition hover:bg-white/10">See digital twin</a>
          </div>
        </section>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMentor, setShowMentor] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const syncAuthState = () => {
      setIsAuthenticated(Boolean(localStorage.getItem('token')));
    };

    syncAuthState();
    window.addEventListener('storage', syncAuthState);

    return () => window.removeEventListener('storage', syncAuthState);
  }, []);

  if (isAuthenticated) {
    return showMentor ? <ResumeMentorPage onBackToDashboard={() => setShowMentor(false)} /> : <DashboardPage onOpenMentor={() => setShowMentor(true)} />;
  }

  if (showAuth) {
    return <AuthPage onAuthenticated={() => setIsAuthenticated(true)} onBackToLanding={() => setShowAuth(false)} />;
  }

  return <LandingPage onContinue={() => setShowAuth(true)} />;
}

export default App;
