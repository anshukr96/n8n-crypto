import type { TradingMetadata } from "common/metadata";

type NodeKind = "ACTION" | "TRIGGER";

interface WorkflowNode {
  id: string;
  type: string;
  credentials?: Record<string, unknown>;
  data: {
    kind: NodeKind;
    metadata: Record<string, unknown>;
  };
}

interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

export async function execute(nodes: WorkflowNode[], edges: WorkflowEdge[]): Promise<void> {
  const trigger = nodes.find((node) => node.data.kind === "TRIGGER");
  if (!trigger) return;

  await executeRecursive(trigger.id, nodes, edges);
}

async function executeLighterAction(node: WorkflowNode): Promise<void> {
  const metadata = node.data.metadata as TradingMetadata;

  console.log(
    `[lighter] Executing ${metadata.type} order for ${metadata.qty} ${metadata.symbol} with credentials:`,
    node.credentials ?? {}
  );
  // Placeholder for invoking the real Lighter integration.
}

export async function executeRecursive(
  sourceId: string,
  nodes: WorkflowNode[],
  edges: WorkflowEdge[]
): Promise<void> {
  const nodesToExecute = edges.filter(({ source }) => source === sourceId).map(({ target }) => target);

  await Promise.all(
    nodesToExecute.map(async (nodeClientId) => {
      const node = nodes.find(({ id }) => id === nodeClientId);
      if (!node) return;

      switch (node.type) {
        case "lighter":
          await executeLighterAction(node);
          break;
        default:
          break;
      }

      await executeRecursive(node.id, nodes, edges);
    })
  );
}
