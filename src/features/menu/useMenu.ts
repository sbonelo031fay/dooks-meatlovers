import { useCallback, useEffect, useState } from 'react';
import { menuRepository } from '../../repositories/menuRepository';
import type { MenuItem } from './types';

export function useMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [request, setRequest] = useState(0);
  const retry = useCallback(() => setRequest(x => x + 1), []);
  useEffect(() => {
    let active = true;
    setStatus('loading');
    menuRepository.getPublished().then(data => { if (active) { setItems(data); setStatus('ready'); } })
      .catch(() => { if (active) setStatus('error'); });
    return () => { active = false; };
  }, [request]);
  return { items, status, retry };
}
