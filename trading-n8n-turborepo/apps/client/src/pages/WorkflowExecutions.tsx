import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiClient, type Execution } from '@/lib/http';

export default function WorkflowExecutions() {
  const { workflowId } = useParams();
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) apiClient.setToken(token);
    if (workflowId) {
      fetchExecutions(workflowId);
    } else {
      setLoading(false);
      setError('Missing workflow id');
    }
  }, [workflowId]);

  const fetchExecutions = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.getWorkflowExecutions(id);
      setExecutions(data);
    } catch (err: any) {
      setError(err.message || 'Could not load executions');
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = (status: string) => {
    const colorMap: Record<string, string> = {
      PENDING: 'bg-amber-400 text-amber-950',
      SUCCESS: 'bg-emerald-400 text-emerald-950',
      FAILURE: 'bg-rose-400 text-rose-950'
    };
    return colorMap[status] || 'bg-white/10 text-white';
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Executions</p>
          <h1 className="text-3xl font-bold tracking-tight">Workflow runs</h1>
          <p className="text-sm text-slate-300">Pulled from /workflow/executions/:workflowId</p>
        </div>
        <div className="flex items-center gap-3">
          {workflowId && (
            <Link to={`/workflow/${workflowId}`} className="rounded-lg bg-white/5 px-3 py-2 text-sm font-semibold hover:bg-white/10">
              Workflow detail
            </Link>
          )}
          <Link to="/dashboard" className="rounded-lg bg-white/5 px-3 py-2 text-sm font-semibold hover:bg-white/10">
            Dashboard
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-5xl space-y-6">
        {loading && <p className="text-slate-200">Loading executions...</p>}
        {error && <p className="text-rose-300">{error}</p>}

        {!loading && !executions.length && !error && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-slate-300">
            No executions found for this workflow yet.
          </div>
        )}

        <div className="space-y-3">
          {executions.map((execution) => (
            <div key={execution._id} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 shadow-2xl shadow-emerald-500/10">
              <div>
                <p className="text-sm text-slate-300">Execution ID</p>
                <p className="font-semibold text-white">{execution._id}</p>
                <p className="text-xs text-slate-400">Workflow: {execution.workflowId}</p>
              </div>
              <div className="text-right">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${renderStatus(execution.status)}`}>
                  {execution.status}
                </span>
                <p className="mt-1 text-xs text-slate-400">
                  Started: {execution.startTime ? new Date(execution.startTime).toLocaleString() : 'N/A'}
                </p>
                <p className="text-xs text-slate-400">
                  Ended: {execution.endTime ? new Date(execution.endTime).toLocaleString() : 'N/A'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
