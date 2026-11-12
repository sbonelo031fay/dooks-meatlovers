import { z } from 'zod';

export const menuCategorySchema = z.enum([
  'bbq',
  'kotas',
  'platters',
  'bakery',
  'cakes',
]);

export type MenuCategory = z.infer<typeof menuCategorySchema>;

export const MENU_CATEGORY_LABELS: Record<MenuCategory, string> = {
  bbq: 'Smokehouse BBQ',
  kotas: 'Loaded Kotas',
  platters: 'Sharing Platters',
  bakery: 'Fresh Bakery',
  cakes: 'Custom Cakes',
};

export const MENU_CATEGORY_DESCRIPTIONS: Record<MenuCategory, string> = {
  bbq: 'Low-and-slow wood-smoked brisket, ribs, and flame-grilled cuts.',
  kotas: 'Towering township street-food favourites packed with flavour.',
  platters: 'Generous meat and bakery boards built for family and friends.',
  bakery: 'Daily baked rolls, scones, sweet treats, and warm deli loaves.',
  cakes: 'Made-to-order celebration and birthday cakes crafted to your brief.',
};

const positiveSafeCentsSchema = z
  .number()
  .int('Amount in cents must be an integer')
  .positive('Amount in cents must be greater than zero')
  .refine((val) => Number.isSafeInteger(val), 'Amount must be a safe integer');

export const menuItemPricingSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('fixed'),
    amountCents: positiveSafeCentsSchema,
    currency: z.literal('ZAR'),
  }),
  z.object({
    type: z.literal('from'),
    amountCents: positiveSafeCentsSchema,
    currency: z.literal('ZAR'),
  }),
  z.object({
    type: z.literal('quote'),
    amountCents: z.null(),
    currency: z.literal('ZAR'),
  }),
]);

export type MenuItemPricing = z.infer<typeof menuItemPricingSchema>;

export const menuItemImageSchema = z.object({
  url: z.string().min(1).nullable(),
  storagePath: z.string().min(1).nullable(),
  alt: z.string().min(1, 'Image alt text is required for accessibility'),
});

export type MenuItemImage = z.infer<typeof menuItemImageSchema>;

export const menuItemSpecialSchema = z
  .object({
    enabled: z.boolean(),
    startsAt: z.string().datetime().nullable(),
    endsAt: z.string().datetime().nullable(),
  })
  .refine(
    (special) => {
      if (special.startsAt && special.endsAt) {
        return (
          new Date(special.endsAt).getTime() >
          new Date(special.startsAt).getTime()
        );
      }
      return true;
    },
    {
      message: 'Special endsAt must be after startsAt',
      path: ['endsAt'],
    },
  );

export type MenuItemSpecial = z.infer<typeof menuItemSpecialSchema>;

export const menuItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, 'Name is required').max(120),
  description: z.string().min(1, 'Description is required').max(600),
  category: menuCategorySchema,
  image: menuItemImageSchema,
  pricing: menuItemPricingSchema,
  published: z.boolean(),
  soldOut: z.boolean(),
  featured: z.boolean(),
  sortOrder: z.number().int(),
  special: menuItemSpecialSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type MenuItem = z.infer<typeof menuItemSchema>;

const zarFormatter = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Formats a MenuItemPricing discriminated union into a clear South African Rand string.
 * Never outputs R 0.00 for quote-based items.
 */
export function formatMenuPrice(pricing: MenuItemPricing): string {
  const parsed = menuItemPricingSchema.parse(pricing);
  switch (parsed.type) {
    case 'fixed':
      return zarFormatter.format(parsed.amountCents / 100);
    case 'from':
      return `From ${zarFormatter.format(parsed.amountCents / 100)}`;
    case 'quote':
      return 'Custom Quote';
  }
}

/**
 * Determines whether a menu item's special offer is currently active.
 * Expired offers stop appearing as active specials automatically.
 */
export function isSpecialActive(
  item: Pick<MenuItem, 'published' | 'special'>,
  now: Date = new Date(),
): boolean {
  if (!item.published || !item.special.enabled) {
    return false;
  }

  const nowMs = now.getTime();

  if (item.special.startsAt) {
    const startMs = new Date(item.special.startsAt).getTime();
    if (Number.isNaN(startMs) || nowMs < startMs) {
      return false;
    }
  }

  if (item.special.endsAt) {
    const endMs = new Date(item.special.endsAt).getTime();
    if (Number.isNaN(endMs) || nowMs >= endMs) {
      return false;
    }
  }

  return true;
}

/**
 * Sorts menu items consistently by sortOrder ascending, then name ascending.
 */
export function sortMenuItems(items: readonly MenuItem[]): MenuItem[] {
  return [...items].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) {
      return a.sortOrder - b.sortOrder;
    }
    return a.name.localeCompare(b.name, 'en-ZA');
  });
}
