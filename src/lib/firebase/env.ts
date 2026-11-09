import { z } from 'zod';

const envSchema = z.object({
  VITE_FIREBASE_API_KEY: z.string().min(1, 'VITE_FIREBASE_API_KEY is required'),
  VITE_FIREBASE_AUTH_DOMAIN: z
    .string()
    .min(1, 'VITE_FIREBASE_AUTH_DOMAIN is required'),
  VITE_FIREBASE_PROJECT_ID: z
    .string()
    .min(1, 'VITE_FIREBASE_PROJECT_ID is required'),
  VITE_FIREBASE_STORAGE_BUCKET: z
    .string()
    .min(1, 'VITE_FIREBASE_STORAGE_BUCKET is required'),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z
    .string()
    .min(1, 'VITE_FIREBASE_MESSAGING_SENDER_ID is required'),
  VITE_FIREBASE_APP_ID: z.string().min(1, 'VITE_FIREBASE_APP_ID is required'),
  VITE_USE_EMULATORS: z
    .enum(['true', 'false'])
    .optional()
    .default('false')
    .transform((val) => val === 'true'),
  VITE_DEMO_MODE: z
    .enum(['true', 'false'])
    .optional()
    .default('true')
    .transform((val) => val === 'true'),
});

export type AppEnv = z.infer<typeof envSchema>;

/**
 * Validates client environment configuration.
 * When VITE_DEMO_MODE is true (or during unit tests without a live Firebase project),
 * safe demo placeholders are accepted so fresh clones can run in labelled fixture mode.
 */
export function parseAppEnv(rawEnv: Record<string, unknown>): AppEnv {
  const isDemo =
    rawEnv.VITE_DEMO_MODE === 'true' || rawEnv.VITE_DEMO_MODE === undefined;

  if (isDemo) {
    return envSchema.parse({
      VITE_FIREBASE_API_KEY: rawEnv.VITE_FIREBASE_API_KEY || 'demo-api-key',
      VITE_FIREBASE_AUTH_DOMAIN:
        rawEnv.VITE_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
      VITE_FIREBASE_PROJECT_ID:
        rawEnv.VITE_FIREBASE_PROJECT_ID || 'demo-dooks-meatlovers',
      VITE_FIREBASE_STORAGE_BUCKET:
        rawEnv.VITE_FIREBASE_STORAGE_BUCKET || 'demo.firebasestorage.app',
      VITE_FIREBASE_MESSAGING_SENDER_ID:
        rawEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
      VITE_FIREBASE_APP_ID:
        rawEnv.VITE_FIREBASE_APP_ID || '1:000000000000:web:demo',
      VITE_USE_EMULATORS: rawEnv.VITE_USE_EMULATORS ?? 'false',
      VITE_DEMO_MODE: 'true',
    });
  }

  return envSchema.parse(rawEnv);
}
