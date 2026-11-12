import { initializeApp, getApps } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore, type Firestore } from 'firebase/firestore';

let database: Firestore | undefined;
export function getDatabase(): Firestore {
  if (database) return database;
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };
  if (Object.values(config).some(value => !value || value.includes('YOUR_'))) throw new Error('Firebase configuration is incomplete. No live connection was made.');
  if (import.meta.env.VITE_USE_EMULATORS === 'true' && !import.meta.env.DEV) throw new Error('Emulators are development-only.');
  const app = getApps()[0] ?? initializeApp(config);
  database = getFirestore(app);
  if (import.meta.env.DEV && import.meta.env.VITE_USE_EMULATORS === 'true') connectFirestoreEmulator(database, '127.0.0.1', 8080);
  return database;
}
