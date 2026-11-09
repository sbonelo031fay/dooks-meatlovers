import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { parseAppEnv } from '../lib/firebase/env';

describe('Milestone 1 Portable Foundation', () => {
  it('renders the brand heading and foundation notice', () => {
    render(<App />);
    expect(screen.getByText('Dooks Meatlovers')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /Smoked Brisket, Loaded Kotas, Sharing Platters & Custom Cakes/i,
      }),
    ).toBeInTheDocument();
  });

  it('validates environment configuration in demo mode and rejects missing keys in live mode', () => {
    const demoConfig = parseAppEnv({ VITE_DEMO_MODE: 'true' });
    expect(demoConfig.VITE_DEMO_MODE).toBe(true);
    expect(demoConfig.VITE_FIREBASE_PROJECT_ID).toBe('demo-dooks-meatlovers');

    expect(() =>
      parseAppEnv({
        VITE_DEMO_MODE: 'false',
        VITE_FIREBASE_API_KEY: '',
      }),
    ).toThrow();
  });
});
