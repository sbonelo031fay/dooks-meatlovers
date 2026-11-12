import { z } from 'zod';

const timeStringSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Time must be in HH:mm format');

export const dailyHoursSchema = z.object({
  closed: z.boolean(),
  opens: timeStringSchema.nullable(),
  closes: timeStringSchema.nullable(),
});

export type DailyHours = z.infer<typeof dailyHoursSchema>;

export const openingHoursSchema = z.object({
  mon: dailyHoursSchema,
  tue: dailyHoursSchema,
  wed: dailyHoursSchema,
  thu: dailyHoursSchema,
  fri: dailyHoursSchema,
  sat: dailyHoursSchema,
  sun: dailyHoursSchema,
});

export type OpeningHours = z.infer<typeof openingHoursSchema>;

export const DAY_ORDER: ReadonlyArray<{
  key: keyof OpeningHours;
  label: string;
}> = [
  { key: 'mon', label: 'Monday' },
  { key: 'tue', label: 'Tuesday' },
  { key: 'wed', label: 'Wednesday' },
  { key: 'thu', label: 'Thursday' },
  { key: 'fri', label: 'Friday' },
  { key: 'sat', label: 'Saturday' },
  { key: 'sun', label: 'Sunday' },
];

export const businessSettingsSchema = z.object({
  displayName: z.string().min(1).max(100),
  tagline: z.string().min(1).max(240),
  whatsappNumber: z
    .string()
    .regex(/^\d{10,15}$/, 'WhatsApp number must contain digits with country code')
    .nullable(),
  telephone: z.string().min(7).max(25).nullable(),
  address: z.string().min(1).max(240).nullable(),
  mapUrl: z.string().url().nullable(),
  instagramHandle: z.string().min(1).max(60).nullable(),
  instagramUrl: z.string().url().nullable(),
  openingHours: openingHoursSchema.nullable(),
  timezone: z.literal('Africa/Johannesburg'),
  isSampleData: z.boolean().default(false),
  updatedAt: z.string().datetime(),
});

export type BusinessSettings = z.infer<typeof businessSettingsSchema>;

/**
 * Builds a safe WhatsApp enquiry link when a verified WhatsApp number is configured.
 * Returns null if the number is unconfirmed/missing so buttons can be disabled cleanly.
 */
export function buildWhatsAppEnquiryUrl(
  whatsappNumber: string | null,
  message: string,
): string | null {
  if (!whatsappNumber || !/^\d{10,15}$/.test(whatsappNumber)) {
    return null;
  }
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${whatsappNumber}?text=${encoded}`;
}
