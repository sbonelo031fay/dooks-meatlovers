import { useEffect, useState } from 'react';
import {
  isSpecialActive,
  MenuCategory,
  MenuItem,
  sortMenuItems,
} from './types';
import { getPublishedMenuItems } from '../../repositories/menuRepository';

export interface UsePublicMenuState {
  items: MenuItem[];
  activeSpecials: MenuItem[];
  featuredItems: MenuItem[];
  isSampleData: boolean;
  isLoading: boolean;
  error: string | null;
  filterByCategory: (category: MenuCategory | 'all') => MenuItem[];
  reload: () => Promise<void>;
}

export function usePublicMenu(now: Date = new Date()): UsePublicMenuState {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isSampleData, setIsSampleData] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadMenu = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getPublishedMenuItems();
      setItems(result.items);
      setIsSampleData(result.isSampleData);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to load the menu right now. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadMenu();
  }, []);

  const activeSpecials = sortMenuItems(
    items.filter((item) => isSpecialActive(item, now)),
  );

  const featuredItems = sortMenuItems(items.filter((item) => item.featured));

  const filterByCategory = (category: MenuCategory | 'all'): MenuItem[] => {
    if (category === 'all') {
      return items;
    }
    return items.filter((item) => item.category === category);
  };

  return {
    items,
    activeSpecials,
    featuredItems,
    isSampleData,
    isLoading,
    error,
    filterByCategory,
    reload: loadMenu,
  };
}
