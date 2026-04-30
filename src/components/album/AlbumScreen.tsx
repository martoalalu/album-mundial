'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useCollection } from '@/lib/store';
import { computeStats, FilterType } from '@/lib/match';
import { SECTIONS, STICKERS, Sticker } from '@/lib/stickers';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/tokens';

// ─── Header ──────────────────────────────────────────────────────────────────
function Header({ owned, total, displayName }: { owned: number; total: number; displayName: string }) {
  const router = useRouter();
  const pct = Math.round((owned / total) * 100);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <div style={{ background: T.bg, position: 'sticky', top: 0, zIndex: 30 }}>
      <div style={{
        margin: '12px 16px', padding: '14px 16px',
        background: T.ink, color: T.paper, borderRadius: 14,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: T.fontMono, fontSize: 9, letterSpacing: '1.6px', opacity: 0.6, marginBottom: 4 }}>
              MUNDIAL 2026
            </div>
            <div style={{ fontFamily: T.font, fontSize: 30, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}>
              Álbum de {displayName.charAt(0).toUpperCase() + displayName.slice(1)}
            </div>
          </div>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            <button onClick={handleLogout} style={{
              background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)',
              color: 'rgba(255,255,255,.45)', borderRadius: 6, padding: '3px 8px',
              fontFamily: T.fontMono, fontSize: 9, letterSpacing: '1px', cursor: 'pointer',
            }}>SALIR</button>
            <div style={{ fontFamily: T.fontMono, fontSize: 22, fontWeight: 700, letterSpacing: '-0.4px', color: T.accent }}>
              {owned}<span style={{ opacity: 0.5, color: T.paper }}>/{total}</span>
            </div>
            <div style={{ fontSize: 10, opacity: 0.7, fontFamily: T.fontMono, letterSpacing: '0.6px' }}>
              {pct}% LLENO
            </div>
          </div>
        </div>
        <div style={{
          marginTop: 12, height: 8, background: 'rgba(255,255,255,.1)',
          borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)',
        }}>
          <div style={{
            width: `${pct}%`, height: '100%',
            background: `repeating-linear-gradient(45deg, ${T.accent} 0 6px, #E2570F 6px 12px)`,
            transition: 'width .3s',
          }} />
        </div>
      </div>
    </div>
  );
}

// ─── Filter pills ─────────────────────────────────────────────────────────────
function FilterPills({
  value, onChange, total, owned, missing, dupes,
}: {
  value: FilterType;
  onChange: (f: FilterType) => void;
  total: number; owned: number; missing: number; dupes: number;
}) {
  const pills: { id: FilterType; label: string; count: number }[] = [
    { id: 'all',     label: 'TODAS',  count: total },
    { id: 'have',    label: 'TENGO',  count: owned },
    { id: 'missing', label: 'FALTAN', count: missing },
    { id: 'dupes',   label: 'REPITO', count: dupes },
  ];
  return (
    <div style={{ overflowX: 'auto', overflowY: 'visible', paddingBottom: 2 }}>
      <div style={{ display: 'flex', gap: 8, padding: '4px 16px 10px', width: 'max-content' }}>
      {pills.map((p) => {
        const active = value === p.id;
        return (
          <button key={p.id} onClick={() => onChange(p.id)} style={{
            padding: '8px 14px', borderRadius: 999,
            fontFamily: T.fontMono, fontSize: 11, fontWeight: 700, letterSpacing: '0.6px',
            whiteSpace: 'nowrap',
            background: active ? T.ink : T.surface,
            color: active ? T.paper : T.ink,
            border: `1.5px solid ${T.ink}`,
            boxShadow: active ? `2px 2px 0 ${T.accent}` : `2px 2px 0 ${T.line}`,
            display: 'flex', alignItems: 'center', gap: 6,
            transform: active ? 'translate(-1px,-1px)' : 'none',
            transition: 'transform .1s',
          }}>
            {p.label}
            <span style={{ fontSize: 10, opacity: 0.7 }}>{p.count}</span>
          </button>
        );
      })}
      </div>
    </div>
  );
}

// ─── Sticker card ─────────────────────────────────────────────────────────────
function StickerCard({
  s, count, onInc, onDec, onTouch,
}: {
  s: Sticker; count: number;
  onInc: () => void; onDec: () => void; onTouch: () => void;
}) {
  const has = count >= 1;
  const dupe = count >= 2;
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPress = useRef(false);
  const [pressing, setPressing] = useState(false);

  function handlePointerDown(e: React.PointerEvent) {
    e.preventDefault();
    didLongPress.current = false;
    setPressing(true);
    pressTimer.current = setTimeout(() => {
      didLongPress.current = true;
      setPressing(false);
      onDec();
      onTouch();
    }, 500);
  }

  function handlePointerUp() {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    setPressing(false);
  }

  function handleClick() {
    if (didLongPress.current) return;
    onInc();
    onTouch();
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClick={handleClick}
      style={{
        position: 'relative', width: 70, height: 96,
        background: has ? T.surface : 'transparent',
        border: `1.5px ${has ? 'solid' : 'dashed'} ${pressing ? T.accent : (has ? T.ink : T.line)}`,
        borderRadius: 8,
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        cursor: 'pointer', userSelect: 'none',
        boxShadow: has ? `2px 2px 0 ${pressing ? T.accent : T.line}` : 'none',
        transform: pressing ? 'translate(-1px,-1px) scale(0.97)' : 'none',
        transition: 'transform .1s, box-shadow .1s, border-color .1s',
      }}>
      <div style={{
        height: 14, background: has ? s.sectionColor : 'transparent', opacity: has ? 1 : 0.25,
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 4,
      }}>
        <span style={{ fontSize: 9, lineHeight: 1 }}>
          {s.sectionFlag}
        </span>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: T.font, fontSize: 22, fontWeight: 800, color: has ? T.ink : T.inkSoft, letterSpacing: -1, lineHeight: 1 }}>
          {s.n}
        </span>
      </div>
      <div style={{
        background: has ? T.bg : 'transparent',
        borderTop: has ? `1px dashed ${T.line}` : 'none',
        padding: '2px 4px', textAlign: 'center',
      }}>
        <div style={{ fontFamily: T.fontMono, fontSize: 9, fontWeight: 600, color: has ? T.inkDim : T.inkSoft, letterSpacing: '0.4px' }}>
          {has ? (s.kind === 'general' ? '★' : `·${(s.label.split(' ').pop() || '').slice(0, 6).toUpperCase()}·`) : 'FALTA'}
        </div>
      </div>
      {dupe && (
        <div style={{
          position: 'absolute', top: -7, right: -7,
          background: T.accent, color: '#fff',
          fontFamily: T.fontMono, fontWeight: 800, fontSize: 10,
          minWidth: 24, height: 22, padding: '0 5px', borderRadius: 11,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1.5px solid ${T.ink}`, boxShadow: `1px 1px 0 ${T.ink}`,
          letterSpacing: '0.2px', lineHeight: 1,
        }}>
          +{count - 1}
        </div>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AlbumScreen() {
  const { collection, inc, dec, displayName } = useCollection();
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const [lastTouched, setLastTouched] = useState<number | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [collapsed, setCollapsed] = useState<Set<string>>(() => {
    const s = new Set<string>();
    SECTIONS.slice(1).forEach((sec) => s.add(sec.id));
    return s;
  });

  const stats = useMemo(() => computeStats(collection), [collection]);

  const toggleSection = useCallback((id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const allCollapsed = SECTIONS.every((s) => collapsed.has(s.id));

  const handleTouch = useCallback((n: number) => {
    setLastTouched(n);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setLastTouched(null), 2000);
  }, []);

  const filteredSections = useMemo(() => {
    const q = search.trim().toLowerCase();
    return SECTIONS.map((sec) => {
      let items = sec.stickers;

      if (filter === 'have')    items = items.filter((s) => (collection[s.n] ?? 0) >= 1);
      if (filter === 'missing') items = items.filter((s) => (collection[s.n] ?? 0) === 0);
      if (filter === 'dupes')   items = items.filter((s) => (collection[s.n] ?? 0) >= 2);

      if (q) {
        items = items.filter((s) =>
          String(s.n).includes(q) ||
          s.sectionId.toLowerCase().includes(q) ||
          s.sectionName.toLowerCase().includes(q)
        );
      }

      return { ...sec, items };
    })
    .filter((sec) => sec.items.length > 0)
    .sort((a, b) => {
      if (a.id === 'GEN') return 1;
      if (b.id === 'GEN') return -1;
      return a.name.localeCompare(b.name, 'es');
    });
  }, [filter, search, collection]);

  return (
    <div style={{ height: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Header owned={stats.pegadas} total={stats.total} displayName={displayName} />

      {/* Search */}
      <div style={{ padding: '0 16px 10px', position: 'sticky', top: 88, background: T.bg, zIndex: 25 }}>
        <div style={{ position: 'relative' }}>
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar #número o país"
            style={{
              width: '100%', height: 42, padding: '0 14px 0 38px',
              background: T.surface, border: `1.5px solid ${T.ink}`, borderRadius: 10,
              fontSize: 14, outline: 'none', color: T.ink,
              boxShadow: `2px 2px 0 ${T.line}`,
            }}
          />
          <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: T.inkDim }}
            width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="7" cy="7" r="5" /><path d="M14 14l-3-3" />
          </svg>
        </div>
      </div>

      <FilterPills
        value={filter} onChange={setFilter}
        total={stats.total} owned={stats.pegadas} missing={stats.faltan} dupes={stats.sobran}
      />

      {/* Expand/collapse all */}
      <div style={{ padding: '0 16px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: T.fontMono }}>
        <div style={{ fontSize: 10, color: T.inkDim, letterSpacing: 1, fontWeight: 700 }}>
          {filteredSections.length} {filteredSections.length === 1 ? 'SECCIÓN' : 'SECCIONES'}
          {search.trim() && ` · "${search.trim()}"`}
        </div>
        <button onClick={() => setCollapsed(allCollapsed ? new Set() : new Set(SECTIONS.map((s) => s.id)))}
          style={{ border: 'none', background: 'transparent', fontFamily: T.fontMono, fontSize: 10, fontWeight: 700, letterSpacing: 1, color: T.accent, padding: '4px 6px' }}>
          {allCollapsed ? 'ABRIR TODAS ↓' : 'CERRAR TODAS ↑'}
        </button>
      </div>

      {/* Sections */}
      <div style={{ paddingBottom: 16, flex: 1 }}>
        {filteredSections.length === 0 && (
          <div style={{ padding: '48px 20px', textAlign: 'center', color: T.inkDim, fontFamily: T.fontMono, letterSpacing: 1 }}>
            NADA QUE MOSTRAR
          </div>
        )}
        {filteredSections.map((sec) => {
          const owned = sec.stickers.filter((s) => (collection[s.n] ?? 0) >= 1).length;
          const total = sec.stickers.length;
          const complete = owned === total;
          const isCollapsed = !search.trim() && collapsed.has(sec.id);
          const sobras = sec.items.reduce((acc, s) => acc + Math.max(0, (collection[s.n] ?? 0) - 1), 0);
          const pct = Math.round((owned / total) * 100);

          return (
            <div key={sec.id} style={{ marginBottom: 14 }}>
              <button onClick={() => toggleSection(sec.id)} style={{
                width: 'calc(100% - 32px)', margin: '0 16px 10px',
                padding: '10px 12px', background: sec.color, color: '#fff',
                borderRadius: 10, border: `1.5px solid ${T.ink}`, boxShadow: `2px 2px 0 ${T.ink}`,
                display: 'flex', alignItems: 'center', gap: 10,
                position: 'relative', textAlign: 'left',
              }}>
                <div style={{
                  fontSize: 22, lineHeight: 1,
                  background: 'rgba(0,0,0,.18)', borderRadius: 6,
                  padding: '3px 6px', flexShrink: 0,
                }}>{sec.flag}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 800, letterSpacing: '-0.4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {sec.name.toUpperCase()}
                  </div>
                  <div style={{ marginTop: 4, height: 4, background: 'rgba(0,0,0,.25)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: '#fff', opacity: 0.85 }} />
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: T.fontMono, fontSize: 12, fontWeight: 700 }}>{owned}/{total}</div>
                  {sobras > 0 && (
                    <div style={{ fontFamily: T.fontMono, fontSize: 9, fontWeight: 700, opacity: 0.85, letterSpacing: '0.5px', marginTop: 1 }}>
                      +{sobras} sobran
                    </div>
                  )}
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: 6, background: 'rgba(0,0,0,.25)', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform .18s',
                }}>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 1l4 4 4-4" />
                  </svg>
                </div>
                {complete && (
                  <div style={{
                    position: 'absolute', top: -8, right: 36,
                    background: T.ok, color: '#fff',
                    fontFamily: T.fontMono, fontSize: 9, fontWeight: 800, letterSpacing: 1,
                    padding: '2px 7px', borderRadius: 4, border: `1.5px solid ${T.ink}`,
                    transform: 'rotate(-3deg)',
                  }}>COMPLETO</div>
                )}
              </button>

              {!isCollapsed && (
                <div style={{
                  padding: '4px 16px 6px',
                  display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, justifyItems: 'center',
                }}>
                  {sec.items.map((s) => (
                    <StickerCard
                      key={s.n} s={s} count={collection[s.n] ?? 0}
                      onInc={() => inc(s.n)}
                      onDec={() => dec(s.n)}
                      onTouch={() => handleTouch(s.n)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info bar — aparece 2s después del último tap */}
      {lastTouched && (() => {
        const s = STICKERS[lastTouched - 1];
        const c = collection[lastTouched] ?? 0;
        return (
          <div style={{
            position: 'sticky', bottom: 8, margin: '0 12px 8px',
            background: T.ink, color: T.paper,
            borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
            border: `1.5px solid ${T.ink}`, boxShadow: `4px 4px 0 ${T.accent}`,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8, background: s.sectionColor,
              border: `1.5px solid ${T.paper}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: T.font, fontWeight: 800, fontSize: 15, color: '#fff',
              textShadow: '0 1px 2px rgba(0,0,0,.4)', flexShrink: 0,
            }}>
              {lastTouched}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {s.label}
              </div>
              <div style={{ fontSize: 10, opacity: 0.7, fontFamily: T.fontMono, letterSpacing: '0.8px' }}>
                {c === 0 && <><span style={{ color: T.accent }}>FALTA</span> · mantené presionado para restar</>}
                {c === 1 && <><span style={{ color: '#9DD96A' }}>PEGADA ×1</span> · {s.sectionName.toUpperCase()}</>}
                {c >= 2  && <><span style={{ color: '#9DD96A' }}>PEGADA ×{c}</span> · <span style={{ color: T.accent }}>{c - 1} PARA CAMBIAR</span></>}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
