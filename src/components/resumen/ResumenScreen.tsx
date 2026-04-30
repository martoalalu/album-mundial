'use client';

import { useMemo, useState } from 'react';
import { useCollection } from '@/lib/store';
import { computeStats } from '@/lib/match';
import { SECTIONS, STICKERS } from '@/lib/stickers';
import { T } from '@/lib/tokens';

const CONFEDERATIONS = [
  { id: 'CONMEBOL', label: 'CONMEBOL' },
  { id: 'UEFA',     label: 'UEFA' },
  { id: 'CAF',      label: 'CAF' },
  { id: 'AFC',      label: 'AFC' },
  { id: 'CONCACAF', label: 'CONCACAF' },
  { id: 'OFC',      label: 'OFC' },
];

export default function ResumenScreen() {
  const { collection } = useCollection();
  const [missingSearch, setMissingSearch] = useState('');

  const stats = useMemo(() => computeStats(collection), [collection]);

  const missing = useMemo(
    () => STICKERS.filter((s) => (collection[s.n] ?? 0) === 0),
    [collection]
  );

  const trades = useMemo(
    () => STICKERS.filter((s) => (collection[s.n] ?? 0) >= 2)
      .map((s) => ({ ...s, extra: (collection[s.n] ?? 0) - 1 })),
    [collection]
  );

  // Stats por confederación
  const confStats = useMemo(() => {
    return CONFEDERATIONS.map(({ id, label }) => {
      const sections = SECTIONS.filter((s) => s.confederation === id);
      const total = sections.reduce((a, s) => a + s.stickers.length, 0);
      const owned = sections.reduce((a, s) =>
        a + s.stickers.filter((st) => (collection[st.n] ?? 0) >= 1).length, 0);
      const pct = total > 0 ? Math.round((owned / total) * 100) : 0;
      return { id, label, total, owned, pct };
    });
  }, [collection]);

  // Me faltan filtrado por búsqueda
  const missingFiltered = useMemo(() => {
    const q = missingSearch.trim().toLowerCase();
    const grouped: Record<string, { name: string; flag: string; items: typeof STICKERS }> = {};
    for (const s of missing) {
      if (q && !s.sectionName.toLowerCase().includes(q) && !s.sectionId.toLowerCase().includes(q)) continue;
      if (!grouped[s.sectionId]) grouped[s.sectionId] = { name: s.sectionName, flag: s.sectionFlag, items: [] };
      grouped[s.sectionId].items.push(s);
    }
    return Object.entries(grouped);
  }, [missing, missingSearch]);

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <div style={{ background: T.bg, position: 'sticky', top: 0, zIndex: 30 }}>
        <div style={{ margin: '12px 16px', padding: '14px 16px', background: T.ink, color: T.paper, borderRadius: 14 }}>
          <div style={{ fontFamily: T.fontMono, fontSize: 9, letterSpacing: '1.6px', opacity: 0.6, marginBottom: 4 }}>
            ESTADO DEL ÁLBUM
          </div>
          <div style={{ fontFamily: T.font, fontSize: 30, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}>
            RESUMEN
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px 100px' }}>
        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 22 }}>
          {[
            { k: 'PEGADAS', v: stats.pegadas,    sub: `de ${stats.total}`,            color: T.ok },
            { k: 'FALTAN',  v: stats.faltan,     sub: `${Math.round(stats.faltan / stats.total * 100)}%`, color: T.accent },
            { k: 'SOBRAN',  v: stats.totalSobras, sub: `${stats.sobran} distintas`,   color: T.ink },
          ].map((card) => (
            <div key={card.k} style={{
              background: T.surface, border: `1.5px solid ${T.ink}`,
              borderRadius: 10, padding: '10px 12px', boxShadow: `2px 2px 0 ${card.color}`,
            }}>
              <div style={{ fontFamily: T.fontMono, fontSize: 9, letterSpacing: '1.2px', fontWeight: 700, color: card.color }}>{card.k}</div>
              <div style={{ fontFamily: T.font, fontSize: 28, fontWeight: 800, letterSpacing: -1, lineHeight: 1.05 }}>{card.v}</div>
              <div style={{ fontSize: 10, color: T.inkDim, marginTop: 2, fontFamily: T.fontMono, letterSpacing: '0.4px' }}>{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Por confederación */}
        <div style={{ marginBottom: 26 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
            <h3 style={{ fontFamily: T.font, fontSize: 22, fontWeight: 800, letterSpacing: '-0.6px' }}>POR CONFEDERACIÓN</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {confStats.map(({ id, label, total, owned, pct }) => (
              <div key={id} style={{
                background: T.surface, border: `1.5px solid ${T.ink}`,
                borderRadius: 10, padding: '10px 14px',
                boxShadow: `2px 2px 0 ${T.line}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ fontFamily: T.fontMono, fontSize: 11, fontWeight: 700, letterSpacing: '0.8px' }}>{label}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontFamily: T.fontMono, fontSize: 11, fontWeight: 700, color: T.inkDim }}>
                      {owned}/{total}
                    </div>
                    <div style={{
                      fontFamily: T.fontMono, fontSize: 11, fontWeight: 800,
                      color: pct === 100 ? T.ok : T.accent,
                      minWidth: 36, textAlign: 'right',
                    }}>{pct}%</div>
                  </div>
                </div>
                <div style={{ height: 6, background: T.bgDark, borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    width: `${pct}%`, height: '100%', borderRadius: 3,
                    background: pct === 100
                      ? T.ok
                      : `repeating-linear-gradient(45deg, ${T.accent} 0 5px, #E2570F 5px 10px)`,
                    transition: 'width .3s',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Me faltan */}
        <div style={{ marginBottom: 26 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
            <h3 style={{ fontFamily: T.font, fontSize: 22, fontWeight: 800, letterSpacing: '-0.6px' }}>ME FALTAN</h3>
            <span style={{ fontFamily: T.fontMono, fontSize: 12, fontWeight: 700, color: T.accent }}>{missing.length}</span>
          </div>
          {missing.length === 0 ? (
            <div style={{
              background: T.okSoft, color: T.ok, padding: 18, borderRadius: 10,
              fontWeight: 800, fontSize: 15, border: `1.5px solid ${T.ok}`,
              fontFamily: T.font, letterSpacing: '-0.4px',
            }}>
              ¡ÁLBUM LLENO!
            </div>
          ) : (
            <>
              {/* Search */}
              <div style={{ position: 'relative', marginBottom: 14 }}>
                <input
                  value={missingSearch} onChange={(e) => setMissingSearch(e.target.value)}
                  placeholder="Buscar por país..."
                  style={{
                    width: '100%', height: 40, padding: '0 14px 0 36px',
                    background: T.surface, border: `1.5px solid ${T.ink}`,
                    borderRadius: 10, fontSize: 14, outline: 'none', color: T.ink,
                    boxShadow: `2px 2px 0 ${T.line}`,
                  }}
                />
                <svg style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: T.inkDim }}
                  width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="7" cy="7" r="5" /><path d="M14 14l-3-3" />
                </svg>
              </div>

              {missingFiltered.map(([code, g]) => (
                <div key={code} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 16, lineHeight: 1 }}>{g.flag}</span>
                    <div style={{ fontSize: 12, fontWeight: 700, fontFamily: T.fontMono, letterSpacing: '0.6px', color: T.ink }}>
                      {g.name.toUpperCase()} <span style={{ color: T.inkSoft, marginLeft: 4 }}>·{g.items.length}·</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {g.items.map((s) => (
                      <span key={s.n} style={{
                        fontFamily: T.fontMono, fontSize: 11, fontWeight: 700,
                        padding: '3px 7px', color: T.ink,
                        border: `1.5px dashed ${T.line}`, borderRadius: 4,
                      }}>{s.n}</span>
                    ))}
                  </div>
                </div>
              ))}
              {missingFiltered.length === 0 && (
                <div style={{ color: T.inkDim, fontSize: 14, fontFamily: T.fontMono }}>Sin resultados.</div>
              )}
            </>
          )}
        </div>

        {/* Para cambiar */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
            <h3 style={{ fontFamily: T.font, fontSize: 22, fontWeight: 800, letterSpacing: '-0.6px' }}>PARA CAMBIAR</h3>
            <span style={{ fontFamily: T.fontMono, fontSize: 12, fontWeight: 700, color: T.accent }}>
              {trades.length} · {trades.reduce((a, t) => a + t.extra, 0)} copias
            </span>
          </div>
          {trades.length === 0 ? (
            <div style={{ color: T.inkDim, fontSize: 14 }}>Sin repetidas todavía.</div>
          ) : (
            <div style={{
              display: 'flex', flexDirection: 'column',
              background: T.surface, border: `1.5px solid ${T.ink}`,
              borderRadius: 10, overflow: 'hidden', boxShadow: `2px 2px 0 ${T.line}`,
            }}>
              {trades.map((t, i) => (
                <div key={t.n} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px',
                  borderTop: i === 0 ? 'none' : `1px dashed ${T.line}`,
                }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{t.sectionFlag}</span>
                  <div style={{ fontFamily: T.font, fontWeight: 800, fontSize: 18, width: 48, flexShrink: 0 }}>{t.n}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {t.label}
                    </div>
                    <div style={{ fontSize: 10, color: T.inkDim, fontFamily: T.fontMono, letterSpacing: '0.6px' }}>
                      {t.sectionName.toUpperCase()}
                    </div>
                  </div>
                  <div style={{
                    fontFamily: T.fontMono, fontSize: 11, fontWeight: 800,
                    padding: '4px 9px', background: T.accent, color: '#fff',
                    borderRadius: 4, border: `1.5px solid ${T.ink}`, flexShrink: 0,
                  }}>×{t.extra}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
