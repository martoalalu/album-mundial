# Álbum Mundial 2026 — Brief para v0

App para que un grupo de amigos coordine el intercambio de figuritas del álbum del Mundial. Cada uno carga lo que tiene; la app calcula automáticamente quién puede cambiar con quién.

Este repo contiene un **prototipo navegable en HTML/JSX** (no Next.js) que sirve como referencia de UX, lógica y copy. La idea es portarlo a **Next.js + Supabase** en v0.

---

## Stack objetivo

- **Next.js 15** (App Router) + React Server Components donde tenga sentido
- **Supabase** — auth (email/password o magic link) + Postgres + RLS
- **Tailwind** + shadcn/ui para componentes base
- Mantener la **estética retro/álbum** del prototipo (papel kraft, naranja quemado `#D9531E`, tipografía display tipo Bricolage Grotesque, mono para números)

---

## Archivos de referencia en este repo

| Archivo | Para qué sirve |
|---|---|
| `Album Mundial 2026.html` | Entrada del prototipo (design canvas + tweaks) |
| `variant-b.jsx` | **Toda la UI**: Login, Álbum, Resumen, Matches. Es la referencia visual principal. |
| `data.jsx` | Mock de figuritas, países, secciones especiales, usuarios |
| `app-state.jsx` | Lógica pura: `computeStats`, `filterStickers`, `computeAllMatches` |
| `ios-frame.jsx` | Solo decoración — ignorar |

**Lo que NO se porta**: design canvas, tweaks panel, marco de iPhone, todo el mock de `USERS` con colecciones random.

---

## Modelo de datos (Supabase)

```sql
-- Usuarios (gestionados por Supabase Auth, esta tabla es el perfil)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  emoji text,                 -- avatar emoji opcional
  created_at timestamptz default now()
);

-- Grupos de intercambio (un usuario puede estar en varios)
create table groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  invite_code text unique not null,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

create table group_members (
  group_id uuid references groups(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  joined_at timestamptz default now(),
  primary key (group_id, user_id)
);

-- La colección: una fila por figurita que tiene un usuario, con cantidad
-- (sticker_n es el número en el álbum: 1..980 + códigos especiales tipo 'FWC1')
create table collections (
  user_id uuid references profiles(id) on delete cascade,
  sticker_n text not null,
  count int not null check (count >= 0),
  updated_at timestamptz default now(),
  primary key (user_id, sticker_n)
);

create index on collections (user_id);
create index on collections (sticker_n);
```

**RLS**:
- `profiles`: select público entre miembros del mismo grupo, update solo propio
- `collections`: select para miembros del mismo grupo del dueño; insert/update/delete solo del dueño
- `groups` / `group_members`: select solo si sos miembro

---

## Catálogo de figuritas

Está en `data.jsx` como `STICKERS` y `SECTIONS`. Son **980 figuritas**: 48 equipos × 20 (escudo + foto grupal + 18 retratos) = 960, más una sección General de 20 figuritas.

**Recomendación**: meterlas en una tabla estática `stickers_catalog` (o un JSON en `lib/stickers.ts`) con la forma:

```ts
type Sticker = {
  n: string;          // "1", "2", ... o "FWC1", "MAS1" para especiales
  label: string;      // nombre del jugador o item
  sectionId: string;  // 'ARG', 'BRA', 'FWC', 'MAS', etc.
  sectionName: string;
};
```

El catálogo no cambia, así que NO va en Supabase — se sirve estático.

---

## Pantallas a portar

### 1. Login / Onboarding
- Email + password (o magic link)
- Después del login: si no perteneces a ningún grupo → pantalla "creá o unite a un grupo" (con `invite_code`)
- Primera vez en un grupo → **onboarding rápido**: "marcá las figuritas que ya tenés" (input de número o pega lista separada por comas)

### 2. Álbum (pantalla principal)
- Header con avatar + progreso global (X/980)
- Pills de filtro: TODAS / TENGO / FALTAN / REPITO
- Buscador por número o nombre
- Secciones colapsables por país (con summary X/Y y "+N sobran")
- Grid de figuritas: tap selecciona, **+/− para sumar/restar copias**
- Badge "+N" cuando hay sobrantes (count >= 2)
- Persistencia: cada cambio escribe a `collections` con optimistic update

### 3. Resumen
- 3 stat cards arriba: PEGADAS / FALTAN / SOBRAN
- Sección "ME FALTAN" agrupada por país
- Sección "PARA CAMBIAR" agrupada por país, con `+N` por figurita

### 4. Matches
- Lista de otros miembros del grupo, ordenados por **cantidad de cambios posibles**
- Por cada usuario: card expandible que muestra
  - "él/ella tiene N que vos no" (yo recibo)
  - "vos tenés N que él/ella no" (yo doy)
  - Lista de figuritas con número + label

**Lógica del match** (ya está en `computeAllMatches` en `app-state.jsx`):

```ts
function computeMatches(myCollection, theirCollection) {
  const iReceive = []; // tienen sobrante y a mí me falta
  const iGive = [];    // yo tengo sobrante y a ellos les falta
  for (const sticker of CATALOG) {
    const mine = myCollection[sticker.n] ?? 0;
    const theirs = theirCollection[sticker.n] ?? 0;
    if (mine === 0 && theirs >= 2) iReceive.push(sticker);
    if (mine >= 2 && theirs === 0) iGive.push(sticker);
  }
  return { iReceive, iGive, total: Math.min(iReceive.length, iGive.length) };
}
```

**Importante para escala**: NO traer la colección completa de todos los miembros al cliente. Hacerlo como una **Postgres function** o RPC que reciba `my_user_id` y `group_id` y devuelva ya el resumen de matches.

---

## Lenguaje (mantener consistente)

| Estado | Palabra |
|---|---|
| Tengo 1 | **pegada** |
| Tengo 0 | **falta** / **me falta** |
| Tengo 2+ | **sobran** N (las copias extra son "para cambiar") |
| Filtro de figuritas que repito | **REPITO** |

No usar "owned / missing / duplicates" en la UI — solo en el código si querés.

---

## Decisiones de diseño tomadas

- **Single-player friendly**: la app funciona aunque seas el único en el grupo (te muestra tu progreso y faltantes).
- **Sin foto real de la figurita**: solo número grande + nombre. El número ES la identidad visual.
- **+/− mejor que tap-to-toggle**: porque las repetidas son el centro de la app.
- **Secciones colapsables por default cuando estás "completo"**: para que el scroll se concentre en lo que falta.

---

## Próximas features (post-MVP)

1. **Notificaciones** cuando aparece un match nuevo (alguien del grupo pegó algo que vos tenías de sobrante).
2. **Historial de intercambios** — registrar "cambié X con Y" para que la app baje el count automáticamente.
3. **Agrupar matches por confederación** (CONMEBOL, UEFA, etc.) si la lista de países se hace larga.
4. **Importar lista** desde texto pegado (ej: "1, 4, 12-15, 200") para onboarding rápido.
5. **Modo grupo público** con leaderboard de quién tiene el álbum más completo.

---

## Tono y copy

Argentino, informal pero no forzado. Evitar tecnicismos. Ejemplos de copy del prototipo:
- "Me faltan", "Para cambiar", "Sobran"
- "Pegá una figurita" en vez de "Add sticker"
- "Cambios posibles con [Nombre]" en la pantalla de matches
