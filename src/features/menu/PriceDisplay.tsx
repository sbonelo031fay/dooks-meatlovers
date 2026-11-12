import { formatMenuPrice, MenuItemPricing } from './types';

interface PriceDisplayProps {
  pricing: MenuItemPricing;
  className?: string;
}

export function PriceDisplay({ pricing, className = '' }: PriceDisplayProps) {
  const formatted = formatMenuPrice(pricing);
  const isQuote = pricing.type === 'quote';

  return (
    <span
      className={`inline-flex items-center font-display tracking-wide ${
        isQuote
          ? 'rounded-md border border-amber-500/40 bg-amber-950/60 px-2.5 py-1 text-sm font-semibold uppercase text-amber-300'
          : 'text-lg font-bold text-amber-400'
      } ${className}`}
    >
      {formatted}
    </span>
  );
}
