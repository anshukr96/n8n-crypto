import { Backpack } from '@/nodes/actions/Backpack';
import { Hyperliquid } from '@/nodes/actions/Hyperliquid';
import { Lighter } from '@/nodes/actions/Lighter';
import { PriceTrigger } from '@/nodes/triggers/PriceTrigger';
import { Timer } from '@/nodes/triggers/Timer';
import type { ActionSelection, FlowEdge, FlowNode, NodeKind, NodeMetadata } from '@/types';
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, MiniMap, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';
import ActionSheet from './ActionSheet';
import TriggerSheet from './TriggerSheet';

const nodeTypes = {
  'price-trigger': PriceTrigger,
  'timer': Timer,
  'lighter': Lighter,
  'backpack': Backpack,
  'hyperliquid': Hyperliquid
};

export default function CreateWorkFlow() {
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [edges, setEdges] = useState<FlowEdge[]>([]);
  const [selectedAction, setSelectedAction] = useState<ActionSelection | null>(null);
  const [showTriggerSheet, setShowTriggerSheet] = useState(true);
  const [showActionSheet, setShowActionSheet] = useState(false);

  const POSITION_OFFSET = 200;

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect = useCallback(
    (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const onConnectEnd = useCallback(
    (_params: any, connectionInfo: any) => {
      if (!connectionInfo.isValid) {
        setSelectedAction({
          startingNodeId: connectionInfo.fromNode.id,
          position: {
            x: connectionInfo.from.x + POSITION_OFFSET,
            y: connectionInfo.from.y + POSITION_OFFSET
          }
        });
        setShowActionSheet(true);
      }
    },
    []
  );

  const handleTriggerSelect = (type: NodeKind, metadata: NodeMetadata) => {
    setNodes([...nodes, {
      id: Math.random().toString(),
      type,
      data: {
        kind: 'trigger',
        metadata,
      },
      position: {
        x: 0,
        y: 0,
      },
    }]);
    setShowTriggerSheet(false);
  };

  const handleActionSelect = (type: NodeKind, metadata: NodeMetadata) => {
    if (!selectedAction) return;

    const nodeId = Math.random().toString();
    setNodes([...nodes, {
      id: nodeId,
      type,
      data: {
        kind: 'action',
        metadata
      },
      position: selectedAction.position
    }]);

    setEdges([...edges, {
      id: Math.random().toString(),
      source: selectedAction.startingNodeId,
      target: nodeId
    }]);

    setSelectedAction(null);
    setShowActionSheet(false);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }} className="bg-slate-50 dark:bg-slate-950">
      <TriggerSheet 
        open={showTriggerSheet && nodes.length === 0} 
        onSelect={handleTriggerSelect}
        onClose={() => setShowTriggerSheet(false)}
      />
      
      <ActionSheet 
        open={showActionSheet} 
        onSelect={handleActionSelect}
        onClose={() => {
          setShowActionSheet(false);
          setSelectedAction(null);
        }}
      />

      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
        className="bg-slate-50 dark:bg-slate-950"
      >
        <Background />
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            if (node.data.kind === 'trigger') return '#10b981';
            return '#3b82f6';
          }}
          className="bg-slate-100 dark:bg-slate-900"
        />
      </ReactFlow>
    </div>
  );
}
