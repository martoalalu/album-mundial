'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Collection } from './match';

type CollectionCtx = {
  collection: Collection;
  inc: (n: number) => void;
  dec: (n: number) => void;
  setMany: (entries: { n: number; count: number }[]) => void;
  hydrated: boolean;
  userId: string;
  groupId: string;
  displayName: string;
  isGuest: boolean;
};

const Ctx = createContext<CollectionCtx | null>(null);

export function CollectionProvider({
  children,
  userId,
  groupId,
  displayName,
}: {
  children: React.ReactNode;
  userId: string;
  groupId: string;
  displayName: string;
}) {
  const [collection, setCollection] = useState<Collection>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('collections')
      .select('sticker_n, count')
      .eq('user_id', userId)
      .then(({ data }) => {
        if (data) {
          const col: Collection = {};
          for (const row of data) col[row.sticker_n] = row.count;
          setCollection(col);
        }
        setHydrated(true);
      });
  }, [userId]);

  const inc = useCallback((n: number) => {
    setCollection((prev) => {
      const newCount = Math.min((prev[n] ?? 0) + 1, 9);
      const supabase = createClient();
      supabase.from('collections').upsert({
        user_id: userId, sticker_n: n, count: newCount, updated_at: new Date().toISOString(),
      });
      return { ...prev, [n]: newCount };
    });
  }, [userId]);

  const dec = useCallback((n: number) => {
    setCollection((prev) => {
      const newCount = Math.max((prev[n] ?? 0) - 1, 0);
      const supabase = createClient();
      supabase.from('collections').upsert({
        user_id: userId, sticker_n: n, count: newCount, updated_at: new Date().toISOString(),
      });
      return { ...prev, [n]: newCount };
    });
  }, [userId]);

  const setMany = useCallback((entries: { n: number; count: number }[]) => {
    setCollection((prev) => {
      const next = { ...prev };
      for (const { n, count } of entries) next[n] = count;
      const supabase = createClient();
      const now = new Date().toISOString();
      supabase.from('collections').upsert(
        entries.map(({ n, count }) => ({ user_id: userId, sticker_n: n, count, updated_at: now }))
      );
      return next;
    });
  }, [userId]);

  return (
    <Ctx.Provider value={{ collection, inc, dec, setMany, hydrated, userId, groupId, displayName, isGuest: false }}>
      {children}
    </Ctx.Provider>
  );
}

// ─── Guest provider (localStorage) ───────────────────────────────────────────
const GUEST_KEY = 'album_guest_collection';

export function GuestCollectionProvider({ children, displayName }: { children: React.ReactNode; displayName: string }) {
  const [collection, setCollection] = useState<Collection>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(GUEST_KEY);
      if (saved) setCollection(JSON.parse(saved));
    } catch {}
    setHydrated(true);
  }, []);

  function persist(col: Collection) {
    try { localStorage.setItem(GUEST_KEY, JSON.stringify(col)); } catch {}
  }

  const inc = useCallback((n: number) => {
    setCollection((prev) => {
      const next = { ...prev, [n]: Math.min((prev[n] ?? 0) + 1, 9) };
      persist(next);
      return next;
    });
  }, []);

  const dec = useCallback((n: number) => {
    setCollection((prev) => {
      const next = { ...prev, [n]: Math.max((prev[n] ?? 0) - 1, 0) };
      persist(next);
      return next;
    });
  }, []);

  const setMany = useCallback((entries: { n: number; count: number }[]) => {
    setCollection((prev) => {
      const next = { ...prev };
      for (const { n, count } of entries) next[n] = count;
      persist(next);
      return next;
    });
  }, []);

  return (
    <Ctx.Provider value={{ collection, inc, dec, setMany, hydrated, userId: 'guest', groupId: '', displayName, isGuest: true }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCollection() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCollection must be used inside CollectionProvider');
  return ctx;
}
