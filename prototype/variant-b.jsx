// variant-b.jsx — Variante B: Retro álbum
// Paleta cálida estilo libreta de figuritas, papel kraft, tipografía con
// personalidad. Densidad media, figuritas más "stickers". Headers de país
// con bandera de color y rótulo monoespaciado.

const B_TOKENS = {
  bg: '#EBE3D2',           // crema/papel
  bgDark: '#D9CFB8',
  paper: '#F5EFE0',
  surface: '#FBF7EB',
  ink: '#1F1B14',
  inkDim: '#6B5E47',
  inkSoft: '#A39879',
  line: '#C9BFA6',
  lineSoft: '#DDD3BB',
  accent: '#C2410C',       // naranja quemado
  accentSoft: '#FBE4D5',
  ok: '#3F6212',
  okSoft: '#E1EFC4',
  miss: '#C9BFA6',
  font: '"Bricolage Grotesque", "Archivo", system-ui, sans-serif',
  fontDisplay: '"Bricolage Grotesque", "Archivo Black", system-ui, sans-serif',
  fontMono: '"DM Mono", ui-monospace, "SF Mono", monospace',
};

function B_Screen({ children, onScroll }) {
  // Ruido sutil tipo papel
  const grain = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.42  0 0 0 0 0.36  0 0 0 0 0.27  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";
  return (
    <div onScroll={onScroll} style={{
      width: '100%', height: '100%',
      background: B_TOKENS.bg,
      backgroundImage: grain,
      color: B_TOKENS.ink, fontFamily: B_TOKENS.font, overflow: 'auto',
      WebkitFontSmoothing: 'antialiased',
    }}>{children}</div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────
function B_Login({ onLogin }) {
  const [email, setEmail] = React.useState('martin@panini.fc');
  const [pass, setPass] = React.useState('••••••••');
  return (
    <B_Screen>
      <div style={{ minHeight: '100%', padding: '40px 24px 24px', display: 'flex', flexDirection: 'column' }}>
        {/* Cabecera tipo tapa de álbum */}
        <div style={{
          background: B_TOKENS.ink, color: B_TOKENS.paper,
          borderRadius: 18, padding: '22px 22px 28px',
          marginBottom: 28, position: 'relative', overflow: 'hidden',
          boxShadow: `4px 4px 0 ${B_TOKENS.accent}`,
        }}>
          <div style={{ fontFamily: B_TOKENS.fontMono, fontSize: 10, letterSpacing: 2,
            opacity: 0.7, marginBottom: 8 }}>
            COLECCIÓN OFICIAL · GRUPO PRIVADO
          </div>
          <div style={{ fontFamily: B_TOKENS.fontDisplay, fontSize: 56, fontWeight: 800,
            lineHeight: 0.86, letterSpacing: -2,
            background: `linear-gradient(180deg, ${B_TOKENS.paper} 0%, ${B_TOKENS.paper} 60%, ${B_TOKENS.accent} 60%, ${B_TOKENS.accent} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', color: 'transparent',
            paddingBottom: 4,
          }}>
            MUNDIAL<br/>2026
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
            {['🇺🇸', '🇲🇽', '🇨🇦'].map((f, i) => (
              <div key={i} style={{
                fontSize: 18, width: 28, height: 28, borderRadius: 6,
                background: B_TOKENS.paper,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{f}</div>
            ))}
            <div style={{ flex: 1 }} />
            <div style={{ fontFamily: B_TOKENS.fontMono, fontSize: 9, opacity: 0.6,
              alignSelf: 'flex-end', letterSpacing: 1 }}>980 FIGURITAS</div>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.6, marginBottom: 4 }}>
            ¡Hola, coleccionista!
          </div>
          <div style={{ fontSize: 14, color: B_TOKENS.inkDim }}>
            Entrá con tu mail y empezá a pegar.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontFamily: B_TOKENS.fontMono, fontSize: 10, fontWeight: 600,
              letterSpacing: 1.2, textTransform: 'uppercase', color: B_TOKENS.inkDim }}>Email</span>
            <input value={email} onChange={(e) => setEmail(e.target.value)}
              style={{
                height: 48, padding: '0 14px',
                border: `1.5px solid ${B_TOKENS.ink}`, background: B_TOKENS.surface,
                borderRadius: 10, fontSize: 16, outline: 'none',
                fontFamily: 'inherit', color: B_TOKENS.ink,
              }} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontFamily: B_TOKENS.fontMono, fontSize: 10, fontWeight: 600,
              letterSpacing: 1.2, textTransform: 'uppercase', color: B_TOKENS.inkDim }}>Contraseña</span>
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)}
              style={{
                height: 48, padding: '0 14px',
                border: `1.5px solid ${B_TOKENS.ink}`, background: B_TOKENS.surface,
                borderRadius: 10, fontSize: 16, outline: 'none',
                fontFamily: 'inherit', color: B_TOKENS.ink,
              }} />
          </label>

          <button onClick={onLogin} style={{
            marginTop: 10, height: 54,
            border: `1.5px solid ${B_TOKENS.ink}`,
            background: B_TOKENS.accent, color: '#fff',
            borderRadius: 10, fontSize: 16, fontWeight: 700, fontFamily: 'inherit',
            cursor: 'pointer', letterSpacing: 0.2,
            boxShadow: `3px 3px 0 ${B_TOKENS.ink}`,
          }}>Pegar mi primera →</button>

          <a href="#" style={{
            marginTop: 14, fontSize: 14, color: B_TOKENS.ink, textDecoration: 'none',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 16px',
            background: B_TOKENS.surface,
            border: `1.5px dashed ${B_TOKENS.line}`, borderRadius: 10,
          }}>
            <span><span style={{ color: B_TOKENS.inkDim }}>¿No tenés cuenta?</span> <strong>Solicitá acceso</strong></span>
            <span style={{ fontFamily: B_TOKENS.fontMono }}>→</span>
          </a>
        </div>

        <div style={{ flex: 1 }} />
        <div style={{ fontFamily: B_TOKENS.fontMono, fontSize: 10, color: B_TOKENS.inkSoft,
          letterSpacing: 1.2, marginTop: 32, textAlign: 'center' }}>
          ★ SOLO PARA LA BARRA ★
        </div>
      </div>
    </B_Screen>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────
function B_Header({ title, subtitle, stats, accent }) {
  const pct = stats ? Math.round((stats.owned / stats.total) * 100) : null;
  return (
    <div style={{ background: B_TOKENS.bg, position: 'sticky', top: 0, zIndex: 30 }}>
      <div style={{
        margin: '12px 16px 12px', padding: '14px 16px',
        background: B_TOKENS.ink, color: B_TOKENS.paper,
        borderRadius: 14, position: 'relative',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: B_TOKENS.fontMono, fontSize: 9, letterSpacing: 1.6,
              opacity: 0.6, marginBottom: 4 }}>{subtitle}</div>
            <div style={{ fontFamily: B_TOKENS.fontDisplay, fontSize: 30, fontWeight: 800,
              letterSpacing: -1, lineHeight: 1 }}>
              {title}
            </div>
          </div>
          {stats && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: B_TOKENS.fontMono, fontSize: 22, fontWeight: 700,
                letterSpacing: -0.4, color: B_TOKENS.accent }}>
                {stats.owned}<span style={{ opacity: 0.5, color: B_TOKENS.paper }}>/{stats.total}</span>
              </div>
              <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2, fontFamily: B_TOKENS.fontMono, letterSpacing: 0.6 }}>{pct}% LLENO</div>
            </div>
          )}
        </div>
        {stats && (
          <div style={{
            marginTop: 12, height: 8,
            background: 'rgba(255,255,255,.1)', borderRadius: 4, overflow: 'hidden',
            border: `1px solid rgba(255,255,255,.08)`,
          }}>
            <div style={{
              width: `${pct}%`, height: '100%',
              background: `repeating-linear-gradient(45deg, ${B_TOKENS.accent} 0 6px, #E2570F 6px 12px)`,
              transition: 'width .3s',
            }} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FILTER PILLS ─────────────────────────────────────────────────────────
function B_FilterPills({ value, onChange, stats }) {
  const pills = [
    { id: 'all', label: 'TODAS', count: stats.total },
    { id: 'have', label: 'TENGO', count: stats.owned },
    { id: 'missing', label: 'FALTAN', count: stats.missing },
    { id: 'dupes', label: 'REPITO', count: stats.dupes },
  ];
  return (
    <div style={{ display: 'flex', gap: 8, padding: '0 16px 12px', overflowX: 'auto' }}>
      {pills.map((p) => {
        const active = value === p.id;
        return (
          <button key={p.id} onClick={() => onChange(p.id)} style={{
            cursor: 'pointer', padding: '8px 14px', borderRadius: 999,
            fontFamily: B_TOKENS.fontMono, fontSize: 11, fontWeight: 700, letterSpacing: 0.6,
            whiteSpace: 'nowrap',
            background: active ? B_TOKENS.ink : B_TOKENS.surface,
            color: active ? B_TOKENS.paper : B_TOKENS.ink,
            border: `1.5px solid ${B_TOKENS.ink}`,
            boxShadow: active ? `2px 2px 0 ${B_TOKENS.accent}` : `2px 2px 0 ${B_TOKENS.line}`,
            display: 'flex', alignItems: 'center', gap: 6, transform: active ? 'translate(-1px, -1px)' : 'none',
            transition: 'transform .1s',
          }}>
            {p.label}
            <span style={{ fontSize: 10, opacity: 0.7 }}>{p.count}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── STICKER ──────────────────────────────────────────────────────────────
function B_Sticker({ s, count, onFocus, focused, density = 'regular' }) {
  const has = count >= 1;
  const dupe = count >= 2;
  const sobran = Math.max(0, count - 1);
  const sizes = {
    compact: { w: 60, h: 84, num: 18, lbl: 8 },
    regular: { w: 70, h: 96, num: 22, lbl: 9 },
    large:   { w: 84, h: 116, num: 26, lbl: 10 },
  }[density] || { w: 70, h: 96, num: 22, lbl: 9 };

  return (
    <div onClick={onFocus} style={{
      position: 'relative', width: sizes.w, height: sizes.h,
      background: has ? B_TOKENS.surface : 'transparent',
      border: `1.5px ${has ? 'solid' : 'dashed'} ${focused ? B_TOKENS.accent : (has ? B_TOKENS.ink : B_TOKENS.line)}`,
      borderRadius: 8,
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      cursor: 'pointer', userSelect: 'none',
      boxShadow: has ? `2px 2px 0 ${focused ? B_TOKENS.accent : B_TOKENS.line}` : 'none',
      transform: focused ? 'translate(-1px, -1px)' : 'none',
      transition: 'transform .1s, box-shadow .1s, border-color .1s',
    }}>
      {/* Top color band */}
      <div style={{
        height: 14,
        background: has ? s.sectionColor : 'transparent',
        opacity: has ? 1 : 0.25,
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 4,
      }}>
        <span style={{ fontFamily: B_TOKENS.fontMono, fontSize: 7, fontWeight: 700,
          letterSpacing: 0.6, color: 'rgba(0,0,0,.55)', textShadow: '0 0 1px rgba(255,255,255,.4)' }}>
          {s.sectionId}
        </span>
      </div>
      {/* Big number */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{
          fontFamily: B_TOKENS.fontDisplay, fontSize: sizes.num, fontWeight: 800,
          color: has ? B_TOKENS.ink : B_TOKENS.inkSoft,
          letterSpacing: -1, lineHeight: 1,
        }}>
          {s.n}
        </span>
      </div>
      {/* Bottom strip */}
      <div style={{
        background: has ? B_TOKENS.bg : 'transparent',
        borderTop: has ? `1px dashed ${B_TOKENS.line}` : 'none',
        padding: '2px 4px', textAlign: 'center',
      }}>
        <div style={{ fontFamily: B_TOKENS.fontMono, fontSize: sizes.lbl, fontWeight: 600,
          color: has ? B_TOKENS.inkDim : B_TOKENS.inkSoft, letterSpacing: 0.4 }}>
          {has ? (s.special ? '★' : '·' + (s.label.split(' ').pop() || '').slice(0, 6).toUpperCase() + '·') : 'FALTA'}
        </div>
      </div>
      {dupe && (
        <div style={{
          position: 'absolute', top: -7, right: -7,
          background: B_TOKENS.accent, color: '#fff',
          fontFamily: B_TOKENS.fontMono, fontWeight: 800, fontSize: 10,
          minWidth: 24, height: 22, padding: '0 5px',
          borderRadius: 11,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1.5px solid ${B_TOKENS.ink}`,
          boxShadow: `1px 1px 0 ${B_TOKENS.ink}`,
          letterSpacing: 0.2, lineHeight: 1,
        }} title={`Sobran ${sobran}`}>+{sobran}</div>
      )}
    </div>
  );
}

// ─── ALBUM ────────────────────────────────────────────────────────────────
function B_Album({ collection, inc, dec, density }) {
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [focused, setFocused] = React.useState(null);
  const [collapsed, setCollapsed] = React.useState(() => {
    // Por defecto, todas las secciones empiezan colapsadas excepto la primera
    const set = new Set();
    SECTIONS.slice(1).forEach((s) => set.add(s.id));
    return set;
  });
  const stats = computeStats(collection);
  const toggleSection = (id) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const allCollapsed = SECTIONS.every((s) => collapsed.has(s.id));
  const expandAll = () => setCollapsed(new Set());
  const collapseAll = () => setCollapsed(new Set(SECTIONS.map((s) => s.id)));

  const filtered = React.useMemo(() => {
    let list = filterStickers(filter, collection);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((s) => String(s.n).includes(q) ||
        s.sectionId.toLowerCase().includes(q) ||
        s.sectionName.toLowerCase().includes(q));
    }
    return list;
  }, [filter, search, collection]);

  const grouped = React.useMemo(() => {
    const out = [];
    let cur = null;
    filtered.forEach((s) => {
      if (!cur || cur.id !== s.sectionId) {
        cur = { id: s.sectionId, name: s.sectionName, color: s.sectionColor,
          group: s.sectionGroup, items: [] };
        out.push(cur);
      }
      cur.items.push(s);
    });
    return out;
  }, [filtered]);

  // count owned per section
  const sectionStats = React.useMemo(() => {
    const map = {};
    grouped.forEach((g) => {
      const all = SECTIONS.find((s) => s.id === g.id);
      const total = all ? all.items.length : g.items.length;
      const owned = (all ? all.items : g.items).filter((s) => (collection[s.n] || 0) >= 1).length;
      map[g.id] = { total, owned };
    });
    return map;
  }, [grouped, collection]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (!focused) return;
      if (e.target.tagName === 'INPUT') return;
      if (e.key === '+' || e.key === '=') { e.preventDefault(); inc(focused); }
      else if (e.key === '-' || e.key === '_') { e.preventDefault(); dec(focused); }
      else if (e.key === 'Escape') setFocused(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focused, inc, dec]);

  return (
    <B_Screen>
      <B_Header title="MI ÁLBUM" subtitle="MUNDIAL · USA · MEX · CAN" stats={stats} />

      <div style={{ padding: '0 16px 10px', position: 'sticky', top: 88, background: B_TOKENS.bg, zIndex: 25 }}>
        <div style={{ position: 'relative' }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar #número o país"
            style={{
              width: '100%', height: 42, padding: '0 14px 0 38px',
              background: B_TOKENS.surface,
              border: `1.5px solid ${B_TOKENS.ink}`, borderRadius: 10,
              fontSize: 14, fontFamily: 'inherit', outline: 'none', color: B_TOKENS.ink,
              boxShadow: `2px 2px 0 ${B_TOKENS.line}`,
            }} />
          <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            color: B_TOKENS.inkDim }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="7" cy="7" r="5"/><path d="M14 14l-3-3"/>
            </svg>
          </div>
        </div>
      </div>

      <B_FilterPills value={filter} onChange={setFilter} stats={stats} />

      {/* Expand / collapse all */}
      <div style={{ padding: '0 16px 8px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', fontFamily: B_TOKENS.fontMono }}>
        <div style={{ fontSize: 10, color: B_TOKENS.inkDim, letterSpacing: 1, fontWeight: 700 }}>
          {grouped.length} {grouped.length === 1 ? 'SECCIÓN' : 'SECCIONES'}
          {search.trim() && ` · "${search.trim()}"`}
        </div>
        <button onClick={allCollapsed ? expandAll : collapseAll}
          style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            fontFamily: B_TOKENS.fontMono, fontSize: 10, fontWeight: 700, letterSpacing: 1,
            color: B_TOKENS.accent, padding: '4px 6px',
          }}>
          {allCollapsed ? 'ABRIR TODAS ↓' : 'CERRAR TODAS ↑'}
        </button>
      </div>

      <div style={{ paddingBottom: 100 }}>
        {grouped.length === 0 && (
          <div style={{ padding: '48px 20px', textAlign: 'center', color: B_TOKENS.inkDim, fontFamily: B_TOKENS.fontMono, letterSpacing: 1 }}>
            NADA QUE MOSTRAR
          </div>
        )}
        {grouped.map((g) => {
          const ss = sectionStats[g.id] || { total: g.items.length, owned: 0 };
          const complete = ss.owned === ss.total;
          // Si hay búsqueda activa, mostrar siempre expandido. Si no, respetar collapsed state.
          const isCollapsed = !search.trim() && collapsed.has(g.id);
          // Sobrantes en esta sección
          const sectionSobras = g.items.reduce((acc, s) => acc + Math.max(0, (collection[s.n] || 0) - 1), 0);
          const pct = Math.round((ss.owned / ss.total) * 100);
          return (
            <div key={g.id} style={{ marginBottom: 14 }}>
              <button onClick={() => toggleSection(g.id)} style={{
                width: 'calc(100% - 32px)', margin: '0 16px 10px', padding: '10px 12px',
                background: g.color, color: '#fff',
                borderRadius: 10,
                border: `1.5px solid ${B_TOKENS.ink}`,
                boxShadow: `2px 2px 0 ${B_TOKENS.ink}`,
                display: 'flex', alignItems: 'center', gap: 10,
                position: 'relative', cursor: 'pointer', textAlign: 'left',
                fontFamily: 'inherit',
              }}>
                <div style={{
                  fontFamily: B_TOKENS.fontMono, fontSize: 11, fontWeight: 800,
                  background: 'rgba(0,0,0,.25)', color: '#fff',
                  padding: '3px 7px', borderRadius: 4, letterSpacing: 1,
                }}>{g.id}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: B_TOKENS.fontDisplay, fontSize: 17, fontWeight: 800,
                    letterSpacing: -0.4, textShadow: '0 1px 0 rgba(0,0,0,.18)',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {g.name.toUpperCase()}
                  </div>
                  {/* mini progress */}
                  <div style={{
                    marginTop: 4, height: 4, background: 'rgba(0,0,0,.25)', borderRadius: 2, overflow: 'hidden',
                  }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: '#fff', opacity: 0.85 }} />
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: B_TOKENS.fontMono, fontSize: 12, fontWeight: 700,
                    textShadow: '0 1px 0 rgba(0,0,0,.18)' }}>
                    {ss.owned}/{ss.total}
                  </div>
                  {sectionSobras > 0 && (
                    <div style={{ fontFamily: B_TOKENS.fontMono, fontSize: 9, fontWeight: 700,
                      opacity: 0.85, letterSpacing: 0.5, marginTop: 1 }}>
                      +{sectionSobras} sobran
                    </div>
                  )}
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: 6,
                  background: 'rgba(0,0,0,.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform .18s',
                }}>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 1l4 4 4-4" />
                  </svg>
                </div>
                {complete && (
                  <div style={{
                    position: 'absolute', top: -8, right: 36,
                    background: B_TOKENS.ok, color: '#fff',
                    fontFamily: B_TOKENS.fontMono, fontSize: 9, fontWeight: 800, letterSpacing: 1,
                    padding: '2px 7px', borderRadius: 4,
                    border: `1.5px solid ${B_TOKENS.ink}`,
                    transform: 'rotate(-3deg)',
                  }}>COMPLETO</div>
                )}
              </button>
              {!isCollapsed && (
                <div style={{ padding: '4px 16px 6px',
                  display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, justifyItems: 'center' }}>
                  {g.items.map((s) => (
                    <B_Sticker key={s.n} s={s} count={collection[s.n] || 0}
                      focused={focused === s.n} onFocus={() => setFocused(s.n)}
                      density={density} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {focused && (
        <div style={{
          position: 'sticky', bottom: 80, marginLeft: 12, marginRight: 12, marginBottom: 8,
          background: B_TOKENS.ink, color: B_TOKENS.paper,
          borderRadius: 14, padding: 10, display: 'flex', alignItems: 'center', gap: 10,
          border: `1.5px solid ${B_TOKENS.ink}`,
          boxShadow: `4px 4px 0 ${B_TOKENS.accent}`,
        }}>
          <div style={{
            width: 46, height: 46, borderRadius: 8,
            background: STICKERS[focused - 1].sectionColor,
            border: `1.5px solid ${B_TOKENS.paper}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: B_TOKENS.fontDisplay, fontWeight: 800, fontSize: 16, color: '#fff',
            textShadow: '0 1px 2px rgba(0,0,0,.4)', flexShrink: 0,
          }}>
            {focused}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap',
              overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {STICKERS[focused - 1].label}
            </div>
            <div style={{ fontSize: 10, opacity: 0.7, fontFamily: B_TOKENS.fontMono, letterSpacing: 0.8 }}>
              {(() => {
                const c = collection[focused] || 0;
                if (c === 0) return <><span style={{ color: B_TOKENS.accent }}>FALTA</span> · {STICKERS[focused - 1].sectionName.toUpperCase()}</>;
                if (c === 1) return <><span style={{ color: '#9DD96A' }}>PEGADA</span> · {STICKERS[focused - 1].sectionName.toUpperCase()}</>;
                return <><span style={{ color: '#9DD96A' }}>PEGADA</span> + <span style={{ color: B_TOKENS.accent }}>{c - 1} PARA CAMBIAR</span></>;
              })()}
            </div>
          </div>
          <button onClick={() => dec(focused)} style={{
            width: 36, height: 36, borderRadius: 8, border: `1.5px solid ${B_TOKENS.paper}`, cursor: 'pointer',
            background: 'transparent', color: B_TOKENS.paper, fontSize: 18, fontWeight: 700,
          }}>−</button>
          <button onClick={() => inc(focused)} style={{
            width: 36, height: 36, borderRadius: 8, border: `1.5px solid ${B_TOKENS.paper}`, cursor: 'pointer',
            background: B_TOKENS.accent, color: '#fff', fontSize: 18, fontWeight: 700,
          }}>+</button>
        </div>
      )}
    </B_Screen>
  );
}

// ─── RESUMEN ──────────────────────────────────────────────────────────────
function B_Resumen({ collection }) {
  const stats = computeStats(collection);
  const missing = STICKERS.filter((s) => (collection[s.n] || 0) === 0);
  const trades = STICKERS.filter((s) => (collection[s.n] || 0) >= 2)
    .map((s) => ({ ...s, extra: (collection[s.n] || 0) - 1 }));

  const groupBy = (list) => {
    const out = {};
    list.forEach((s) => { (out[s.sectionId] ||= { name: s.sectionName, color: s.sectionColor, items: [] }).items.push(s); });
    return Object.entries(out);
  };

  return (
    <B_Screen>
      <B_Header title="RESUMEN" subtitle="ESTADO DEL ÁLBUM" />

      <div style={{ padding: '0 16px 100px' }}>
        {/* Tres "stickers" tipo encabezado */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 22 }}>
          {[
            { k: 'PEGADAS', v: stats.pegadas, sub: `de ${stats.total}`, color: B_TOKENS.ok },
            { k: 'FALTAN', v: stats.faltan, sub: `${Math.round(stats.faltan/stats.total*100)}%`, color: B_TOKENS.accent },
            { k: 'SOBRAN', v: stats.totalSobras, sub: `${stats.conSobras} distintas`, color: B_TOKENS.ink },
          ].map((k) => (
            <div key={k.k} style={{
              background: B_TOKENS.surface,
              border: `1.5px solid ${B_TOKENS.ink}`, borderRadius: 10,
              padding: '10px 12px', boxShadow: `2px 2px 0 ${k.color}`,
            }}>
              <div style={{ fontFamily: B_TOKENS.fontMono, fontSize: 9, letterSpacing: 1.2,
                fontWeight: 700, color: k.color }}>{k.k}</div>
              <div style={{ fontFamily: B_TOKENS.fontDisplay, fontSize: 28, fontWeight: 800,
                letterSpacing: -1, lineHeight: 1.05 }}>{k.v}</div>
              <div style={{ fontSize: 10, color: B_TOKENS.inkDim, marginTop: 2,
                fontFamily: B_TOKENS.fontMono, letterSpacing: 0.4 }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Faltan */}
        <div style={{ marginBottom: 26 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontFamily: B_TOKENS.fontDisplay, fontSize: 22, fontWeight: 800, letterSpacing: -0.6 }}>ME FALTAN</h3>
            <span style={{ fontFamily: B_TOKENS.fontMono, fontSize: 12, fontWeight: 700, color: B_TOKENS.accent }}>
              {missing.length}
            </span>
          </div>
          {groupBy(missing).map(([code, g]) => (
            <div key={code} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, background: g.color,
                  border: `1px solid ${B_TOKENS.ink}` }} />
                <div style={{ fontSize: 12, fontWeight: 700, fontFamily: B_TOKENS.fontMono,
                  letterSpacing: 0.6, color: B_TOKENS.ink }}>
                  {g.name.toUpperCase()} <span style={{ color: B_TOKENS.inkSoft, marginLeft: 4 }}>·{g.items.length}·</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {g.items.map((s) => (
                  <span key={s.n} style={{
                    fontFamily: B_TOKENS.fontMono, fontSize: 11, fontWeight: 700,
                    padding: '3px 7px', background: 'transparent', color: B_TOKENS.ink,
                    border: `1.5px dashed ${B_TOKENS.line}`, borderRadius: 4,
                  }}>{s.n}</span>
                ))}
              </div>
            </div>
          ))}
          {missing.length === 0 && (
            <div style={{
              background: B_TOKENS.okSoft, color: B_TOKENS.ok,
              padding: 18, borderRadius: 10, fontWeight: 800, fontSize: 15,
              border: `1.5px solid ${B_TOKENS.ok}`,
              fontFamily: B_TOKENS.fontDisplay, letterSpacing: -0.4,
            }}>
              ¡ÁLBUM LLENO! 🏆
            </div>
          )}
        </div>

        {/* Para cambiar */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontFamily: B_TOKENS.fontDisplay, fontSize: 22, fontWeight: 800, letterSpacing: -0.6 }}>PARA CAMBIAR</h3>
            <span style={{ fontFamily: B_TOKENS.fontMono, fontSize: 12, fontWeight: 700, color: B_TOKENS.accent }}>
              {trades.length} · {trades.reduce((a, t) => a + t.extra, 0)} copias
            </span>
          </div>
          {trades.length === 0 ? (
            <div style={{ color: B_TOKENS.inkDim, fontSize: 14 }}>Sin repetidas todavía.</div>
          ) : (
            <div style={{
              display: 'flex', flexDirection: 'column',
              background: B_TOKENS.surface,
              border: `1.5px solid ${B_TOKENS.ink}`, borderRadius: 10, overflow: 'hidden',
              boxShadow: `2px 2px 0 ${B_TOKENS.line}`,
            }}>
              {trades.map((t, i) => (
                <div key={t.n} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px',
                  borderTop: i === 0 ? 'none' : `1px dashed ${B_TOKENS.line}`,
                }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: t.sectionColor,
                    border: `1.5px solid ${B_TOKENS.ink}`, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: B_TOKENS.fontMono, fontWeight: 800, fontSize: 9,
                    color: '#fff', textShadow: '0 1px 1px rgba(0,0,0,.4)',
                  }}>{t.sectionId}</div>
                  <div style={{ fontFamily: B_TOKENS.fontDisplay, fontWeight: 800, fontSize: 18, width: 48 }}>
                    {t.n}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
                      overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.label}</div>
                    <div style={{ fontSize: 10, color: B_TOKENS.inkDim, fontFamily: B_TOKENS.fontMono,
                      letterSpacing: 0.6 }}>{t.sectionName.toUpperCase()}</div>
                  </div>
                  <div style={{
                    fontFamily: B_TOKENS.fontMono, fontSize: 11, fontWeight: 800,
                    padding: '4px 9px', background: B_TOKENS.accent, color: '#fff',
                    borderRadius: 4, border: `1.5px solid ${B_TOKENS.ink}`,
                  }}>×{t.extra}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </B_Screen>
  );
}

// ─── MATCHES ──────────────────────────────────────────────────────────────
function B_MatchCard({ match }) {
  const [open, setOpen] = React.useState(false);
  const { user, iGive, iGet, swaps } = match;
  const hasMatches = swaps > 0;

  return (
    <div style={{
      background: hasMatches ? B_TOKENS.surface : B_TOKENS.bgDark,
      border: `1.5px solid ${B_TOKENS.ink}`,
      borderRadius: 12, marginBottom: 10, overflow: 'hidden',
      boxShadow: hasMatches ? `3px 3px 0 ${B_TOKENS.line}` : 'none',
      opacity: hasMatches ? 1 : 0.7,
    }}>
      <button onClick={() => setOpen((o) => !o)} style={{
        width: '100%', border: 'none', background: 'transparent', cursor: 'pointer',
        padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
        textAlign: 'left', fontFamily: 'inherit',
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10, background: user.color, color: '#fff',
          border: `1.5px solid ${B_TOKENS.ink}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: B_TOKENS.fontDisplay, fontWeight: 800, fontSize: 18,
          textShadow: '0 1px 2px rgba(0,0,0,.3)', flexShrink: 0,
        }}>{user.avatar}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: B_TOKENS.fontDisplay, fontSize: 18, fontWeight: 800,
            letterSpacing: -0.4 }}>{user.name.toUpperCase()}</div>
          <div style={{ fontSize: 11, color: B_TOKENS.inkDim, marginTop: 1, fontFamily: B_TOKENS.fontMono, letterSpacing: 0.4 }}>
            {hasMatches ? (
              <>DOY {iGive.length} · RECIBO {iGet.length}</>
            ) : (
              <>SIN MATCHES</>
            )}
          </div>
        </div>
        <div style={{
          padding: '6px 12px', borderRadius: 8,
          background: hasMatches ? B_TOKENS.accent : B_TOKENS.bg,
          color: hasMatches ? '#fff' : B_TOKENS.inkDim,
          border: `1.5px solid ${B_TOKENS.ink}`,
          fontFamily: B_TOKENS.fontDisplay, fontSize: 16, fontWeight: 800, letterSpacing: -0.4,
        }}>
          {swaps}
        </div>
      </button>

      {open && hasMatches && (
        <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            background: B_TOKENS.bg, border: `1.5px dashed ${B_TOKENS.line}`,
            borderRadius: 8, padding: 10,
          }}>
            <div style={{ fontFamily: B_TOKENS.fontMono, fontSize: 9, letterSpacing: 1.4,
              color: B_TOKENS.inkDim, fontWeight: 700, marginBottom: 6 }}>
              YO LE DOY ↓
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {iGive.slice(0, 24).map((g) => (
                <span key={g.n} style={{
                  fontFamily: B_TOKENS.fontMono, fontSize: 11, fontWeight: 700,
                  padding: '3px 7px', background: B_TOKENS.surface, color: B_TOKENS.ink,
                  border: `1px solid ${B_TOKENS.ink}`, borderRadius: 4,
                }}>{g.n}</span>
              ))}
              {iGive.length > 24 && (
                <span style={{ fontFamily: B_TOKENS.fontMono, fontSize: 11, color: B_TOKENS.inkDim,
                  padding: '3px 7px', fontWeight: 700 }}>+{iGive.length - 24}</span>
              )}
            </div>
          </div>
          <div style={{
            background: B_TOKENS.accentSoft, border: `1.5px solid ${B_TOKENS.accent}`,
            borderRadius: 8, padding: 10,
          }}>
            <div style={{ fontFamily: B_TOKENS.fontMono, fontSize: 9, letterSpacing: 1.4,
              color: B_TOKENS.accent, fontWeight: 700, marginBottom: 6 }}>
              ME DA ↑
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {iGet.slice(0, 24).map((g) => (
                <span key={g.n} style={{
                  fontFamily: B_TOKENS.fontMono, fontSize: 11, fontWeight: 700,
                  padding: '3px 7px', background: B_TOKENS.accent, color: '#fff',
                  borderRadius: 4,
                }}>{g.n}</span>
              ))}
              {iGet.length > 24 && (
                <span style={{ fontFamily: B_TOKENS.fontMono, fontSize: 11, color: B_TOKENS.accent,
                  padding: '3px 7px', fontWeight: 700 }}>+{iGet.length - 24}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function B_Matches({ collection }) {
  const matches = computeAllMatches(collection);
  const totalSwaps = matches.reduce((a, m) => a + m.swaps, 0);

  return (
    <B_Screen>
      <B_Header title="MATCHES" subtitle={`${totalSwaps} CAMBIOS POSIBLES`} />
      <div style={{ padding: '4px 16px 100px' }}>
        <div style={{
          background: B_TOKENS.surface,
          border: `1.5px dashed ${B_TOKENS.line}`, borderRadius: 10,
          padding: '10px 12px', marginBottom: 14,
          fontSize: 12, color: B_TOKENS.inkDim, lineHeight: 1.5,
        }}>
          Cada cambio = mín. entre lo que vos podés dar y lo que él/ella te puede dar.
        </div>
        {matches.map((m) => <B_MatchCard key={m.user.id} match={m} />)}
      </div>
    </B_Screen>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────
function B_Nav({ tab, onTab }) {
  const tabs = [
    { id: 'album', label: 'ÁLBUM' },
    { id: 'resumen', label: 'RESUMEN' },
    { id: 'matches', label: 'MATCHES' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 64,
      background: B_TOKENS.ink, borderTop: `1.5px solid ${B_TOKENS.ink}`,
      display: 'flex', zIndex: 50, padding: 6, gap: 6,
    }}>
      {tabs.map((t) => {
        const active = tab === t.id;
        return (
          <button key={t.id} onClick={() => onTab(t.id)} style={{
            flex: 1, border: `1.5px solid ${active ? B_TOKENS.paper : 'transparent'}`,
            background: active ? B_TOKENS.accent : 'transparent', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            fontFamily: B_TOKENS.fontMono, padding: 0, borderRadius: 10,
            color: active ? '#fff' : 'rgba(255,255,255,.55)',
            fontSize: 11, fontWeight: 800, letterSpacing: 1.4,
          }}>{t.label}</button>
        );
      })}
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────
function VariantB({ currentUserId = 'martin', density = 'regular' }) {
  const [tab, setTab] = React.useState('login');
  const album = useAlbumState(currentUserId);

  const screen = (() => {
    if (tab === 'login') return <B_Login onLogin={() => setTab('album')} />;
    if (tab === 'album') return <B_Album collection={album.collection} inc={album.inc} dec={album.dec} density={density} />;
    if (tab === 'resumen') return <B_Resumen collection={album.collection} />;
    if (tab === 'matches') return <B_Matches collection={album.collection} />;
  })();

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: B_TOKENS.bg }}>
      <div style={{ width: '100%', height: tab === 'login' ? '100%' : 'calc(100% - 64px)', overflow: 'hidden' }}>
        {screen}
      </div>
      {tab !== 'login' && <B_Nav tab={tab} onTab={setTab} />}
    </div>
  );
}

Object.assign(window, { VariantB });
