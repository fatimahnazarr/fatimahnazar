'use client';

import { useState } from 'react';
import { motion }   from 'framer-motion';
import { useAuth }  from '@/context/AuthContext';

export default function LoginPage() {
  const { login }                      = useAuth();
  const [email,    setEmail]           = useState('');
  const [password, setPassword]        = useState('');
  const [error,    setError]           = useState('');
  const [loading,  setLoading]         = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width:        '100%',
    background:   'var(--color-surface)',
    border:       '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    padding:      '14px 16px',
    fontFamily:   'var(--font-body)',
    fontSize:     'var(--text-sm)',
    color:        'var(--color-text)',
    outline:      'none',
    transition:   'border-color 250ms',
  } as React.CSSProperties;

  return (
    <div style={{
      minHeight:      '100vh',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      background:     'var(--color-bg)',
      padding:        'var(--space-8)',
      position:       'relative',
      overflow:       'hidden',
    }}>
      <div style={{
        position:        'absolute',
        inset:           0,
        backgroundImage: `
          linear-gradient(var(--color-border) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        opacity:        0.15,
        zIndex:         0,
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}
      >
        <div style={{ marginBottom: 'var(--space-10)', textAlign: 'center' }}>
          <p style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'var(--text-lg)',
            fontWeight:    300,
            color:         'var(--color-text)',
            letterSpacing: '0.05em',
            marginBottom:  'var(--space-2)',
          }}>
            Fatimah<span style={{ color: 'var(--color-accent)' }}>.</span>
          </p>
          <p style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-xs)',
            color:         'var(--color-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>Dashboard Access</p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display:       'flex',
            flexDirection: 'column',
            gap:           'var(--space-4)',
            padding:       'var(--space-8)',
            border:        '1px solid var(--color-border)',
            borderRadius:  'var(--radius-lg)',
            background:    'var(--color-surface)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <label style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-xs)',
              color:         'var(--color-muted)',
              letterSpacing: '0.08em',
            }}>Email</label>
            <input
              type="email" required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
              onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <label style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-xs)',
              color:         'var(--color-muted)',
              letterSpacing: '0.08em',
            }}>Password</label>
            <input
              type="password" required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
              onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')}
            />
          </div>

          {error && (
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize:   'var(--text-xs)',
              color:      '#f87171',
              textAlign:  'center',
            }}>{error}</p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ opacity: 0.88 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding:         '14px',
              backgroundColor: 'var(--color-accent)',
              color:           'var(--color-bg)',
              fontFamily:      'var(--font-body)',
              fontSize:        'var(--text-sm)',
              fontWeight:      400,
              letterSpacing:   '0.08em',
              textTransform:   'uppercase',
              border:          'none',
              borderRadius:    'var(--radius-sm)',
              marginTop:       'var(--space-2)',
              opacity:         loading ? 0.7 : 1,
              cursor:          'pointer',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}