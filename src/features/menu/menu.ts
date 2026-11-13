import type { MenuItem, Pricing } from './types';

/** Accept local paths and HTTPS images without allowing protocol-relative URLs. */
function isSafeImageUrl(value: string): boolean {
  if (value.includes('\\') || [...value].some((ch) => ch.charCodeAt(0) <= 0x20)) return false;
  if (/^(\/(?!\/)|\.\.?\/)/.test(value)) return true;
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
}

const rand = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 2, minimumFractionDigits: 0 });

export function formatPrice(pricing: Pricing): string {
  if (pricing.type === 'quote') return 'Let’s talk cake';
  return `${pricing.type === 'from' ? 'From ' : ''}${rand.format(pricing.amountCents / 100)}`;
}

export function isActiveSpecial(item: MenuItem, now = Date.now()): boolean {
  return item.special.enabled &&
    (item.special.startsAt === null || Date.parse(item.special.startsAt) <= now) &&
    (item.special.endsAt === null || Date.parse(item.special.endsAt) > now);
}

export function validateItem(value: unknown): MenuItem {
  if (!value || typeof value !== 'object') throw new Error('Invalid menu record');
  const x = value as Record<string, unknown>;
  const p = x.pricing as Pricing | undefined;
  const s = x.special as MenuItem['special'] | undefined;
  const image = x.image as MenuItem['image'] | undefined;
  if (typeof x.id !== 'string' || !x.id || typeof x.name !== 'string' || !x.name.trim() || x.name.length > 100 ||
    typeof x.description !== 'string' || x.description.length > 600 ||
    !['bbq', 'kotas', 'platters', 'bakery', 'cakes'].includes(String(x.category)) ||
    !p || p.currency !== 'ZAR' ||
    (p.type === 'quote' ? p.amountCents !== null : !['fixed', 'from'].includes(p.type) || !Number.isSafeInteger(p.amountCents) || (p.amountCents ?? 0) <= 0) ||
    typeof x.published !== 'boolean' || typeof x.soldOut !== 'boolean' || typeof x.featured !== 'boolean' ||
    !Number.isSafeInteger(x.sortOrder) || !image || typeof image.url !== 'string' ||
    !isSafeImageUrl(image.url) || typeof image.alt !== 'string' ||
    !s || typeof s.enabled !== 'boolean' ||
    ![s.startsAt, s.endsAt].every(d => d === null || (typeof d === 'string' && Number.isFinite(Date.parse(d)))) ||
    (s.startsAt && s.endsAt && Date.parse(s.endsAt) <= Date.parse(s.startsAt))) {
    throw new Error('Menu data needs attention. Please try again later.');
  }
  return x as unknown as MenuItem;
}

export function filterMenu(items: MenuItem[], options: {
  category: string; search: string; savedOnly: boolean; saved: string[];
  availableOnly: boolean; sort: string;
}): MenuItem[] {
  const query = options.search.trim().toLocaleLowerCase();
  return items.filter(item => item.published &&
    (options.category === 'all' || item.category === options.category) &&
    (!query || `${item.name} ${item.description}`.toLocaleLowerCase().includes(query)) &&
    (!options.savedOnly || options.saved.includes(item.id)) &&
    (!options.availableOnly || !item.soldOut))
    .sort((a, b) => options.sort === 'price' ?
      (a.pricing.amountCents ?? Infinity) - (b.pricing.amountCents ?? Infinity) || a.sortOrder - b.sortOrder :
      options.sort === 'name' ? a.name.localeCompare(b.name) : a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}
