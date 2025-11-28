import type { TradingMetadata } from "@/types";
import { Handle, Position } from "@xyflow/react";

export function Backpack({ data }: {
    data: {
        metadata: TradingMetadata;
    };
}) {
    return (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-2 border-amber-200 dark:border-amber-800 rounded-lg shadow-md p-4 min-w-[200px]">
            <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎒</span>
                <h3 className="font-semibold text-lg text-amber-900 dark:text-amber-100">Backpack Trade</h3>
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
            <Handle type="source" position={Position.Right} className="w-3 h-3 bg-amber-500" />
            <Handle type="target" position={Position.Left} className="w-3 h-3 bg-amber-500" />
        </div>
    );
}