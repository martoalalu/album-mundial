import { CollectionProvider } from '@/lib/store';
import BottomNav from '@/components/BottomNav';
import { T, GRAIN } from '@/lib/tokens';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <CollectionProvider>
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        background: T.bg, backgroundImage: GRAIN,
        fontFamily: T.font, color: T.ink,
        WebkitFontSmoothing: 'antialiased',
      }}>
        <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
        <BottomNav />
      </div>
    </CollectionProvider>
  );
}
