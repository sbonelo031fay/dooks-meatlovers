import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { getDatabase } from '../lib/firebase/client';
import { validateItem } from '../features/menu/menu';

export async function getFirebaseMenu() {
  const snapshot = await getDocs(query(collection(getDatabase(), 'menuItems'), where('published', '==', true), orderBy('sortOrder')));
  return snapshot.docs.map(doc => {
    const data = doc.data();
    const toISO = (v: unknown) => v && typeof v === 'object' && 'toDate' in v ? (v as { toDate(): Date }).toDate().toISOString() : v;
    return validateItem({ ...data, id: doc.id, special: { ...data.special, startsAt: toISO(data.special?.startsAt), endsAt: toISO(data.special?.endsAt) } });
  });
}
