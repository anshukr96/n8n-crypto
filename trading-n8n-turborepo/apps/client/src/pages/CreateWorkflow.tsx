import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CreateWorkFlow from '@/components/CreateWorkFlow';
import { apiClient, type CreateWorkflowData } from '@/lib/http';
import type { FlowEdge, FlowNode } from '@/types';

const buildPayload = (nodes: FlowNode[], edges: FlowEdge[]): CreateWorkflowData => ({
  nodes: nodes.map((node) => ({
    id: node.id,
    nodeId: node.type,
    credentials: (node as any).credentials ?? {},
    position: node.position,
    data: {
      kind: node.data.kind === 'trigger' ? 'TRIGGER' : 'ACTION',
      metadata: node.data.metadata
    }
  })),
  edges: edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target
  }))
});

export default function CreateWorkflowPage() {
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [edges, setEdges] = useState<FlowEdge[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!nodes.length) {
      setError('Add at least one trigger to save a workflow.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload = buildPayload(nodes, edges);
      const response = await apiClient.createWorkflow(payload);
      navigate(`/workflow/${response.id}`);
    } catch (err: any) {
      setError(err.message || 'Unable to save workflow');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white">
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-slate-900/80 px-6 py-4 backdrop-blur">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Builder</p>
          <p className="text-lg font-semibold">Create a workflow</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
            {nodes.length} nodes • {edges.length} edges
          </div>
          <Link to="/dashboard" className="rounded-lg bg-white/5 px-3 py-2 text-sm font-semibold hover:bg-white/10">
            Back to dashboard
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-300 disabled:opacity-70"
          >
            {saving ? 'Saving...' : 'Save workflow'}
          </button>
        </div>
      </div>

      <div className="pt-20">
        <CreateWorkFlow onFlowChange={(n, e) => {
          setNodes(n);
          setEdges(e);
        }} />
      </div>

      {error && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
          <div className="pointer-events-auto rounded-lg border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100 shadow-lg shadow-rose-900/30">
            {error}
          </div>
        </div>
      )}
    </div>
  );
}
