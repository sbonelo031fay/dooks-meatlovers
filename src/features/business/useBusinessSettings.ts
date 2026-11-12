import { useEffect, useState } from 'react';
import { BusinessSettings } from './types';
import { SAMPLE_BUSINESS_SETTINGS } from './sampleBusiness';
import { getBusinessSettings } from '../../repositories/businessRepository';

export interface UseBusinessSettingsState {
  settings: BusinessSettings;
  isLoading: boolean;
  error: string | null;
}

export function useBusinessSettings(): UseBusinessSettingsState {
  const [settings, setSettings] = useState<BusinessSettings>(
    SAMPLE_BUSINESS_SETTINGS,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getBusinessSettings()
      .then((data) => {
        if (active) {
          setSettings(data);
        }
      })
      .catch((err) => {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load business details.',
          );
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return { settings, isLoading, error };
}
