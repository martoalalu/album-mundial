import { STICKERS, TOTAL_STICKERS } from './stickers';

export type Collection = Record<number, number>; // stickerN → count

export type Stats = {
  pegadas: number;     // count >= 1
  faltan: number;      // count = 0
  sobran: number;      // distinct stickers with count >= 2
  totalSobras: number; // total extra copies
  total: number;       // = TOTAL_STICKERS
};

export type MatchResult = {
  iGive: { n: number; label: string }[];
  iGet: { n: number; label: string }[];
  swaps: number;
};

export type FilterType = 'all' | 'have' | 'missing' | 'dupes';

export function computeStats(collection: Collection): Stats {
  let pegadas = 0;
  let faltan = 0;
  let sobran = 0;
  let totalSobras = 0;

  for (let n = 1; n <= TOTAL_STICKERS; n++) {
    const count = collection[n] ?? 0;
    if (count === 0) {
      faltan++;
    } else {
      pegadas++;
      if (count >= 2) {
        sobran++;
        totalSobras += count - 1;
      }
    }
  }

  return { pegadas, faltan, sobran, totalSobras, total: TOTAL_STICKERS };
}

export function computeMatch(
  myCollection: Collection,
  theirCollection: Collection
): MatchResult {
  const iGive: MatchResult['iGive'] = [];
  const iGet: MatchResult['iGet'] = [];

  for (const s of STICKERS) {
    const mine = myCollection[s.n] ?? 0;
    const theirs = theirCollection[s.n] ?? 0;
    if (mine >= 2 && theirs === 0) iGive.push({ n: s.n, label: s.label });
    if (theirs >= 2 && mine === 0) iGet.push({ n: s.n, label: s.label });
  }

  return { iGive, iGet, swaps: Math.min(iGive.length, iGet.length) };
}
