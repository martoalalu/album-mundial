'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { T } from '@/lib/tokens';

export default function LoginScreen({ error }: { error?: string }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(error ?? '');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setFormError('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);
    if (error) {
      setFormError('Algo salió mal. Intentá de nuevo.');
    } else {
      setSent(true);
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

      {!sent ? (
        <>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.6, marginBottom: 4 }}>
              ¡Hola, coleccionista!
            </div>
            <div style={{ fontSize: 14, color: T.inkDim }}>
              Ingresá tu mail y te mandamos el link para entrar.
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

            {formError && (
              <div style={{ fontSize: 13, color: T.accent, fontFamily: T.fontMono, letterSpacing: '0.4px' }}>
                {formError}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              marginTop: 10, height: 54,
              border: `1.5px solid ${T.ink}`,
              background: loading ? T.inkDim : T.accent, color: '#fff',
              borderRadius: 10, fontSize: 16, fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: `3px 3px 0 ${T.ink}`,
              transition: 'background .15s',
            }}>
              {loading ? 'Enviando...' : 'Mandarme el link →'}
            </button>
          </form>
        </>
      ) : (
        <div style={{
          background: T.okSoft, border: `1.5px solid ${T.ok}`,
          borderRadius: 14, padding: '24px 20px',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.6, color: T.ok }}>
            ¡Revisá tu mail!
          </div>
          <div style={{ fontSize: 14, color: T.inkDim, lineHeight: 1.6 }}>
            Te mandamos un link a <strong>{email}</strong>. Buscá el mail con asunto <strong>"Confirm Your Signup"</strong> — lo manda Supabase, no es spam.
          </div>
          <button onClick={() => setSent(false)}
            style={{ marginTop: 4, fontSize: 13, color: T.inkDim, background: 'none', border: 'none', textAlign: 'left', padding: 0, textDecoration: 'underline', cursor: 'pointer' }}>
            Usar otro email
          </button>
        </div>
      )}

      <div style={{ flex: 1 }} />
      <div style={{ fontFamily: T.fontMono, fontSize: 10, color: T.inkSoft, letterSpacing: '1.2px', marginTop: 32, textAlign: 'center' }}>
        ★ SOLO PARA LA BARRA ★
      </div>
    </div>
  );
}
