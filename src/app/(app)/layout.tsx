import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { CollectionProvider, GuestCollectionProvider } from '@/lib/store';
import BottomNav from '@/components/BottomNav';
import { T, GRAIN } from '@/lib/tokens';

const GENERAL_GROUP_ID = '00000000-0000-0000-0000-000000000001';

const shell = (children: React.ReactNode) => (
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
);

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const guestName = cookieStore.get('album_guest')?.value;

  if (guestName) {
    return (
      <GuestCollectionProvider displayName={decodeURIComponent(guestName)}>
        {shell(children)}
      </GuestCollectionProvider>
    );
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', user.id)
    .single();

  let { data: membership } = await supabase
    .from('group_members')
    .select('group_id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!membership) {
    await supabase
      .from('group_members')
      .insert({ group_id: GENERAL_GROUP_ID, user_id: user.id });
    membership = { group_id: GENERAL_GROUP_ID };
  }

  return (
    <CollectionProvider userId={user.id} groupId={membership.group_id} displayName={profile?.display_name ?? user.email?.split('@')[0] ?? 'Vos'}>
      {shell(children)}
    </CollectionProvider>
  );
}
