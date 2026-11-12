import {
  MENU_CATEGORY_LABELS,
  MenuCategory,
} from './types';

interface CategoryFilterProps {
  selectedCategory: MenuCategory | 'all';
  onSelectCategory: (category: MenuCategory | 'all') => void;
  countsByCategory: Record<MenuCategory | 'all', number>;
}

const CATEGORIES: ReadonlyArray<MenuCategory | 'all'> = [
  'all',
  'bbq',
  'kotas',
  'platters',
  'bakery',
  'cakes',
];

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  countsByCategory,
}: CategoryFilterProps) {
  return (
    <nav
      aria-label="Menu categories"
      className="flex flex-wrap items-center gap-2 py-2"
    >
      {CATEGORIES.map((category) => {
        const isSelected = selectedCategory === category;
        const label =
          category === 'all' ? 'All Offerings' : MENU_CATEGORY_LABELS[category];
        const count = countsByCategory[category] ?? 0;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            aria-pressed={isSelected}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-stone-950 ${
              isSelected
                ? 'bg-orange-700 text-orange-50 shadow'
                : 'border border-stone-800 bg-stone-900 text-stone-200 hover:border-stone-700 hover:bg-stone-800'
            }`}
          >
            <span>{label}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                isSelected
                  ? 'bg-stone-950/40 text-orange-50'
                  : 'bg-stone-800 text-stone-300'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
