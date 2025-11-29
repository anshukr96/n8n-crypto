import { Handle, Position } from "@xyflow/react";
import type { TimerMetadata } from "@/types";

export function Timer({ data, isConnectable }: {
    data: {
        metadata: TimerMetadata;
    };
    isConnectable: boolean;
}) {
    const formatTime = (seconds: number) => {
        if (seconds < 60) return `${seconds}s`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
        return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
    };

    return (
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 border-2 border-cyan-200 dark:border-cyan-800 rounded-lg shadow-md p-4 min-w-[200px]">
            <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">⏱️</span>
                <h3 className="font-semibold text-lg text-cyan-900 dark:text-cyan-100">Timer</h3>
            </div>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Interval:</span>
                    <span className="font-medium">{formatTime(data.metadata.time)}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                    ({data.metadata.time} seconds)
                </div>
            </div>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="w-3 h-3 bg-cyan-500" />
        </div>
    );
}