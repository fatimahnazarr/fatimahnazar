'use client';

import { useAuth } from '@/context/AuthContext';
import LoginPage   from './LoginPage';
import Dashboard   from './Dashboard';

export default function DashboardGate() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight:      '100vh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        background:     'var(--color-bg)',
      }}>
        <div style={{
          width:        '32px',
          height:       '32px',
          border:       '1px solid var(--color-border)',
          borderTop:    '1px solid var(--color-accent)',
          borderRadius: '50%',
          animation:    'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return user ? <Dashboard /> : <LoginPage />;
}