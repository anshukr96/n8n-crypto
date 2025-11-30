import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiClient, type Workflow } from '@/lib/http';

export default function WorkflowDetail() {
  const { workflowId } = useParams();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) apiClient.setToken(token);
    if (workflowId) {
      fetchWorkflow(workflowId);
    } else {
      setLoading(false);
      setError('Missing workflow id');
    }
  }, [workflowId]);

  const fetchWorkflow = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.getWorkflow(id);
      setWorkflow(data);
    } catch (err: any) {
      setError(err.message || 'Could not load workflow');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Workflow</p>
          <h1 className="text-3xl font-bold tracking-tight">Detail</h1>
          <p className="text-sm text-slate-300">Pulled from /workflow/:workflowId</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="rounded-lg bg-white/5 px-3 py-2 text-sm font-semibold hover:bg-white/10">
            Back to dashboard
          </Link>
          {workflowId && (
            <Link to={`/workflow/${workflowId}/executions`} className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300">
              View executions
            </Link>
          )}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-5xl space-y-6">
        {loading && <p className="text-slate-200">Loading workflow...</p>}
        {error && <p className="text-rose-300">{error}</p>}

        {workflow && !loading && (
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 shadow-2xl shadow-emerald-500/10">
              <p className="text-sm text-slate-300">Workflow ID</p>
              <p className="font-semibold text-white">{workflow._id}</p>
              <p className="text-sm text-slate-400">User: {workflow.userId}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Nodes</p>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{workflow.nodes?.length ?? 0}</span>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {(workflow.nodes || []).map((node) => (
                  <div key={node.id} className="rounded-lg border border-white/10 bg-slate-900/80 p-4">
                    <p className="text-sm text-emerald-200">{node.data.kind}</p>
                    <p className="text-base font-semibold text-white">{node.nodeId}</p>
                    <p className="mt-1 text-xs text-slate-400">Position: ({node.position.x}, {node.position.y})</p>
                    <pre className="mt-2 overflow-x-auto rounded bg-black/30 p-2 text-xs text-slate-200">
                      {JSON.stringify(node.data.metadata, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Edges</p>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{workflow.edges?.length ?? 0}</span>
              </div>
              <div className="space-y-2">
                {(workflow.edges || []).map((edge) => (
                  <div key={edge.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-900/80 px-4 py-3 text-sm">
                    <span className="text-slate-200">ID: {edge.id}</span>
                    <span className="text-slate-300">
                      {edge.source} → {edge.target}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
