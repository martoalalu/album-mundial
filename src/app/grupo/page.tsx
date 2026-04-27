import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import GrupoScreen from '@/components/grupo/GrupoScreen';

export default async function GrupoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Si ya está en un grupo, ir directo al álbum
  const { data: membership } = await supabase
    .from('group_members')
    .select('group_id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (membership) redirect('/album');

  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <GrupoScreen userId={user.id} />
    </div>
  );
}
