# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this project is

A sticker album tracking & trading app for FIFA World Cup 2026. Users join groups, track their Panini sticker collection (980 stickers), and the app computes optimal trades between group members.

Stack: **Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui + Supabase**.

The `prototype/` folder contains the original HTML/JSX prototype — use it as reference for UI, copy, and logic. Do not modify it.

## Commands

```bash
npm run dev      # dev server (Turbopack)
npm run build    # production build
npm run lint     # ESLint
```

## Key files

| Path | Purpose |
|------|---------|
| `prototype/variant-b.jsx` | Reference UI: all 4 screens (Login, Álbum, Resumen, Matches) |
| `prototype/app-state.jsx` | Reference logic: computeStats, filterStickers, computeAllMatches |
| `prototype/data (1).jsx` | Reference data: 48 teams, 980 stickers, mock users |
| `V0_BRIEF.md` | Authoritative spec: Supabase schema, screen definitions, match algorithm, copy guidelines |
| `src/lib/stickers.ts` | Static sticker catalog (980 entries, never changes) |
| `src/lib/match.ts` | Match computation logic |

## Architecture decisions (don't re-imagine these)

- **Sticker ID = sticker number (1–980).** Collection is `{ [n]: count }` — key is number, value is quantity owned.
- **980 stickers:** 48 teams × 20 stickers/team (960) + 1 sección General × 20 = 980. Each team: Escudo + Foto grupal + Jugador 1–18.
- **Match logic:** A swap happens when I have count ≥ 2 (spare) AND they have count = 0, or vice versa. `swaps = min(figuritas I give, figuritas they give)`.
- **Sticker catalog is static** — lives in `lib/stickers.ts`, not in Supabase.
- **Match computation as Postgres RPC** — do not fetch all group members' full collections to the client.
- **No real player names** — placeholders: Escudo, Foto grupal, Jugador 1…Jugador 18.
- **Retro album aesthetic:** Kraft paper (`#EBE3D2`), burnt orange (`#D9531E`), Bricolage Grotesque + DM Mono fonts, 2px offset card shadows.
- **Copy tone:** Spanish, informal/Argentine register (see `V0_BRIEF.md`). Use: pegada / falta / sobran / REPITO.

## What NOT to do without checking

- Don't add Supabase until Phase 3 — Phase 2 uses localStorage.
- Don't change the sticker catalog structure (section names, counts) — it mirrors the physical Panini album.
- Don't modify anything inside `prototype/`.
- Don't install new dependencies without checking first.
