// data.jsx — Datos mock para el álbum del Mundial 2026

// 48 selecciones del Mundial 2026 (formato expandido). 20 figuritas por equipo = 960
// + 1 sección general × 20 = 20  →  total 980
const TEAMS = [
  { code: 'ARG', name: 'Argentina', color: '#75AADB', group: 'CONMEBOL' },
  { code: 'BRA', name: 'Brasil', color: '#FFDF00', group: 'CONMEBOL' },
  { code: 'URU', name: 'Uruguay', color: '#5CBFEB', group: 'CONMEBOL' },
  { code: 'COL', name: 'Colombia', color: '#FCD116', group: 'CONMEBOL' },
  { code: 'ECU', name: 'Ecuador', color: '#FFD100', group: 'CONMEBOL' },
  { code: 'PAR', name: 'Paraguay', color: '#D52B1E', group: 'CONMEBOL' },
  { code: 'USA', name: 'Estados Unidos', color: '#B22234', group: 'CONCACAF' },
  { code: 'MEX', name: 'México', color: '#006847', group: 'CONCACAF' },
  { code: 'CAN', name: 'Canadá', color: '#D80621', group: 'CONCACAF' },
  { code: 'CRC', name: 'Costa Rica', color: '#002B7F', group: 'CONCACAF' },
  { code: 'PAN', name: 'Panamá', color: '#005AA7', group: 'CONCACAF' },
  { code: 'JAM', name: 'Jamaica', color: '#009B3A', group: 'CONCACAF' },
  { code: 'FRA', name: 'Francia', color: '#0055A4', group: 'UEFA' },
  { code: 'ESP', name: 'España', color: '#AA151B', group: 'UEFA' },
  { code: 'ENG', name: 'Inglaterra', color: '#CE1124', group: 'UEFA' },
  { code: 'GER', name: 'Alemania', color: '#000000', group: 'UEFA' },
  { code: 'POR', name: 'Portugal', color: '#006600', group: 'UEFA' },
  { code: 'ITA', name: 'Italia', color: '#0066CC', group: 'UEFA' },
  { code: 'NED', name: 'Países Bajos', color: '#F36C21', group: 'UEFA' },
  { code: 'BEL', name: 'Bélgica', color: '#ED2939', group: 'UEFA' },
  { code: 'CRO', name: 'Croacia', color: '#FF0000', group: 'UEFA' },
  { code: 'POL', name: 'Polonia', color: '#DC143C', group: 'UEFA' },
  { code: 'SUI', name: 'Suiza', color: '#DA291C', group: 'UEFA' },
  { code: 'DEN', name: 'Dinamarca', color: '#C8102E', group: 'UEFA' },
  { code: 'AUT', name: 'Austria', color: '#ED2939', group: 'UEFA' },
  { code: 'SRB', name: 'Serbia', color: '#C6363C', group: 'UEFA' },
  { code: 'TUR', name: 'Turquía', color: '#E30A17', group: 'UEFA' },
  { code: 'NOR', name: 'Noruega', color: '#BA0C2F', group: 'UEFA' },
  { code: 'SWE', name: 'Suecia', color: '#FECC00', group: 'UEFA' },
  { code: 'UKR', name: 'Ucrania', color: '#FFD500', group: 'UEFA' },
  { code: 'MAR', name: 'Marruecos', color: '#C1272D', group: 'CAF' },
  { code: 'SEN', name: 'Senegal', color: '#00853F', group: 'CAF' },
  { code: 'EGY', name: 'Egipto', color: '#CE1126', group: 'CAF' },
  { code: 'NGA', name: 'Nigeria', color: '#008751', group: 'CAF' },
  { code: 'CIV', name: 'Costa de Marfil', color: '#F77F00', group: 'CAF' },
  { code: 'CMR', name: 'Camerún', color: '#007A5E', group: 'CAF' },
  { code: 'GHA', name: 'Ghana', color: '#CE1126', group: 'CAF' },
  { code: 'ALG', name: 'Argelia', color: '#006233', group: 'CAF' },
  { code: 'TUN', name: 'Túnez', color: '#E70013', group: 'CAF' },
  { code: 'JPN', name: 'Japón', color: '#BC002D', group: 'AFC' },
  { code: 'KOR', name: 'Corea del Sur', color: '#003478', group: 'AFC' },
  { code: 'AUS', name: 'Australia', color: '#FFCD00', group: 'AFC' },
  { code: 'IRN', name: 'Irán', color: '#239F40', group: 'AFC' },
  { code: 'KSA', name: 'Arabia Saudita', color: '#006C35', group: 'AFC' },
  { code: 'QAT', name: 'Qatar', color: '#8A1538', group: 'AFC' },
  { code: 'UZB', name: 'Uzbekistán', color: '#1EB53A', group: 'AFC' },
  { code: 'JOR', name: 'Jordania', color: '#007A3D', group: 'AFC' },
  { code: 'NZL', name: 'Nueva Zelanda', color: '#000000', group: 'OFC' },
];


const SPECIAL_SECTIONS = [
  { id: 'GEN', name: 'General', icon: '★', color: '#D4AF37' },
];

// Generador de números pseudoaleatorios determinístico (mulberry32)
function makeRng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Construcción de las 980 figuritas
function buildStickers() {
  const list = [];
  let n = 1;
  // 48 equipos × 20 figuritas = 960
  // Distribución por equipo: pos 0 = Escudo, pos 1 = Foto grupal/portada, pos 2..19 = 18 retratos
  TEAMS.forEach((t) => {
    for (let i = 0; i < 20; i++) {
      const role = i === 0 ? 'Escudo' : i === 1 ? 'Foto grupal' : `Jugador ${i - 1}`;
      list.push({
        n,
        sectionId: t.code,
        sectionName: t.name,
        sectionColor: t.color,
        sectionGroup: t.group,
        kind: 'team',
        label: role,
        special: i < 2,
      });
      n++;
    }
  });
  // 1 sección general × 20 = 20  →  total 980
  SPECIAL_SECTIONS.forEach((s) => {
    for (let i = 0; i < 20; i++) {
      list.push({
        n,
        sectionId: s.id,
        sectionName: s.name,
        sectionColor: s.color,
        sectionGroup: 'GENERAL',
        kind: 'special',
        label: `${s.name} #${i + 1}`,
        special: true,
      });
      n++;
    }
  });
  return list;
}

const STICKERS = buildStickers(); // 980 figuritas

// Colección random determinística por usuario.
// Devuelve un objeto { [n]: count }, donde count >= 0. 0 = no la tiene.
function buildCollection(seed, opts = {}) {
  const { ownership = 0.55, dupeChance = 0.35 } = opts;
  const rng = makeRng(seed);
  const col = {};
  for (let i = 1; i <= STICKERS.length; i++) {
    if (rng() < ownership) {
      let count = 1;
      // chance de tener repetidas
      while (rng() < dupeChance && count < 5) count++;
      col[i] = count;
    } else {
      col[i] = 0;
    }
  }
  return col;
}

const USERS = [
  { id: 'martin', name: 'Martín', avatar: 'M', color: '#75AADB', isMe: true,
    collection: buildCollection(101, { ownership: 0.62, dupeChance: 0.38 }) },
  { id: 'diego', name: 'Diego', avatar: 'D', color: '#10B981',
    collection: buildCollection(202, { ownership: 0.58, dupeChance: 0.42 }) },
  { id: 'lucas', name: 'Lucas', avatar: 'L', color: '#F59E0B',
    collection: buildCollection(303, { ownership: 0.45, dupeChance: 0.30 }) },
  { id: 'sofia', name: 'Sofía', avatar: 'S', color: '#EC4899',
    collection: buildCollection(404, { ownership: 0.70, dupeChance: 0.45 }) },
  { id: 'fer', name: 'Fer', avatar: 'F', color: '#8B5CF6',
    collection: buildCollection(505, { ownership: 0.50, dupeChance: 0.32 }) },
];

// Agrupar figuritas por sección, en orden
function groupBySection(stickers) {
  const groups = [];
  let cur = null;
  stickers.forEach((s) => {
    if (!cur || cur.id !== s.sectionId) {
      cur = { id: s.sectionId, name: s.sectionName, color: s.sectionColor,
        group: s.sectionGroup, kind: s.kind, items: [] };
      groups.push(cur);
    }
    cur.items.push(s);
  });
  return groups;
}

const SECTIONS = groupBySection(STICKERS);

// Cálculo de matches entre dos colecciones.
// Yo le doy: figuritas que tengo repetidas (>=2) y a él le faltan.
// Me da: figuritas que él tiene repetidas y a mí me faltan.
// Cantidad de cambios = min(yoLeDoy, meDa).
function computeMatch(myCollection, theirCollection) {
  const iGive = []; // figuritas (n) que le doy
  const iGet = [];  // figuritas (n) que recibo
  for (let n = 1; n <= STICKERS.length; n++) {
    const mine = myCollection[n] || 0;
    const theirs = theirCollection[n] || 0;
    if (mine >= 2 && theirs === 0) iGive.push({ n, copies: mine - 1 });
    if (theirs >= 2 && mine === 0) iGet.push({ n, copies: theirs - 1 });
  }
  const swaps = Math.min(iGive.length, iGet.length);
  return { iGive, iGet, swaps };
}

Object.assign(window, {
  TEAMS, SPECIAL_SECTIONS, STICKERS, USERS, SECTIONS,
  computeMatch, buildCollection,
});
