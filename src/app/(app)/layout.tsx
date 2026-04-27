import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { CollectionProvider } from '@/lib/store';
import BottomNav from '@/components/BottomNav';
import { T, GRAIN } from '@/lib/tokens';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: membership } = await supabase
    .from('group_members')
    .select('group_id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!membership) redirect('/grupo');

  return (
    <CollectionProvider userId={user.id} groupId={membership.group_id}>
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
