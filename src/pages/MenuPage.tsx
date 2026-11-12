import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBusinessSettings } from '../features/business/useBusinessSettings';
import { CategoryFilter } from '../features/menu/CategoryFilter';
import { MenuCard } from '../features/menu/MenuCard';
import {
  MENU_CATEGORY_DESCRIPTIONS,
  MENU_CATEGORY_LABELS,
  MenuCategory,
  menuCategorySchema,
} from '../features/menu/types';
import { usePublicMenu } from '../features/menu/usePublicMenu';

export function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { settings } = useBusinessSettings();
  const { items, isLoading, error, filterByCategory, reload } = usePublicMenu();

  const rawCategory = searchParams.get('category');
  const parsedCategory = menuCategorySchema.safeParse(rawCategory);
  const selectedCategory: MenuCategory | 'all' = parsedCategory.success
    ? parsedCategory.data
    : 'all';

  const handleSelectCategory = (category: MenuCategory | 'all') => {
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const countsByCategory = useMemo(() => {
    const counts: Record<MenuCategory | 'all', number> = {
      all: items.length,
      bbq: 0,
      kotas: 0,
      platters: 0,
      bakery: 0,
      cakes: 0,
    };

    for (const item of items) {
      counts[item.category] += 1;
    }

    return counts;
  }, [items]);

  const filteredItems = filterByCategory(selectedCategory);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="border-b border-stone-800 pb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
          Smokehouse &amp; Bakery Offerings
        </p>
        <h1 className="mt-1 font-display text-3xl sm:text-5xl font-bold uppercase tracking-wide text-orange-50">
          Full Menu
        </h1>
        <p className="mt-2 max-w-2xl text-sm sm:text-base text-stone-300">
          {selectedCategory === 'all'
            ? 'Browse all wood-smoked BBQ cuts, loaded township kotas, family sharing platters, fresh daily bakes, and custom celebration cakes.'
            : MENU_CATEGORY_DESCRIPTIONS[selectedCategory]}
        </p>

        <div className="mt-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            countsByCategory={countsByCategory}
          />
        </div>
      </div>

      {/* Menu Content States: Loading, Error, Empty, Populated */}
      {isLoading ? (
        <div
          role="status"
          className="mt-10 rounded-xl border border-stone-800 bg-stone-900 p-12 text-center"
        >
          <p className="font-display text-xl uppercase tracking-wide text-orange-100">
            Loading Menu Items...
          </p>
          <p className="mt-2 text-sm text-stone-400">
            Fetching our latest smokehouse and bakery offerings.
          </p>
        </div>
      ) : error ? (
        <div
          role="alert"
          className="mt-10 rounded-xl border border-red-800 bg-red-950/40 p-8 text-center"
        >
          <h2 className="font-display text-xl font-bold uppercase text-red-200">
            Could Not Load Menu
          </h2>
          <p className="mt-2 text-sm text-red-300">{error}</p>
          <button
            type="button"
            onClick={() => void reload()}
            className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-orange-700 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-orange-50 hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="mt-10 rounded-xl border border-stone-800 bg-stone-900 p-10 text-center">
          <h2 className="font-display text-2xl font-bold uppercase text-orange-100">
            No Items Found in{' '}
            {selectedCategory === 'all'
              ? 'Menu'
              : MENU_CATEGORY_LABELS[selectedCategory]}
          </h2>
          <p className="mt-2 text-sm text-stone-300">
            We don&apos;t have any published items in this category right now.
          </p>
          {selectedCategory !== 'all' && (
            <button
              type="button"
              onClick={() => handleSelectCategory('all')}
              className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-orange-700 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-orange-50 hover:bg-orange-600"
            >
              Show All Offerings
            </button>
          )}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              whatsappNumber={settings.whatsappNumber}
            />
          ))}
        </div>
      )}
    </div>
  );
}
