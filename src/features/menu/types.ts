export const categories = [
  { id: 'all', label: 'Everything' },
  { id: 'bbq', label: 'From the smoker' },
  { id: 'kotas', label: 'Loaded kotas' },
  { id: 'platters', label: 'Sharing platters' },
  { id: 'bakery', label: 'Bakery' },
  { id: 'cakes', label: 'Custom cakes' },
] as const;

export type Category = Exclude<(typeof categories)[number]['id'], 'all'>;
export type Pricing =
  | { type: 'fixed' | 'from'; amountCents: number; currency: 'ZAR' }
  | { type: 'quote'; amountCents: null; currency: 'ZAR' };
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: Category;
  image: { url: string; storagePath: string | null; alt: string };
  pricing: Pricing;
  published: boolean;
  soldOut: boolean;
  featured: boolean;
  sortOrder: number;
  special: { enabled: boolean; startsAt: string | null; endsAt: string | null };
}
export interface EnquiryLine { id: string; quantity: number }
export interface MenuRepository { getPublished(): Promise<MenuItem[]> }
