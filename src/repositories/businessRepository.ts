import { SAMPLE_BUSINESS_SETTINGS } from '../features/business/sampleBusiness';
import {
  BusinessSettings,
  businessSettingsSchema,
} from '../features/business/types';

/**
 * Retrieves public business settings.
 * Validates against businessSettingsSchema at runtime.
 */
export async function getBusinessSettings(): Promise<BusinessSettings> {
  return businessSettingsSchema.parse(SAMPLE_BUSINESS_SETTINGS);
}
