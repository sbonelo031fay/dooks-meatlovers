import type { Category, MenuItem, Pricing } from '../features/menu/types';

// Historical poster prices are guide prices, never represented as a live offer.
// Example descriptions and stock status are clearly labelled in the interface.
function item(id: string, name: string, category: Category, description: string, amount: number | null, imageName: string, options: Partial<MenuItem> = {}): MenuItem {
  const pricing: Pricing = amount === null ? { type: 'quote', amountCents: null, currency: 'ZAR' } : { type: 'fixed', amountCents: amount * 100, currency: 'ZAR' };
  const baseUrl = (import.meta.env?.BASE_URL ?? '/').replace(/\/$/, '');
  return { id, name, category, description, pricing,
    image: { url: `${baseUrl}/images/${imageName}.webp`, storagePath: null, alt: name },
    published: true, soldOut: false, featured: false, sortOrder: 0,
    special: { enabled: false, startsAt: null, endsAt: null }, ...options };
}

export const menuSeed: MenuItem[] = [
  item('brisket-burger', 'Smoked brisket burger', 'bbq', 'Wood-smoked brisket in a soft bun, served with Greek potato salad. A little smoke, a lot of soul.', 100, 'burger', { featured: true, sortOrder: 1 }),
  item('brisket-mac', 'Brisket mac & cheese', 'bbq', 'A generous bowl of creamy mac & cheese, topped with smoky pulled brisket.', 90, 'mac', { featured: true, sortOrder: 2 }),
  item('loaded-kota', 'The fully loaded kota', 'kotas', 'Big street-food energy. Our fully loaded kota, made for a proper appetite. Confirm fillings when enquiring.', 60, 'kota', { featured: true, sortOrder: 3 }),
  item('platter-one', 'The sharing platter', 'platters', 'Platter 1: two burgers, a chicken wrap, three full wings and chips. Good food is better together.', 160, 'platter', { featured: true, sortOrder: 4 }),
  item('beef-kota', 'Beef patty kota', 'kotas', 'A local favourite with a beef patty. Ask us about the current fillings and sauces.', 40, 'beef-kota', { sortOrder: 5 }),
  item('russian-kota', 'Russian kota', 'kotas', 'Our Russian kota. Check the current fillings with the kitchen before ordering.', 30, 'russian-kota', { sortOrder: 6 }),
  item('brisket-salad', 'Brisket & potato salad', 'bbq', 'Smoked brisket served with Greek potato salad. Low and slow, with something fresh on the side.', 100, 'brisket', { sortOrder: 7 }),
  item('chocolate-slice', 'Chocolate cake slice', 'bakery', 'A little something sweet to finish. Ask which cakes are on the counter today.', 30, 'cake-slice', { soldOut: true, sortOrder: 8 }),
  item('custom-cake', 'A cake for your occasion', 'cakes', 'Birthdays, celebrations and just-because moments. Tell us your idea and we’ll help you shape it. Each cake is quoted individually.', null, 'cake', { sortOrder: 9 }),
];
