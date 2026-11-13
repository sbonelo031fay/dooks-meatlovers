import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { MenuCard } from '../components/MenuCard';
import { menuSeed } from '../data/menu.seed';
import { getDatabase } from '../lib/firebase/client';
import { isDemoMode, menuRepository } from '../repositories/menuRepository';

describe('application routes and UI components', () => {
  it('renders the homepage with hero, preview notice, and navigation links', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(html).toContain('LOW. SLOW.');
    expect(html).toContain('ALL SOUL.');
    expect(html).toContain('PRIVATE PREVIEW');
    expect(html).toContain('WHAT ARE YOU');
    expect(html).toContain('YOUR OCCASION.');
  });

  it('renders the standalone menu route with breadcrumb and category filters', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={['/menu']}>
        <App />
      </MemoryRouter>,
    );

    expect(html).toContain('/ Our menu');
    expect(html).toContain('Everything');
    expect(html).toContain('From the smoker');
    expect(html).toContain('Custom cakes');
  });

  it('renders the 404 fallback on unknown routes', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={['/does-not-exist']}>
        <App />
      </MemoryRouter>,
    );

    expect(html).toContain('Nothing cooking here.');
    expect(html).toContain('Back to the menu');
  });

  it('renders MenuCard with sold-out disabled button and quote label', () => {
    const soldOutItem = menuSeed.find((item) => item.soldOut)!;
    const soldOutHtml = renderToStaticMarkup(
      <MenuCard
        item={soldOutItem}
        saved={false}
        added={false}
        onSave={() => {}}
        onOpen={() => {}}
        onAdd={() => {}}
      />,
    );
    expect(soldOutHtml).toContain('Sold out');
    expect(soldOutHtml).toContain('disabled=""');

    const quoteItem = menuSeed.find((item) => item.pricing.type === 'quote')!;
    const quoteHtml = renderToStaticMarkup(
      <MenuCard
        item={quoteItem}
        saved={true}
        added={true}
        onSave={() => {}}
        onOpen={() => {}}
        onAdd={() => {}}
      />,
    );
    expect(quoteHtml).toContain('Individually quoted');
    expect(quoteHtml).toContain('Let’s talk cake');
  });

  it('renders children inside ErrorBoundary when no error occurs', () => {
    const html = renderToStaticMarkup(
      <ErrorBoundary>
        <div>Healthy kitchen</div>
      </ErrorBoundary>,
    );
    expect(html).toContain('Healthy kitchen');
  });
});

describe('repository and firebase configuration boundaries', () => {
  it('defaults to demo mode and returns validated published items', async () => {
    expect(isDemoMode).toBe(true);
    const items = await menuRepository.getPublished();
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((item) => item.published)).toBe(true);
  });

  it('throws a clear error if getDatabase is called without complete Firebase config', () => {
    expect(() => getDatabase()).toThrow(/Firebase configuration is incomplete/i);
  });
});
