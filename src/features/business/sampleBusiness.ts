import { BusinessSettings } from './types';

/**
 * Honest sample business configuration following docs/content-checklist.md.
 * Unconfirmed contact numbers, addresses, and hours are kept null so the UI
 * disables incomplete contact actions rather than linking to made-up destinations.
 */
export const SAMPLE_BUSINESS_SETTINGS: BusinessSettings = {
  displayName: 'Dooks Meatlovers',
  tagline:
    'Family-run South African smokehouse BBQ deli & bakery — wood-smoked brisket, loaded kotas, sharing platters, and custom celebration cakes.',
  whatsappNumber: null,
  telephone: null,
  address: null,
  mapUrl: null,
  instagramHandle: '@dooks_meatlover',
  instagramUrl: 'https://www.instagram.com/dooks_meatlover/',
  openingHours: null,
  timezone: 'Africa/Johannesburg',
  isSampleData: true,
  updatedAt: '2026-11-02T12:00:00.000Z',
};
