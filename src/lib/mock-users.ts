import { Collection } from './match';
import { TOTAL_STICKERS } from './stickers';

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildCollection(seed: number, ownership = 0.55, dupeChance = 0.35): Collection {
  const rng = mulberry32(seed);
  const col: Collection = {};
  for (let i = 1; i <= TOTAL_STICKERS; i++) {
    if (rng() < ownership) {
      let count = 1;
      while (rng() < dupeChance && count < 5) count++;
      col[i] = count;
    } else {
      col[i] = 0;
    }
  }
  return col;
}

export type MockUser = {
  id: string;
  name: string;
  avatar: string;
  color: string;
  collection: Collection;
};

export const MOCK_USERS: MockUser[] = [
  { id: 'diego',  name: 'Diego',  avatar: 'D', color: '#10B981', collection: buildCollection(202, 0.58, 0.42) },
  { id: 'lucas',  name: 'Lucas',  avatar: 'L', color: '#F59E0B', collection: buildCollection(303, 0.45, 0.30) },
  { id: 'sofia',  name: 'Sofía',  avatar: 'S', color: '#EC4899', collection: buildCollection(404, 0.70, 0.45) },
  { id: 'fer',    name: 'Fer',    avatar: 'F', color: '#8B5CF6', collection: buildCollection(505, 0.50, 0.32) },
];
