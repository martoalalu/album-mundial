'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { T } from '@/lib/tokens';

const TABS = [
  { href: '/album',   label: 'ÁLBUM' },
  { href: '/resumen', label: 'RESUMEN' },
  { href: '/matches', label: 'CAMBIAR' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav style={{
      height: 64, background: T.ink,
      display: 'flex', padding: 6, gap: 6,
      flexShrink: 0,
    }}>
      {TABS.map((t) => {
        const active = pathname === t.href;
        return (
          <Link key={t.href} href={t.href} style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: T.fontMono, fontSize: 11, fontWeight: 800, letterSpacing: '1.4px',
            textDecoration: 'none',
            borderRadius: 10,
            border: `1.5px solid ${active ? T.paper : 'transparent'}`,
            background: active ? T.accent : 'transparent',
            color: active ? '#fff' : 'rgba(255,255,255,.55)',
            transition: 'background .15s',
          }}>
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
