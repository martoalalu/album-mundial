'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/tokens';

export default function GrupoScreen({ userId }: { userId: string }) {
  const router = useRouter();
  const [tab, setTab] = useState<'create' | 'join'>('create');
  const [groupName, setGroupName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!groupName.trim()) return;
    setLoading(true);
    setError('');

    const supabase = createClient();
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();

    const { data: group, error: groupError } = await supabase
      .from('groups')
      .insert({ name: groupName.trim(), invite_code: code, created_by: userId })
      .select('id')
      .single();

    if (groupError || !group) {
      setError('No se pudo crear el grupo. Intentá de nuevo.');
      setLoading(false);
      return;
    }

    const { error: memberError } = await supabase
      .from('group_members')
      .insert({ group_id: group.id, user_id: userId });

    if (memberError) {
      setError('No se pudo unirte al grupo.');
      setLoading(false);
      return;
    }

    router.push('/album');
    router.refresh();
  }

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteCode.trim()) return;
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { data: group, error: groupError } = await supabase
      .from('groups')
      .select('id, name')
      .eq('invite_code', inviteCode.trim().toUpperCase())
      .single();

    if (groupError || !group) {
      setError('Código inválido. Pedile el código a alguien del grupo.');
      setLoading(false);
      return;
    }

    const { error: memberError } = await supabase
      .from('group_members')
      .insert({ group_id: group.id, user_id: userId });

    if (memberError) {
      setError('Ya sos miembro de este grupo o ocurrió un error.');
      setLoading(false);
      return;
    }

    router.push('/album');
    router.refresh();
  }

  return (
    <div style={{
      minHeight: '100%', padding: '40px 24px 24px',
      display: 'flex', flexDirection: 'column',
      background: T.bg, fontFamily: T.font, color: T.ink,
    }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: T.fontMono, fontSize: 10, letterSpacing: 2, color: T.inkDim, marginBottom: 8 }}>
          ÁLBUM MUNDIAL 2026
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.8, lineHeight: 1.1 }}>
          Creá o unite<br />a un grupo
        </div>
        <div style={{ fontSize: 14, color: T.inkDim, marginTop: 8, lineHeight: 1.5 }}>
          Necesitás un grupo para coordinar cambios con amigos.
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {(['create', 'join'] as const).map((t) => {
          const active = tab === t;
          return (
            <button key={t} onClick={() => { setTab(t); setError(''); }} style={{
              flex: 1, padding: '10px 0', borderRadius: 10,
              fontFamily: T.fontMono, fontSize: 11, fontWeight: 700, letterSpacing: '0.8px',
              border: `1.5px solid ${T.ink}`,
              background: active ? T.ink : T.surface,
              color: active ? T.paper : T.ink,
              boxShadow: active ? `2px 2px 0 ${T.accent}` : `2px 2px 0 ${T.line}`,
              transform: active ? 'translate(-1px,-1px)' : 'none',
              transition: 'transform .1s',
            }}>
              {t === 'create' ? 'CREAR GRUPO' : 'UNIRME'}
            </button>
          );
        })}
      </div>

      {tab === 'create' ? (
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontFamily: T.fontMono, fontSize: 10, fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.inkDim }}>
              Nombre del grupo
            </span>
            <input
              value={groupName} onChange={(e) => setGroupName(e.target.value)}
              placeholder="Ej: Los del trabajo, La familia..."
              style={{
                height: 48, padding: '0 14px',
                border: `1.5px solid ${T.ink}`, background: T.surface,
                borderRadius: 10, fontSize: 16, outline: 'none', color: T.ink,
              }}
            />
          </label>
          {error && <div style={{ fontSize: 13, color: T.accent, fontFamily: T.fontMono }}>{error}</div>}
          <button type="submit" disabled={loading} style={{
            marginTop: 8, height: 54, border: `1.5px solid ${T.ink}`,
            background: loading ? T.inkDim : T.accent, color: '#fff',
            borderRadius: 10, fontSize: 16, fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: `3px 3px 0 ${T.ink}`,
          }}>
            {loading ? 'Creando...' : 'Crear grupo →'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontFamily: T.fontMono, fontSize: 10, fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.inkDim }}>
              Código de invitación
            </span>
            <input
              value={inviteCode} onChange={(e) => setInviteCode(e.target.value)}
              placeholder="Ej: AB12CD" maxLength={6}
              style={{
                height: 48, padding: '0 14px',
                border: `1.5px solid ${T.ink}`, background: T.surface,
                borderRadius: 10, fontSize: 20, fontFamily: T.fontMono,
                fontWeight: 700, letterSpacing: 4, outline: 'none', color: T.ink,
                textTransform: 'uppercase',
              }}
            />
          </label>
          {error && <div style={{ fontSize: 13, color: T.accent, fontFamily: T.fontMono }}>{error}</div>}
          <button type="submit" disabled={loading} style={{
            marginTop: 8, height: 54, border: `1.5px solid ${T.ink}`,
            background: loading ? T.inkDim : T.accent, color: '#fff',
            borderRadius: 10, fontSize: 16, fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: `3px 3px 0 ${T.ink}`,
          }}>
            {loading ? 'Uniéndome...' : 'Unirme al grupo →'}
          </button>
        </form>
      )}
    </div>
  );
}
