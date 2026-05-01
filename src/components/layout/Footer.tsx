'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

export default function Footer() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { lang, isArabic } = useLang();

  return (
    <footer
      ref={ref}
      style={{
        padding:   'var(--space-12) var(--space-8)',
        borderTop: '1px solid var(--color-border)',
        background:'var(--color-bg)',
        direction: isArabic ? 'rtl' : 'ltr',
      }}
    >
      <div style={{
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center',
        flexWrap:       'wrap',
        gap:            'var(--space-4)',
        flexDirection:  isArabic ? 'row-reverse' : 'row',
      }}>

        {/* Name */}
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'var(--text-lg)',
            fontWeight:    300,
            color:         'var(--color-text)',
            letterSpacing: '0.05em',
          }}
        >
          Fatimah<span style={{ color: 'var(--color-accent)' }}>.</span>
        </motion.a>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
            fontSize:      'var(--text-xs)',
            color:         'var(--color-muted)',
            letterSpacing: isArabic ? '0' : '0.08em',
          }}
        >
          {t.footer.rights[lang]}
        </motion.p>

        {/* Back to top */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            display:       'flex',
            alignItems:    'center',
            gap:           'var(--space-2)',
            background:    'none',
            border:        '1px solid var(--color-border)',
            borderRadius:  'var(--radius-sm)',
            padding:       '8px 16px',
            fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
            fontSize:      'var(--text-xs)',
            color:         'var(--color-muted)',
            letterSpacing: isArabic ? '0' : '0.08em',
            textTransform: 'uppercase',
            transition:    'border-color 250ms, color 250ms',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--color-accent)';
            e.currentTarget.style.color       = 'var(--color-accent)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--color-border)';
            e.currentTarget.style.color       = 'var(--color-muted)';
          }}
        >
          {t.footer.backTop[lang]}
        </motion.button>
      </div>
    </footer>
  );
}