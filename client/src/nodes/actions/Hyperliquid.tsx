import { Handle, Position } from "@xyflow/react";
import type { TradingMetadata } from "@/types";

export function Hyperliquid({ data }: {
    data: {
        metadata: TradingMetadata;
    };
}) {
    return (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-200 dark:border-purple-800 rounded-lg shadow-md p-4 min-w-[200px]">
            <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">⚡</span>
                <h3 className="font-semibold text-lg text-purple-900 dark:text-purple-100">Hyperliquid Trade</h3>
            </div>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className={`font-medium ${data.metadata.type === 'LONG' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {data.metadata.type}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Symbol:</span>
                    <span className="font-medium">{data.metadata.symbol}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="font-medium">{data.metadata.qty}</span>
                </div>
            </div>
            <Handle type="source" position={Position.Right} className="w-3 h-3 bg-purple-500" />
            <Handle type="target" position={Position.Left} className="w-3 h-3 bg-purple-500" />
        </div>
    );
}