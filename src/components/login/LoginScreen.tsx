'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/tokens';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);
    if (error) {
      setError('Mail o contraseña incorrectos.');
    } else {
      router.push('/album');
      router.refresh();
    }
  }

  return (
    <div style={{
      minHeight: '100%', padding: '40px 24px 24px',
      display: 'flex', flexDirection: 'column',
      background: T.bg, fontFamily: T.font, color: T.ink,
    }}>
      {/* Tapa del álbum */}
      <div style={{
        background: T.ink, color: T.paper,
        borderRadius: 18, padding: '22px 22px 28px',
        marginBottom: 28, position: 'relative', overflow: 'hidden',
        boxShadow: `4px 4px 0 ${T.accent}`,
      }}>
        <div style={{ fontFamily: T.fontMono, fontSize: 10, letterSpacing: 2, opacity: 0.7, marginBottom: 8 }}>
          COLECCIÓN OFICIAL · GRUPO PRIVADO
        </div>
        <div style={{
          fontFamily: T.font, fontSize: 56, fontWeight: 800,
          lineHeight: 0.86, letterSpacing: -2,
          background: `linear-gradient(180deg, ${T.paper} 0%, ${T.paper} 60%, ${T.accent} 60%, ${T.accent} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', paddingBottom: 4,
        }}>
          MUNDIAL<br />2026
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 14, alignItems: 'center' }}>
          {['🇺🇸', '🇲🇽', '🇨🇦'].map((f, i) => (
            <div key={i} style={{
              fontSize: 18, width: 28, height: 28, borderRadius: 6,
              background: T.paper, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{f}</div>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ fontFamily: T.fontMono, fontSize: 9, opacity: 0.6, letterSpacing: 1 }}>980 FIGURITAS</div>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.6, marginBottom: 4 }}>
          ¡Hola, coleccionista!
        </div>
        <div style={{ fontSize: 14, color: T.inkDim }}>
          Ingresá con el mail y la contraseña que te pasaron.
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <span style={{ fontFamily: T.fontMono, fontSize: 10, fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.inkDim }}>
            Email
          </span>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="tumail@ejemplo.com" required autoComplete="email"
            style={{
              height: 48, padding: '0 14px',
              border: `1.5px solid ${T.ink}`, background: T.surface,
              borderRadius: 10, fontSize: 16, outline: 'none', color: T.ink,
            }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <span style={{ fontFamily: T.fontMono, fontSize: 10, fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.inkDim }}>
            Contraseña
          </span>
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            required autoComplete="current-password"
            style={{
              height: 48, padding: '0 14px',
              border: `1.5px solid ${T.ink}`, background: T.surface,
              borderRadius: 10, fontSize: 16, outline: 'none', color: T.ink,
            }}
          />
        </label>

        {error && (
          <div style={{ fontSize: 13, color: T.accent, fontFamily: T.fontMono, letterSpacing: '0.4px' }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} style={{
          marginTop: 10, height: 54,
          border: `1.5px solid ${T.ink}`,
          background: loading ? T.inkDim : T.accent, color: '#fff',
          borderRadius: 10, fontSize: 16, fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: `3px 3px 0 ${T.ink}`,
        }}>
          {loading ? 'Entrando...' : 'Entrar →'}
        </button>
      </form>

      <div style={{ flex: 1 }} />

      <a href="https://docs.google.com/forms/d/1xStKJ-cXEga7Gl6BALUi1aWSYA5T6vh9o4EQE46YOP0/edit"
        target="_blank" rel="noopener noreferrer"
        style={{
          marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 16px',
          background: T.surface, border: `1.5px dashed ${T.line}`, borderRadius: 10,
          textDecoration: 'none', color: T.ink,
        }}>
        <span style={{ fontSize: 14 }}>
          <span style={{ color: T.inkDim }}>¿Querés tu usuario?</span> <strong>Completá este form</strong>
        </span>
        <span style={{ fontFamily: T.fontMono, color: T.inkDim }}>→</span>
      </a>

      <div style={{ fontFamily: T.fontMono, fontSize: 10, color: T.inkSoft, letterSpacing: '1.2px', marginTop: 20, textAlign: 'center' }}>
        ★ SOLO PARA LA BARRA ★
      </div>
    </div>
  );
}
