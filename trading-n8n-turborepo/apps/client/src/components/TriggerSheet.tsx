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
import { TRIGGERS } from "@/config/nodes";
import type { NodeKind } from "@/types";
import { SUPPORTED_ASSETS, type PriceTriggerMetadata, type TimerMetadata } from "common/types";
import { useState } from "react";

type TriggerMetadata = TimerMetadata | PriceTriggerMetadata;

interface TriggerSheetProps {
    open: boolean;
    onClose?: () => void;
    onSelect: (kind: NodeKind, metadata: TriggerMetadata) => void;
}

export default function TriggerSheet({ open, onClose, onSelect }: TriggerSheetProps) {
    const [selectedTrigger, setSelectedTrigger] = useState<string>(TRIGGERS[0].id);
    const [metadata, setMetadata] = useState<TriggerMetadata>({
        time: 3600,
    });

    const handleSubmit = () => {
        if (selectedTrigger === 'timer') {
            const timerMeta = metadata as TimerMetadata;
            if (timerMeta.time && timerMeta.time > 0) {
                onSelect(selectedTrigger as NodeKind, timerMeta);
                if (onClose) onClose();
            }
        } else if (selectedTrigger === 'price-trigger') {
            const priceMeta = metadata as PriceTriggerMetadata;
            if (priceMeta.asset && priceMeta.price && priceMeta.price > 0) {
                onSelect(selectedTrigger as NodeKind, priceMeta);
                if (onClose) onClose();
            }
        }
    };

    const isFormValid = () => {
        if (selectedTrigger === 'timer') {
            const timerMeta = metadata as TimerMetadata;
            return timerMeta.time && timerMeta.time > 0;
        } else if (selectedTrigger === 'price-trigger') {
            const priceMeta = metadata as PriceTriggerMetadata;
            return priceMeta.asset && priceMeta.price && priceMeta.price > 0;
        }
        return false;
    };

    const handleTriggerChange = (value: string) => {
        setSelectedTrigger(value);
        if (value === 'timer') {
            setMetadata({ time: 3600 });
        } else if (value === 'price-trigger') {
            setMetadata({ asset: SUPPORTED_ASSETS[0], price: 0 });
        }
    };

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="sm:max-w-[540px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-2xl">Create Trigger</SheetTitle>
                    <SheetDescription className="text-base">
                        Configure when your workflow should start. Select a trigger type and set its parameters.
                    </SheetDescription>
                </SheetHeader>

                <div className="space-y-6 px-4 py-6">
                    {/* Trigger Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="trigger" className="text-sm font-semibold">
                            Trigger Type
                        </Label>
                        <Select value={selectedTrigger} onValueChange={handleTriggerChange}>
                            <SelectTrigger id="trigger" className="w-full">
                                <SelectValue placeholder="Select a trigger type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Triggers</SelectLabel>
                                    {TRIGGERS.map((trigger) => (
                                        <SelectItem key={trigger.id} value={trigger.id}>
                                            <div className="flex items-center gap-2">
                                                <span>{trigger.icon}</span>
                                                <div>
                                                    <div className="font-medium">{trigger.title}</div>
                                                    <div className="text-xs text-muted-foreground">{trigger.description}</div>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Timer Configuration */}
                    {selectedTrigger === 'timer' && (
                        <div className="space-y-4 border-t pt-4">
                            <h3 className="font-semibold text-sm">Timer Configuration</h3>
                            <div className="space-y-2">
                                <Label htmlFor="time" className="text-sm font-semibold">
                                    Interval (seconds)
                                </Label>
                                <Input
                                    id="time"
                                    type="number"
                                    min="1"
                                    placeholder="Enter interval in seconds"
                                    value={(metadata as TimerMetadata).time || ''}
                                    onChange={(e) => {
                                        const time = parseInt(e.target.value) || 0;
                                        setMetadata({ time } as TimerMetadata);
                                    }}
                                    className="w-full"
                                />
                                <p className="text-xs text-muted-foreground">
                                    The trigger will fire every {((metadata as TimerMetadata).time || 0).toLocaleString()} seconds
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Price Trigger Configuration */}
                    {selectedTrigger === 'price-trigger' && (
                        <div className="space-y-4 border-t pt-4">
                            <h3 className="font-semibold text-sm">Price Trigger Configuration</h3>
                            
                            <div className="space-y-2">
                                <Label htmlFor="asset" className="text-sm font-semibold">
                                    Asset
                                </Label>
                                <Select
                                    value={(metadata as PriceTriggerMetadata).asset}
                                    onValueChange={(value) =>
                                        setMetadata((prev) => ({ ...prev, asset: value } as PriceTriggerMetadata))
                                    }
                                >
                                    <SelectTrigger id="asset" className="w-full">
                                        <SelectValue placeholder="Select an asset" />
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

                            <div className="space-y-2">
                                <Label htmlFor="price" className="text-sm font-semibold">
                                    Target Price
                                </Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="Enter target price"
                                    value={(metadata as PriceTriggerMetadata).price || ''}
                                    onChange={(e) => {
                                        const price = parseFloat(e.target.value) || 0;
                                        setMetadata((prev) => ({ ...prev, price } as PriceTriggerMetadata));
                                    }}
                                    className="w-full"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Trigger will fire when {((metadata as PriceTriggerMetadata).asset || 'asset')} reaches ${((metadata as PriceTriggerMetadata).price || 0).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <SheetFooter className="gap-2">
                    {onClose && (
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                    )}
                    <Button onClick={handleSubmit} disabled={!isFormValid()}>
                        Create Trigger
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
