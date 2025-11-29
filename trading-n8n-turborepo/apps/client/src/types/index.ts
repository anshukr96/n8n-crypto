// Centralized type definitions

import { type PriceTriggerMetadata, type TimerMetadata, type TradingMetadata } from "common/types";

export type NodeKind = 'price-trigger' | 'timer' | 'hyperliquid' | 'backpack' | 'lighter';

export type NodeType = 'trigger' | 'action';

export type NodeMetadata = TradingMetadata | PriceTriggerMetadata | TimerMetadata;

export interface FlowNode {
  type: NodeKind;
  data: {
    kind: NodeType;
    metadata: NodeMetadata;
  };
  id: string;
  position: {
    x: number;
    y: number;
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
}

export interface ActionSelection {
  position: {
    x: number;
    y: number;
  };
  startingNodeId: string;
}

