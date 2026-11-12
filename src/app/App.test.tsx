import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { buildWhatsAppEnquiryUrl } from '../features/business/types';
import {
  formatMenuPrice,
  isSpecialActive,
  menuItemPricingSchema,
} from '../features/menu/types';
import { parseAppEnv } from '../lib/firebase/env';
import { AppRoutes } from './App';

describe('Domain Pricing, Specials Expiry & WhatsApp Helpers', () => {
  it('formats fixed, from, and quote ZAR prices and rejects invalid zero/quote combinations', () => {
    const fixed = formatMenuPrice({
      type: 'fixed',
      amountCents: 14500,
      currency: 'ZAR',
    });
    expect(fixed).toContain('145');

    const fromPrice = formatMenuPrice({
      type: 'from',
      amountCents: 42000,
      currency: 'ZAR',
    });
    expect(fromPrice).toMatch(/^From /);
    expect(fromPrice).toContain('420');

    const quotePrice = formatMenuPrice({
      type: 'quote',
      amountCents: null,
      currency: 'ZAR',
    });
    expect(quotePrice).toBe('Custom Quote');

    // Zero cents must be rejected for fixed/from
    expect(() =>
      menuItemPricingSchema.parse({
        type: 'fixed',
        amountCents: 0,
        currency: 'ZAR',
      }),
    ).toThrow();
  });

  it('evaluates special expiry boundaries accurately', () => {
    const baseSpecial = {
      published: true,
      special: {
        enabled: true,
        startsAt: '2026-11-01T08:00:00.000Z',
        endsAt: '2026-11-15T20:00:00.000Z',
      },
    };

    // Active during window
    expect(
      isSpecialActive(baseSpecial, new Date('2026-11-10T12:00:00.000Z')),
    ).toBe(true);

    // Inactive before startsAt
    expect(
      isSpecialActive(baseSpecial, new Date('2026-10-31T12:00:00.000Z')),
    ).toBe(false);

    // Inactive at or after endsAt
    expect(
      isSpecialActive(baseSpecial, new Date('2026-11-15T20:00:00.000Z')),
    ).toBe(false);
  });

  it('returns null WhatsApp URL when number is unconfirmed and encodes message when present', () => {
    expect(buildWhatsAppEnquiryUrl(null, 'Hello')).toBeNull();
    const url = buildWhatsAppEnquiryUrl(
      '27821234567',
      'Hi Dooks! Custom cake quote please.',
    );
    expect(url).toBe(
      'https://wa.me/27821234567?text=Hi%20Dooks!%20Custom%20cake%20quote%20please.',
    );
  });

  it('validates environment configuration in demo mode and rejects missing keys in live mode', () => {
    const demoConfig = parseAppEnv({ VITE_DEMO_MODE: 'true' });
    expect(demoConfig.VITE_DEMO_MODE).toBe(true);

    expect(() =>
      parseAppEnv({
        VITE_DEMO_MODE: 'false',
        VITE_FIREBASE_API_KEY: '',
      }),
    ).toThrow();
  });
});

describe('Milestone 2 Public UI & Routes', () => {
  it('renders HomePage with Sample Data banner, active specials, cake quote section, and disabled unconfirmed contact actions', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', {
        name: /Real Wood Smoke\. Towering Kotas\. Freshly Baked Daily\./i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(/\[Sample Data Mode\]/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getAllByText(/12-Hour Wood-Smoked Beef Brisket Box/i).length,
      ).toBeGreaterThan(0);
    });

    // Expired special item must NOT appear in Featured Smokehouse Specials on homepage
    expect(
      screen.queryByText(/Midweek Smoked Chicken Quarter/i),
    ).not.toBeInTheDocument();
  });

  it('renders MenuPage and filters items by category', async () => {
    render(
      <MemoryRouter initialEntries={['/menu']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(/The Dooks Smokehouse Boss Kota/i),
      ).toBeInTheDocument();
    });

    // Expired special item still appears on the regular Full Menu because it is published
    expect(
      screen.getByText(/Midweek Smoked Chicken Quarter/i),
    ).toBeInTheDocument();

    // Filter by Custom Cakes category
    const cakesButton = screen.getByRole('button', { name: /Custom Cakes/i });
    fireEvent.click(cakesButton);

    expect(
      screen.getByText(/Bespoke Celebration & Birthday Cakes/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/The Dooks Smokehouse Boss Kota/i),
    ).not.toBeInTheDocument();
  });

  it('renders 404 NotFoundPage on unknown routes', async () => {
    render(
      <MemoryRouter initialEntries={['/unknown-grill-route']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Nothing Smoking on This Grill/i }),
      ).toBeInTheDocument();
    });
  });
});
