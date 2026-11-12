import { menuSeed } from '../data/menu.seed';
import { validateItem } from '../features/menu/menu';
import type { MenuRepository } from '../features/menu/types';

export const isDemoMode = (import.meta.env.VITE_DATA_SOURCE ?? 'demo') === 'demo';
export const menuRepository: MenuRepository = {
  async getPublished() {
    if (isDemoMode) return menuSeed.filter(x => x.published).map(validateItem);
    if (import.meta.env.VITE_DATA_SOURCE !== 'firebase') throw new Error('Unknown data source. Check the application configuration.');
    // Firebase is lazy-loaded so demo browsing never contacts a cloud database.
    const { getFirebaseMenu } = await import('./firebaseMenuRepository');
    return getFirebaseMenu();
  },
};
