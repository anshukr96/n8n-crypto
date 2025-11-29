import { Handle, Position } from "@xyflow/react";
import type { PriceTriggerMetadata } from "@/types";

export function PriceTrigger({ data, isConnectable }: {
    data: {
        metadata: PriceTriggerMetadata;
    };
    isConnectable: boolean;
}) {
    return (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-lg shadow-md p-4 min-w-[200px]">
            <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📈</span>
                <h3 className="font-semibold text-lg text-emerald-900 dark:text-emerald-100">Price Trigger</h3>
            </div>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Asset:</span>
                    <span className="font-medium">{data.metadata.asset}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium">${data.metadata.price.toLocaleString()}</span>
                </div>
            </div>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="w-3 h-3 bg-emerald-500" />
        </div>
    );
}