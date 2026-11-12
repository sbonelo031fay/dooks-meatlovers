import { describe, expect, it } from 'vitest';
import { filterMenu, formatPrice, isActiveSpecial, validateItem } from './menu';
import { menuSeed } from '../../data/menu.seed';

describe('menu business rules', () => {
  it('validates all fixtures and rejects zero prices and numeric quotes', () => {
    menuSeed.forEach(x => expect(validateItem(x)).toEqual(x));
    expect(() => validateItem({ ...menuSeed[0], pricing: { type: 'fixed', amountCents: 0, currency: 'ZAR' } })).toThrow();
    expect(() => validateItem({ ...menuSeed[0], pricing: { type: 'quote', amountCents: 100, currency: 'ZAR' } })).toThrow();
  });
  it('formats rand and quote prices independently', () => {
    expect(formatPrice(menuSeed[0].pricing)).toMatch(/R\s?100/);
    expect(formatPrice(menuSeed[8].pricing)).toBe('Let’s talk cake');
    expect(formatPrice({ type: 'from', amountCents: 10550, currency: 'ZAR' })).toMatch(/From R\s?105[,.]5/);
  });
  it('expires specials exactly at their end time', () => {
    const x = { ...menuSeed[0], special: { enabled: true, startsAt: '2026-11-01T10:00:00Z', endsAt: '2026-11-01T11:00:00Z' } };
    expect(isActiveSpecial(x, Date.parse(x.special.startsAt))).toBe(true);
    expect(isActiveSpecial(x, Date.parse(x.special.endsAt))).toBe(false);
  });
  it('combines search/category/saved/availability and excludes drafts', () => {
    const opts = { category: 'bbq', search: 'brisket', savedOnly: true, saved: ['brisket-burger'], availableOnly: true, sort: 'featured' };
    expect(filterMenu([...menuSeed, { ...menuSeed[0], id: 'draft', published: false }], opts).map(x => x.id)).toEqual(['brisket-burger']);
    expect(filterMenu(menuSeed, { ...opts, search: 'no-such-dish' })).toEqual([]);
  });
  it('puts individually quoted items after numeric prices', () => {
    const result = filterMenu(menuSeed, { category: 'all', search: '', savedOnly: false, saved: [], availableOnly: false, sort: 'price' });
    expect(result.at(-1)?.id).toBe('custom-cake');
    expect(result[0].pricing.amountCents).toBe(3000);
  });
});
