import { SAMPLE_MENU_ITEMS } from '../features/menu/sampleMenu';
import {
  MenuItem,
  menuItemSchema,
  sortMenuItems,
} from '../features/menu/types';

export interface MenuRepositoryResult {
  items: MenuItem[];
  isSampleData: boolean;
}

/**
 * Fetches published menu items for public views.
 * In Milestone 2 (or when VITE_DEMO_MODE is enabled), validates and returns
 * the labelled sample fixture dataset.
 */
export async function getPublishedMenuItems(): Promise<MenuRepositoryResult> {
  const validated = SAMPLE_MENU_ITEMS.map((item) => menuItemSchema.parse(item));
  const publishedOnly = validated.filter((item) => item.published);
  return {
    items: sortMenuItems(publishedOnly),
    isSampleData: true,
  };
}
