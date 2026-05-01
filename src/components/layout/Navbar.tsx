'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/lib/translations';



export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { lang, toggleLang, isArabic } = useLang();

  const navLinks = [
  { label: t.nav.work[lang],     href: '#work'      },
  { label: t.nav.about[lang],    href: '#about'     },
  { label: t.nav.books[lang],    href: '#books'     },
  { label: t.nav.contact[lang],  href: '#contact'   },
];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.6 }}
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          right:           0,
          height:          'var(--navbar-h)',
          zIndex:          100,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          padding:         '0 var(--space-8)',
          borderBottom:    scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          backgroundColor: scrolled ? 'rgba(14,14,14,0.85)' : 'transparent',
          backdropFilter:  scrolled ? 'blur(12px)' : 'none',
          transition:      'background-color 500ms, border-color 500ms, backdrop-filter 500ms',
        }}
      >
        {/* Logo / Name */}
        <a href="/" style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'var(--text-lg)',
          fontWeight:    300,
          letterSpacing: '0.05em',
          color:         'var(--color-text)',
        }}>
          Fatimah<span style={{ color: 'var(--color-accent)' }}>.</span>
        </a>

        {/* Desktop Nav */}
        <nav style={{
          display:   'flex',
          gap:       'var(--space-8)',
          alignItems:'center',
        }}
          className="hidden-mobile"
        >
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ delay: 1.8 + i * 0.07, duration: 0.5 }}
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      'var(--text-sm)',
                fontWeight:    300,
                color:         'var(--color-subtle)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition:    'color 250ms',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-subtle)')}
            >
              {link.label}
            </motion.a>
          ))}

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            style={{
              display:       'flex',
              alignItems:    'center',
              gap:           '6px',
              padding:       '4px 12px',
              border:        '1px solid var(--color-border)',
              borderRadius:  '100px',
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-xs)',
              color:         'var(--color-subtle)',
              letterSpacing: '0.05em',
            }}
          >
            <span style={{
              width:           '6px',
              height:          '6px',
              borderRadius:    '50%',
              backgroundColor: '#4ade80',
              boxShadow:       '0 0 6px #4ade80',
              display:         'inline-block',
              animation:       'pulse 2s infinite',
            }} />
            Available
          </motion.div>

          {/* Language toggle */}
<motion.button
  onClick={toggleLang}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 2.3 }}
  style={{
    display:       'flex',
    alignItems:    'center',
    gap:           '6px',
    padding:       '4px 14px',
    border:        '1px solid var(--color-border)',
    borderRadius:  '100px',
    background:    isArabic ? 'var(--color-accent)' : 'transparent',
    fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
    fontSize:      'var(--text-xs)',
    color:         isArabic ? 'var(--color-bg)' : 'var(--color-subtle)',
    letterSpacing: '0.05em',
    transition:    'background 300ms, color 300ms, border-color 300ms',
    cursor:        'pointer',
  }}
>
  {isArabic ? 'EN' : 'ع'}
</motion.button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display:         'none',
            flexDirection:   'column',
            gap:             '5px',
            background:      'none',
            border:          'none',
            padding:         'var(--space-2)',
          }}
          className="show-mobile"
          aria-label="Toggle menu"
        >
          <span style={{
            display:         'block',
            width:           '22px',
            height:          '1px',
            backgroundColor: 'var(--color-text)',
            transition:      'transform 300ms, opacity 300ms',
            transform:       menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            display:         'block',
            width:           '22px',
            height:          '1px',
            backgroundColor: 'var(--color-text)',
            opacity:         menuOpen ? 0 : 1,
            transition:      'opacity 300ms',
          }} />
          <span style={{
            display:         'block',
            width:           '22px',
            height:          '1px',
            backgroundColor: 'var(--color-text)',
            transition:      'transform 300ms',
            transform:       menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
          }} />
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0   }}
            exit={{    opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              position:        'fixed',
              top:             'var(--navbar-h)',
              left:            0,
              right:           0,
              bottom:          0,
              backgroundColor: 'rgba(14,14,14,0.97)',
              backdropFilter:  'blur(20px)',
              zIndex:          99,
              display:         'flex',
              flexDirection:   'column',
              alignItems:      'center',
              justifyContent:  'center',
              gap:             'var(--space-8)',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ delay: i * 0.07 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize:   'var(--text-2xl)',
                  fontWeight: 300,
                  color:      'var(--color-text)',
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse keyframe */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </>
  );
}