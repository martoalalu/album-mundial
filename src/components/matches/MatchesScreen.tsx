'use client';

import { useMemo, useState } from 'react';
import { useCollection } from '@/lib/store';
import { computeMatch, MatchResult } from '@/lib/match';
import { MOCK_USERS, MockUser } from '@/lib/mock-users';
import { T } from '@/lib/tokens';

type FullMatch = MatchResult & { user: MockUser };

function MatchCard({ match }: { match: FullMatch }) {
  const [open, setOpen] = useState(false);
  const { user, iGive, iGet, swaps } = match;
  const hasMatches = swaps > 0;

  return (
    <div style={{
      background: hasMatches ? T.surface : T.bgDark,
      border: `1.5px solid ${T.ink}`, borderRadius: 12, marginBottom: 10, overflow: 'hidden',
      boxShadow: hasMatches ? `3px 3px 0 ${T.line}` : 'none',
      opacity: hasMatches ? 1 : 0.7,
    }}>
      <button onClick={() => setOpen((o) => !o)} style={{
        width: '100%', border: 'none', background: 'transparent',
        padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10, background: user.color, color: '#fff',
          border: `1.5px solid ${T.ink}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: T.font, fontWeight: 800, fontSize: 18,
          textShadow: '0 1px 2px rgba(0,0,0,.3)', flexShrink: 0,
        }}>{user.avatar}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: T.font, fontSize: 18, fontWeight: 800, letterSpacing: '-0.4px' }}>
            {user.name.toUpperCase()}
          </div>
          <div style={{ fontSize: 11, color: T.inkDim, marginTop: 1, fontFamily: T.fontMono, letterSpacing: '0.4px' }}>
            {hasMatches ? <>DOY {iGive.length} · RECIBO {iGet.length}</> : <>SIN FIGUS PARA CAMBIAR</>}
          </div>
        </div>
        <div style={{
          padding: '6px 12px', borderRadius: 8,
          background: hasMatches ? T.accent : T.bg,
          color: hasMatches ? '#fff' : T.inkDim,
          border: `1.5px solid ${T.ink}`,
          fontFamily: T.font, fontSize: 16, fontWeight: 800, letterSpacing: '-0.4px',
          flexShrink: 0,
        }}>
          {swaps}
        </div>
      </button>

      {open && hasMatches && (
        <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: T.bg, border: `1.5px dashed ${T.line}`, borderRadius: 8, padding: 10 }}>
            <div style={{ fontFamily: T.fontMono, fontSize: 9, letterSpacing: '1.4px', color: T.inkDim, fontWeight: 700, marginBottom: 6 }}>
              YO LE DOY ↓
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {iGive.slice(0, 24).map((g) => (
                <span key={g.n} style={{
                  fontFamily: T.fontMono, fontSize: 11, fontWeight: 700,
                  padding: '3px 7px', background: T.surface, color: T.ink,
                  border: `1px solid ${T.ink}`, borderRadius: 4,
                }}>{g.n}</span>
              ))}
              {iGive.length > 24 && (
                <span style={{ fontFamily: T.fontMono, fontSize: 11, color: T.inkDim, padding: '3px 7px', fontWeight: 700 }}>
                  +{iGive.length - 24}
                </span>
              )}
            </div>
          </div>
          <div style={{ background: T.accentSoft, border: `1.5px solid ${T.accent}`, borderRadius: 8, padding: 10 }}>
            <div style={{ fontFamily: T.fontMono, fontSize: 9, letterSpacing: '1.4px', color: T.accent, fontWeight: 700, marginBottom: 6 }}>
              ME DA ↑
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {iGet.slice(0, 24).map((g) => (
                <span key={g.n} style={{
                  fontFamily: T.fontMono, fontSize: 11, fontWeight: 700,
                  padding: '3px 7px', background: T.accent, color: '#fff', borderRadius: 4,
                }}>{g.n}</span>
              ))}
              {iGet.length > 24 && (
                <span style={{ fontFamily: T.fontMono, fontSize: 11, color: T.accent, padding: '3px 7px', fontWeight: 700 }}>
                  +{iGet.length - 24}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MatchesScreen() {
  const { collection } = useCollection();

  const matches = useMemo<FullMatch[]>(() => {
    return MOCK_USERS
      .map((user) => ({ user, ...computeMatch(collection, user.collection) }))
      .sort((a, b) => b.swaps - a.swaps);
  }, [collection]);

  const totalSwaps = matches.reduce((a, m) => a + m.swaps, 0);

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <div style={{ background: T.bg, position: 'sticky', top: 0, zIndex: 30 }}>
        <div style={{ margin: '12px 16px', padding: '14px 16px', background: T.ink, color: T.paper, borderRadius: 14 }}>
          <div style={{ fontFamily: T.fontMono, fontSize: 9, letterSpacing: '1.6px', opacity: 0.6, marginBottom: 4 }}>
            {totalSwaps} CAMBIOS POSIBLES
          </div>
          <div style={{ fontFamily: T.font, fontSize: 30, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}>
            CAMBIAR
          </div>
        </div>
      </div>

      <div style={{ padding: '4px 16px 100px' }}>
        <div style={{
          background: T.surface, border: `1.5px dashed ${T.line}`, borderRadius: 10,
          padding: '10px 12px', marginBottom: 14,
          fontSize: 12, color: T.inkDim, lineHeight: 1.5,
        }}>
          Cada cambio = mín. entre lo que vos podés dar y lo que él/ella te puede dar.
        </div>
        {matches.map((m) => <MatchCard key={m.user.id} match={m} />)}
      </div>
    </div>
  );
}
