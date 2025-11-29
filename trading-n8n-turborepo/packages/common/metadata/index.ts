export const SUPPORTED_ASSETS = ['BTC', 'ETH', 'SOL', 'ZEC'] as const;

export type TradingMetadata = {
    type: 'LONG' | 'SHORT';
    qty: number;
    symbol: typeof SUPPORTED_ASSETS
};

export type TimerMetadata = {
    time: number;
};

export type PriceTriggerMetadata = {
    asset: string;
    price: number;
};