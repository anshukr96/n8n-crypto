import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '@/lib/http';

type Mode = 'signin' | 'signup';

export default function Auth() {
  const [mode, setMode] = useState<Mode>('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      apiClient.setToken(token);
    }
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        await apiClient.signup({ username, password });
        setInfo('Account created. You can sign in now.');
        setMode('signin');
      } else {
        const response = await apiClient.signin({ username, password });
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userId', response.id);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="w-full max-w-[420px] space-y-6 rounded-2xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-emerald-500/20 backdrop-blur">
        <div className="space-y-2 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Authenticate</p>
          <h1 className="text-3xl font-bold tracking-tight">{mode === 'signin' ? 'Sign in' : 'Create account'}</h1>
          <p className="text-sm text-slate-300">Access your trading workflows and run executions.</p>
        </div>

        <div className="flex items-center justify-center gap-3 text-sm">
          <button
            className={`rounded-full px-4 py-2 font-semibold ${mode === 'signin' ? 'bg-emerald-400 text-slate-950' : 'bg-white/10 text-white'}`}
            onClick={() => setMode('signin')}
            type="button"
          >
            Sign in
          </button>
          <button
            className={`rounded-full px-4 py-2 font-semibold ${mode === 'signup' ? 'bg-emerald-400 text-slate-950' : 'bg-white/10 text-white'}`}
            onClick={() => setMode('signup')}
            type="button"
          >
            Sign up
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm text-slate-200">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
              placeholder="trader@example"
              required
              minLength={3}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-sm text-rose-300">{error}</p>}
          {info && <p className="text-sm text-emerald-300">{info}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-lg bg-emerald-400 px-4 py-2 text-base font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:opacity-70"
          >
            {loading ? 'Processing...' : mode === 'signin' ? 'Sign in' : 'Sign up'}
          </button>
        </form>

        <div className="text-center text-sm text-slate-300">
          <Link to="/" className="text-emerald-200 hover:text-emerald-100">Back to landing</Link>
        </div>
      </div>
    </div>
  );
}
