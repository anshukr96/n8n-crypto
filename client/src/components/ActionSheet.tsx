import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { ACTIONS, SUPPORTED_ASSETS, SUPPORTED_TRADE_TYPES } from "@/config/nodes";
import type { NodeKind, TradingMetadata } from "@/types";
import { useState } from "react";

interface ActionSheetProps {
    open: boolean;
    onClose: () => void;
    onSelect: (kind: NodeKind, metadata: TradingMetadata) => void;
}

export default function ActionSheet({ open, onClose, onSelect }: ActionSheetProps) {
    const [metadata, setMetadata] = useState<Partial<TradingMetadata>>({
        type: 'LONG',
        symbol: SUPPORTED_ASSETS[0],
        qty: 0,
    });
    const [selectedAction, setSelectedAction] = useState<string>(ACTIONS[0].id);

    const handleSubmit = () => {
        if (metadata.type && metadata.symbol && metadata.qty && metadata.qty > 0) {
            onSelect(selectedAction as NodeKind, metadata as TradingMetadata);
            setMetadata({ type: 'LONG', symbol: SUPPORTED_ASSETS[0], qty: 0 });
            onClose();
        }
    };

    const isFormValid = metadata.type && metadata.symbol && metadata.qty && metadata.qty > 0;

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="sm:max-w-[540px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-2xl">Create Action</SheetTitle>
                    <SheetDescription className="text-base">
                        Configure your trading action. Select an exchange and set your trade parameters.
                    </SheetDescription>
                </SheetHeader>

                <div className="space-y-6 px-4 py-6">
                    {/* Action Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="action" className="text-sm font-semibold">
                            Exchange
                        </Label>
                        <Select value={selectedAction} onValueChange={setSelectedAction}>
                            <SelectTrigger id="action" className="w-full">
                                <SelectValue placeholder="Select an exchange" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Exchanges</SelectLabel>
                                    {ACTIONS.map((action) => (
                                        <SelectItem key={action.id} value={action.id}>
                                            <div className="flex items-center gap-2">
                                                <span>{action.icon}</span>
                                                <div>
                                                    <div className="font-medium">{action.title}</div>
                                                    <div className="text-xs text-muted-foreground">{action.description}</div>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Trade Configuration */}
                    <div className="space-y-4 border-t pt-4">
                        <h3 className="font-semibold text-sm">Trade Configuration</h3>

                        {/* Trade Type */}
                        <div className="space-y-2">
                            <Label htmlFor="type" className="text-sm font-semibold">
                                Position Type
                            </Label>
                            <Select
                                value={metadata.type}
                                onValueChange={(value) =>
                                    setMetadata((prev) => ({ ...prev, type: value as 'LONG' | 'SHORT' }))
                                }
                            >
                                <SelectTrigger id="type" className="w-full">
                                    <SelectValue placeholder="Select position type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {SUPPORTED_TRADE_TYPES.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                <div className="flex items-center gap-2">
                                                    <span className={type === 'LONG' ? 'text-green-600' : 'text-red-600'}>
                                                        {type === 'LONG' ? '📈' : '📉'}
                                                    </span>
                                                    <span className="font-medium">{type}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Symbol Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="symbol" className="text-sm font-semibold">
                                Trading Pair
                            </Label>
                            <Select
                                value={metadata.symbol}
                                onValueChange={(value) =>
                                    setMetadata((prev) => ({ ...prev, symbol: value }))
                                }
                            >
                                <SelectTrigger id="symbol" className="w-full">
                                    <SelectValue placeholder="Select a trading pair" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Assets</SelectLabel>
                                        {SUPPORTED_ASSETS.map((asset) => (
                                            <SelectItem key={asset} value={asset}>
                                                {asset}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Quantity Input */}
                        <div className="space-y-2">
                            <Label htmlFor="qty" className="text-sm font-semibold">
                                Quantity
                            </Label>
                            <Input
                                id="qty"
                                type="number"
                                min="0"
                                step="0.0001"
                                placeholder="Enter quantity"
                                value={metadata.qty || ''}
                                onChange={(e) =>
                                    setMetadata((prev) => ({ ...prev, qty: parseFloat(e.target.value) || 0 }))
                                }
                                className="w-full"
                            />
                            <p className="text-xs text-muted-foreground">
                                Enter the amount you want to trade
                            </p>
                        </div>
                    </div>
                </div>

                <SheetFooter className="gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={!isFormValid}>
                        Create Action
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
