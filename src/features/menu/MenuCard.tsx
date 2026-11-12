import { buildWhatsAppEnquiryUrl } from '../business/types';
import { PriceDisplay } from './PriceDisplay';
import {
  isSpecialActive,
  MENU_CATEGORY_LABELS,
  MenuItem,
} from './types';

interface MenuCardProps {
  item: MenuItem;
  whatsappNumber: string | null;
  now?: Date;
}

export function MenuCard({
  item,
  whatsappNumber,
  now = new Date(),
}: MenuCardProps) {
  const activeSpecial = isSpecialActive(item, now);
  const categoryLabel = MENU_CATEGORY_LABELS[item.category];

  const enquiryMessage =
    item.pricing.type === 'quote'
      ? `Hi Dooks Meatlovers! I would like to request a custom quote for: ${item.name}.`
      : `Hi Dooks Meatlovers! I would like to enquire about ordering: ${item.name}.`;

  const whatsappUrl = buildWhatsAppEnquiryUrl(whatsappNumber, enquiryMessage);

  return (
    <article
      className="flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-900 overflow-hidden shadow-md transition-colors hover:border-stone-700 focus-within:ring-2 focus-within:ring-orange-500"
      aria-label={item.name}
    >
      <div>
        {/* Explicit aspect-ratio media container to prevent layout shift */}
        <div className="relative aspect-[16/10] w-full bg-stone-950 border-b border-stone-800 overflow-hidden flex items-center justify-center p-4">
          {item.image.url ? (
            <img
              src={item.image.url}
              alt={item.image.alt}
              width={640}
              height={400}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label={item.image.alt}
              className="flex flex-col items-center justify-center text-center px-3 py-4 border border-dashed border-stone-700 rounded-lg w-full h-full bg-gradient-to-br from-stone-950 via-stone-900 to-orange-950/30"
            >
              <span className="rounded bg-stone-800 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-amber-400">
                Sample Photo Placeholder
              </span>
              <span className="mt-2 text-xs text-stone-300 line-clamp-2">
                {item.image.alt}
              </span>
            </div>
          )}

          {/* Status & Special Badges */}
          <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            <span className="rounded bg-stone-950/90 border border-stone-700 px-2.5 py-1 text-xs font-medium text-orange-100">
              {categoryLabel}
            </span>

            <div className="flex items-center gap-1.5">
              {activeSpecial && (
                <span className="rounded bg-orange-700 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-50 shadow">
                  Special Offer
                </span>
              )}
              {item.soldOut && (
                <span className="rounded bg-red-800 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-50 shadow">
                  Sold Out
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-bold tracking-wide text-orange-50">
              {item.name}
            </h3>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-stone-300">
            {item.description}
          </p>
        </div>
      </div>

      <div className="border-t border-stone-800/80 bg-stone-950/50 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <PriceDisplay pricing={item.pricing} />

        {item.soldOut ? (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="min-h-[44px] rounded-lg border border-stone-700 bg-stone-800/70 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-400 cursor-not-allowed"
          >
            Currently Sold Out
          </button>
        ) : whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-orange-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-orange-50 transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-stone-950"
          >
            {item.pricing.type === 'quote'
              ? 'Request Cake Quote'
              : 'Enquire on WhatsApp'}
          </a>
        ) : (
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="WhatsApp number pending owner confirmation in docs/content-checklist.md"
            className="min-h-[44px] rounded-lg border border-stone-700 bg-stone-800/80 px-3.5 py-2 text-xs font-medium text-stone-300 cursor-not-allowed"
          >
            {item.pricing.type === 'quote'
              ? 'Quote Line Pending Setup'
              : 'WhatsApp Pending Setup'}
          </button>
        )}
      </div>
    </article>
  );
}
