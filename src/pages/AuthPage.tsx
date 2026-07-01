import { useState } from 'react';
import { loginUser, signupUser } from '../services/api';

type AuthMode = 'login' | 'signup';

interface AuthPageProps {
  onAuthenticated?: () => void;
  onBackToLanding?: () => void;
}

export default function AuthPage({ onAuthenticated, onBackToLanding }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = mode === 'login' ? await loginUser({ email, password }) : await signupUser({ name, email, password });
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      setMessage(`${mode === 'login' ? 'Logged in' : 'Signed up'} successfully. You can now continue to the dashboard.`);
      onAuthenticated?.();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Authentication failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Access the platform</p>
        <h2 className="mt-3 text-3xl font-semibold">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
        <p className="mt-2 text-sm text-slate-400">Experience the first version of your career operating system.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 outline-none ring-0"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          )}
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 outline-none ring-0"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 outline-none ring-0"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="w-full rounded-full bg-cyan-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-400" type="submit">
            {mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
          <span>
            {mode === 'login' ? 'New here?' : 'Already have an account?'}{' '}
            <button className="font-medium text-cyan-300" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} type="button">
              {mode === 'login' ? 'Create an account' : 'Log in'}
            </button>
          </span>
          <button className="font-medium text-cyan-300" onClick={onBackToLanding} type="button">
            Back to landing
          </button>
        </div>

        {message && <p className="mt-4 text-sm text-emerald-300">{message}</p>}
      </div>
    </div>
  );
}
