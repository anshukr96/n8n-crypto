// Node configurations and constants

export const SUPPORTED_ASSETS = ['BTC', 'ETH', 'SOL', 'ZEC'] as const;

export const SUPPORTED_TRADE_TYPES = ['LONG', 'SHORT'] as const;

export const TRIGGERS = [
  {
    id: 'timer',
    title: 'Timer',
    description: 'Run this trigger every time a certain amount of time has passed.',
    icon: '⏱️',
  },
  {
    id: 'price-trigger',
    title: 'Price Trigger',
    description: 'Run this trigger when the price of a certain asset reaches a target price.',
    icon: '📈',
  },
] as const;

export const ACTIONS = [
  {
    id: 'hyperliquid',
    title: 'Hyperliquid',
    description: 'Place a trade on Hyperliquid exchange',
    icon: '⚡',
  },
  {
    id: 'backpack',
    title: 'Backpack',
    description: 'Place a trade on Backpack exchange',
    icon: '🎒',
  },
  {
    id: 'lighter',
    title: 'Lighter',
    description: 'Place a trade on Lighter exchange',
    icon: '💡',
  },
] as const;

