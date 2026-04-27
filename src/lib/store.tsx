'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Collection } from './match';

type CollectionCtx = {
  collection: Collection;
  inc: (n: number) => void;
  dec: (n: number) => void;
  hydrated: boolean;
  userId: string;
  groupId: string;
};

const Ctx = createContext<CollectionCtx | null>(null);

export function CollectionProvider({
  children,
  userId,
  groupId,
}: {
  children: React.ReactNode;
  userId: string;
  groupId: string;
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

  return (
    <Ctx.Provider value={{ collection, inc, dec, hydrated, userId, groupId }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCollection() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCollection must be used inside CollectionProvider');
  return ctx;
}
