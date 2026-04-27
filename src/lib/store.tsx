'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Collection } from './match';

const STORAGE_KEY = 'album:collection';

type CollectionCtx = {
  collection: Collection;
  inc: (n: number) => void;
  dec: (n: number) => void;
  hydrated: boolean;
};

const Ctx = createContext<CollectionCtx | null>(null);

export function CollectionProvider({ children }: { children: React.ReactNode }) {
  const [collection, setCollection] = useState<Collection>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCollection(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
  }, [collection, hydrated]);

  const inc = useCallback((n: number) => {
    setCollection((prev) => ({ ...prev, [n]: Math.min((prev[n] ?? 0) + 1, 9) }));
  }, []);

  const dec = useCallback((n: number) => {
    setCollection((prev) => ({ ...prev, [n]: Math.max((prev[n] ?? 0) - 1, 0) }));
  }, []);

  return <Ctx.Provider value={{ collection, inc, dec, hydrated }}>{children}</Ctx.Provider>;
}

export function useCollection() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCollection must be used inside CollectionProvider');
  return ctx;
}
