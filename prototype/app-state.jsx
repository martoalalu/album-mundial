// app-state.jsx — Estado y hooks compartidos entre variantes

// Hook: estado de la colección del usuario actual con persistencia local
function useAlbumState(currentUserId) {
  const storageKey = `mundial26_collection_${currentUserId}`;
  const baseUser = USERS.find((u) => u.id === currentUserId) || USERS[0];

  const [collection, setCollection] = React.useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    // Clonar para no mutar el original
    return { ...baseUser.collection };
  });

  React.useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(collection)); } catch (e) {}
  }, [collection, storageKey]);

  // Resetear cuando cambia el usuario
  const lastUser = React.useRef(currentUserId);
  React.useEffect(() => {
    if (lastUser.current !== currentUserId) {
      lastUser.current = currentUserId;
      try {
        const raw = localStorage.getItem(`mundial26_collection_${currentUserId}`);
        setCollection(raw ? JSON.parse(raw) : { ...baseUser.collection });
      } catch (e) {
        setCollection({ ...baseUser.collection });
      }
    }
  }, [currentUserId, baseUser]);

  const inc = React.useCallback((n) => {
    setCollection((c) => ({ ...c, [n]: (c[n] || 0) + 1 }));
  }, []);
  const dec = React.useCallback((n) => {
    setCollection((c) => ({ ...c, [n]: Math.max(0, (c[n] || 0) - 1) }));
  }, []);
  const set = React.useCallback((n, count) => {
    setCollection((c) => ({ ...c, [n]: Math.max(0, count) }));
  }, []);
  const reset = React.useCallback(() => {
    try { localStorage.removeItem(storageKey); } catch (e) {}
    setCollection({ ...baseUser.collection });
  }, [baseUser, storageKey]);

  return { collection, inc, dec, set, reset };
}

// Computar stats sobre la colección.
// Vocabulario:
//   pegada     → la tengo en el álbum (al menos 1 copia)
//   sobran     → copias extra para cambiar (count - 1, si count>=2)
//   conSobras  → cuántas figuritas distintas tienen al menos 1 sobrante
function computeStats(collection) {
  let pegadas = 0, conSobras = 0, faltan = 0, totalSobras = 0;
  for (let i = 1; i <= STICKERS.length; i++) {
    const c = collection[i] || 0;
    if (c === 0) faltan++;
    else pegadas++;
    if (c >= 2) { conSobras++; totalSobras += (c - 1); }
  }
  return {
    pegadas, conSobras, faltan, totalSobras, total: STICKERS.length,
    // alias retro-compat
    owned: pegadas, missing: faltan, dupes: conSobras, totalDupes: totalSobras,
  };
}

// Filtrar stickers según pestaña activa
function filterStickers(filter, collection) {
  return STICKERS.filter((s) => {
    const c = collection[s.n] || 0;
    if (filter === 'all') return true;
    if (filter === 'have') return c >= 1;
    if (filter === 'missing') return c === 0;
    if (filter === 'dupes') return c >= 2; // tiene al menos 1 sobrante
    return true;
  });
}

// Computar todos los matches contra los otros usuarios
function computeAllMatches(myCollection) {
  return USERS
    .filter((u) => !u.isMe)
    .map((u) => ({
      user: u,
      ...computeMatch(myCollection, u.collection),
    }))
    .sort((a, b) => b.swaps - a.swaps);
}

Object.assign(window, { useAlbumState, computeStats, filterStickers, computeAllMatches });
