import LoginScreen from '@/components/login/LoginScreen';

export default function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <LoginScreen />
    </div>
  );
}
