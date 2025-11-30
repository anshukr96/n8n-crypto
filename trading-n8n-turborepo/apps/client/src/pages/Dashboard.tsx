import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient, type Workflow } from '@/lib/http';

export default function Dashboard() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      apiClient.setToken(token);
    }
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.getWorkflows();
      if (Array.isArray(data)) {
        setWorkflows(data);
      } else if (data) {
        setWorkflows([data]);
      } else {
        setWorkflows([]);
      }
    } catch (err: any) {
      setError(err.message || 'Could not load workflows');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Dashboard</p>
          <h1 className="text-3xl font-bold tracking-tight">Your workflows</h1>
          <p className="text-sm text-slate-300">Fetches data directly from the backend API.</p>
        </div>
        <Link
          to="/create-workflow"
          className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-300"
        >
          New workflow
        </Link>
      </div>

      <div className="mx-auto mt-8 max-w-5xl space-y-6">
        {loading && <p className="text-slate-200">Loading workflows...</p>}
        {error && <p className="text-rose-300">{error}</p>}
        {!loading && !workflows.length && !error && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-slate-300">
            No workflows yet. Create one to start automating trades.
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {workflows.map((workflow) => (
            <div key={workflow._id} className="rounded-xl border border-white/10 bg-slate-900/60 p-4 shadow-2xl shadow-emerald-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Workflow ID</p>
                  <p className="font-semibold text-white">{workflow._id}</p>
                </div>
                <div className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                  Nodes: {workflow.nodes?.length ?? 0} • Edges: {workflow.edges?.length ?? 0}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-300">
                <Link to={`/workflow/${workflow._id}`} className="rounded-lg bg-white/5 px-3 py-2 font-semibold hover:bg-white/10">
                  View detail
                </Link>
                <Link to={`/workflow/${workflow._id}/executions`} className="rounded-lg bg-white/5 px-3 py-2 font-semibold hover:bg-white/10">
                  Executions
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
