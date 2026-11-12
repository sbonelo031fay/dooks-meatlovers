import { MenuItem } from './types';

/**
 * Clearly labelled sample menu items for Milestone 2 UI demonstration and tests.
 * Never presented as confirmed prices without the visible [SAMPLE DATA] banner.
 */
export const SAMPLE_MENU_ITEMS: MenuItem[] = [
  {
    id: 'sample-brisket-feast',
    name: '12-Hour Wood-Smoked Beef Brisket Box [Sample]',
    description:
      'Oak-smoked brisket sliced thick with sticky smokehouse glaze, spicy chakalaka slaw, charred corn, and a warm bakery roll.',
    category: 'bbq',
    image: {
      url: null,
      storagePath: null,
      alt: 'Sample placeholder for 12-hour wood-smoked beef brisket box with sides',
    },
    pricing: {
      type: 'fixed',
      amountCents: 14500,
      currency: 'ZAR',
    },
    published: true,
    soldOut: false,
    featured: true,
    sortOrder: 1,
    special: {
      enabled: true,
      startsAt: '2026-01-01T06:00:00.000Z',
      endsAt: '2027-12-31T20:00:00.000Z',
    },
    createdAt: '2026-11-01T08:00:00.000Z',
    updatedAt: '2026-11-01T08:00:00.000Z',
  },
  {
    id: 'sample-boss-kota',
    name: 'The Dooks Smokehouse Boss Kota [Sample]',
    description:
      'Freshly baked quarter loaf loaded with hand-cut slap chips, pulled smoked brisket, Russian sausage, cheddar, fried egg, and house atchar mayo.',
    category: 'kotas',
    image: {
      url: null,
      storagePath: null,
      alt: 'Sample placeholder for loaded South African kota with smoked brisket and slap chips',
    },
    pricing: {
      type: 'fixed',
      amountCents: 8500,
      currency: 'ZAR',
    },
    published: true,
    soldOut: false,
    featured: true,
    sortOrder: 2,
    special: {
      enabled: true,
      startsAt: '2026-01-01T06:00:00.000Z',
      endsAt: '2027-12-31T20:00:00.000Z',
    },
    createdAt: '2026-11-01T08:00:00.000Z',
    updatedAt: '2026-11-01T08:00:00.000Z',
  },
  {
    id: 'sample-meatlovers-platter',
    name: 'Family Pitmaster Sharing Platter (Serves 4–6) [Sample]',
    description:
      'Smoked beef brisket, flame-grilled boerewors, sticky BBQ wings, garlic butter bakery rolls, spicy wedges, and three house dipping sauces.',
    category: 'platters',
    image: {
      url: null,
      storagePath: null,
      alt: 'Sample placeholder for family pitmaster BBQ sharing platter',
    },
    pricing: {
      type: 'from',
      amountCents: 42000,
      currency: 'ZAR',
    },
    published: true,
    soldOut: false,
    featured: true,
    sortOrder: 3,
    special: {
      enabled: true,
      startsAt: '2026-01-01T06:00:00.000Z',
      endsAt: '2027-12-31T20:00:00.000Z',
    },
    createdAt: '2026-11-01T08:00:00.000Z',
    updatedAt: '2026-11-01T08:00:00.000Z',
  },
  {
    id: 'sample-pork-ribs',
    name: 'Flame-Basted Smokehouse Ribs (600g) [Sample]',
    description:
      'Tender slow-cooked ribs basted in our signature sweet-and-smoky chili glaze, served with roosterkoek and pickled red onions.',
    category: 'bbq',
    image: {
      url: null,
      storagePath: null,
      alt: 'Sample placeholder for flame-basted smokehouse ribs with roosterkoek',
    },
    pricing: {
      type: 'fixed',
      amountCents: 16500,
      currency: 'ZAR',
    },
    published: true,
    soldOut: true,
    featured: false,
    sortOrder: 4,
    special: {
      enabled: false,
      startsAt: null,
      endsAt: null,
    },
    createdAt: '2026-11-01T08:00:00.000Z',
    updatedAt: '2026-11-01T08:00:00.000Z',
  },
  {
    id: 'sample-classic-cheese-kota',
    name: 'Street-Corner Cheese & Polony Kota [Sample]',
    description:
      'Crisp hollowed quarter loaf layered with seasoned chips, French polony, Vienna, melted cheese slice, and tangy smokehouse sauce.',
    category: 'kotas',
    image: {
      url: null,
      storagePath: null,
      alt: 'Sample placeholder for classic cheese and polony kota',
    },
    pricing: {
      type: 'fixed',
      amountCents: 4800,
      currency: 'ZAR',
    },
    published: true,
    soldOut: false,
    featured: false,
    sortOrder: 5,
    special: {
      enabled: false,
      startsAt: null,
      endsAt: null,
    },
    createdAt: '2026-11-01T08:00:00.000Z',
    updatedAt: '2026-11-01T08:00:00.000Z',
  },
  {
    id: 'sample-bakery-scones',
    name: 'Freshly Baked Buttermilk Scones Bucket (12 pcs) [Sample]',
    description:
      'Golden, soft family-recipe buttermilk scones baked fresh each morning — ideal for padkos, tea time, or family gatherings.',
    category: 'bakery',
    image: {
      url: null,
      storagePath: null,
      alt: 'Sample placeholder for freshly baked buttermilk scones',
    },
    pricing: {
      type: 'fixed',
      amountCents: 9500,
      currency: 'ZAR',
    },
    published: true,
    soldOut: false,
    featured: true,
    sortOrder: 6,
    special: {
      enabled: false,
      startsAt: null,
      endsAt: null,
    },
    createdAt: '2026-11-01T08:00:00.000Z',
    updatedAt: '2026-11-01T08:00:00.000Z',
  },
  {
    id: 'sample-custom-celebration-cake',
    name: 'Bespoke Celebration & Birthday Cakes [Sample]',
    description:
      'Custom-baked sponges, buttercream drips, and personalised themes for birthdays, graduations, and family milestones. Priced to your design.',
    category: 'cakes',
    image: {
      url: null,
      storagePath: null,
      alt: 'Sample placeholder for custom celebration and birthday cake',
    },
    pricing: {
      type: 'quote',
      amountCents: null,
      currency: 'ZAR',
    },
    published: true,
    soldOut: false,
    featured: true,
    sortOrder: 7,
    special: {
      enabled: false,
      startsAt: null,
      endsAt: null,
    },
    createdAt: '2026-11-01T08:00:00.000Z',
    updatedAt: '2026-11-01T08:00:00.000Z',
  },
  {
    id: 'sample-expired-special-item',
    name: 'Midweek Smoked Chicken Quarter [Sample]',
    description:
      'Herb-brined and wood-smoked quarter chicken with peri-peri basting and freshly baked dinner roll. (Demonstrates an expired special that stays on the regular menu).',
    category: 'bbq',
    image: {
      url: null,
      storagePath: null,
      alt: 'Sample placeholder for smoked chicken quarter',
    },
    pricing: {
      type: 'fixed',
      amountCents: 6900,
      currency: 'ZAR',
    },
    published: true,
    soldOut: false,
    featured: false,
    sortOrder: 8,
    special: {
      enabled: true,
      startsAt: '2025-01-01T08:00:00.000Z',
      endsAt: '2025-01-07T20:00:00.000Z',
    },
    createdAt: '2026-11-01T08:00:00.000Z',
    updatedAt: '2026-11-01T08:00:00.000Z',
  },
];
