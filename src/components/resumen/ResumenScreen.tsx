'use client';

import { useMemo } from 'react';
import { useCollection } from '@/lib/store';
import { computeStats } from '@/lib/match';
import { STICKERS } from '@/lib/stickers';
import { T } from '@/lib/tokens';

type GroupedSection = { name: string; color: string; items: typeof STICKERS };

function groupBySection(stickers: typeof STICKERS): [string, GroupedSection][] {
  const out: Record<string, GroupedSection> = {};
  stickers.forEach((s) => {
    if (!out[s.sectionId]) out[s.sectionId] = { name: s.sectionName, color: s.sectionColor, items: [] };
    out[s.sectionId].items.push(s);
  });
  return Object.entries(out);
}

export default function ResumenScreen() {
  const { collection } = useCollection();
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
            { k: 'PEGADAS', v: stats.pegadas, sub: `de ${stats.total}`, color: T.ok },
            { k: 'FALTAN',  v: stats.faltan,  sub: `${Math.round(stats.faltan / stats.total * 100)}%`, color: T.accent },
            { k: 'SOBRAN',  v: stats.totalSobras, sub: `${stats.sobran} distintas`, color: T.ink },
          ].map((card) => (
            <div key={card.k} style={{
              background: T.surface, border: `1.5px solid ${T.ink}`,
              borderRadius: 10, padding: '10px 12px', boxShadow: `2px 2px 0 ${card.color}`,
            }}>
              <div style={{ fontFamily: T.fontMono, fontSize: 9, letterSpacing: '1.2px', fontWeight: 700, color: card.color }}>
                {card.k}
              </div>
              <div style={{ fontFamily: T.font, fontSize: 28, fontWeight: 800, letterSpacing: -1, lineHeight: 1.05 }}>
                {card.v}
              </div>
              <div style={{ fontSize: 10, color: T.inkDim, marginTop: 2, fontFamily: T.fontMono, letterSpacing: '0.4px' }}>
                {card.sub}
              </div>
            </div>
          ))}
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
            groupBySection(missing).map(([code, g]) => (
              <div key={code} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 14, height: 14, borderRadius: 3, background: g.color, border: `1px solid ${T.ink}`, flexShrink: 0 }} />
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
            ))
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
                  <div style={{
                    width: 28, height: 28, borderRadius: 6, background: t.sectionColor,
                    border: `1.5px solid ${T.ink}`, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: T.fontMono, fontWeight: 800, fontSize: 9,
                    color: '#fff', textShadow: '0 1px 1px rgba(0,0,0,.4)',
                  }}>{t.sectionId}</div>
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
