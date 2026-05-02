'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

const stagger = (i: number, base = 0.8) => ({
  initial:    { opacity: 0, y: 40 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: base + i * 0.12 },
});

export default function Hero() {
  const { lang, isArabic } = useLang();
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const roles = t.hero.roles[lang];
    let roleIdx = 0, charIdx = 0, deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const type = () => {
      const word = roles[roleIdx];
      if (!deleting) {
        el.textContent = word.slice(0, ++charIdx);
        if (charIdx === word.length) {
          deleting = true;
          timer = setTimeout(type, 2000);
          return;
        }
      } else {
        el.textContent = word.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
      }
      timer = setTimeout(type, deleting ? 40 : 80);
    };

    // Reset and restart when language changes
    el.textContent = '';
    timer = setTimeout(type, 400);
    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <section
      id="hero"
      style={{
        minHeight:      '100svh',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'flex-end',
        padding:        'var(--space-16) var(--space-8)',
        position:       'relative',
        overflow:       'hidden',
      }}
    >
      {/* Background grid */}
      <div style={{
        position:        'absolute',
        inset:           0,
        backgroundImage: `
          linear-gradient(var(--color-border) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        opacity:        0.25,
        zIndex:         0,
      }} />

      {/* Radial vignette */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'radial-gradient(ellipse 80% 60% at 20% 80%, rgba(201,185,154,0.06) 0%, transparent 70%)',
        zIndex:     0,
      }} />

      {/* Top-right location label */}
      <motion.p
        {...stagger(0, 0.4)}
        style={{
          position:      'absolute',
          top:           'calc(var(--navbar-h) + var(--space-8))',
          right:         'var(--space-8)',
          fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
          fontSize:      'var(--text-xs)',
          color:         'var(--color-muted)',
          letterSpacing: isArabic ? '0' : '0.1em',
          textTransform: 'uppercase',
          zIndex:        1,
        }}
      >
        {t.hero.location[lang]}
      </motion.p>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Eyebrow */}
        <motion.p
          {...stagger(0)}
          style={{
            fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
            fontSize:      'var(--text-xs)',
            color:         'var(--color-accent)',
            letterSpacing: isArabic ? '0.05em' : '0.2em',
            textTransform: 'uppercase',
            marginBottom:  'var(--space-4)',
          }}
        >
          {t.hero.label[lang]}
        </motion.p>

        {/* Name — always in display font, never translated */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{    y: '100%' }}
            animate={{    y: '0%'   }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.85 }}
            style={{
              fontFamily:  'var(--font-display)',
              fontSize:    'var(--text-hero)',
              fontWeight:  300,
              lineHeight:  1,
              color:       'var(--color-text)',
              whiteSpace:  'nowrap',
            }}
          >
            Fatimah Nazar
          </motion.h1>
        </div>

        {/* Divider + Typewriter */}
        <motion.div
          {...stagger(2)}
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        'var(--space-4)',
            margin:     'var(--space-6) 0',
          }}
        >
          <span style={{
            display:         'block',
            width:           '40px',
            height:          '1px',
            backgroundColor: 'var(--color-accent)',
            flexShrink:      0,
          }} />
          <p style={{
            fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-body)',
            fontSize:      'var(--text-lg)',
            color:         'var(--color-text-dim)',
            fontWeight:    300,
            letterSpacing: isArabic ? '0' : '0.05em',
            direction:     isArabic ? 'rtl' : 'ltr',
          }}>
            <span ref={lineRef} />
            <span style={{
              display:         'inline-block',
              width:           '2px',
              height:          '1em',
              backgroundColor: 'var(--color-accent)',
              marginLeft:      '2px',
              verticalAlign:   'middle',
              animation:       'blink 1s step-end infinite',
            }} />
          </p>
        </motion.div>

        {/* Bio */}
        <motion.p
          {...stagger(3)}
          style={{
            maxWidth:   '480px',
            fontSize:   'var(--text-base)',
            lineHeight: isArabic ? 1.9 : 1.7,
            color:      'var(--color-subtle)',
            fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-body)',
          }}
        >
          {t.hero.bio[lang]}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...stagger(4)}
          style={{
            display:   'flex',
            gap:       'var(--space-4)',
            marginTop: 'var(--space-8)',
            flexWrap:  'wrap',
          }}
        >
          <a
            href="#work"
            style={{
              display:         'inline-flex',
              alignItems:      'center',
              gap:             'var(--space-2)',
              padding:         '12px 28px',
              backgroundColor: 'var(--color-accent)',
              color:           'var(--color-bg)',
              fontFamily:      isArabic ? 'var(--font-arabic)' : 'var(--font-body)',
              fontSize:        'var(--text-sm)',
              fontWeight:      400,
              letterSpacing:   isArabic ? '0' : '0.06em',
              textTransform:   'uppercase',
              borderRadius:    'var(--radius-sm)',
              transition:      'opacity 250ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            {t.hero.cta1[lang]}
          </a>
          <a
            href="#contact"
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           'var(--space-2)',
              padding:       '12px 28px',
              border:        '1px solid var(--color-border)',
              color:         'var(--color-text-dim)',
              fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-body)',
              fontSize:      'var(--text-sm)',
              fontWeight:    300,
              letterSpacing: isArabic ? '0' : '0.06em',
              textTransform: 'uppercase',
              borderRadius:  'var(--radius-sm)',
              transition:    'border-color 250ms, color 250ms',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.color       = 'var(--color-text)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.color       = 'var(--color-text-dim)';
            }}
          >
            {t.hero.cta2[lang]}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        {...stagger(5)}
        style={{
          position:   'absolute',
          bottom:     'var(--space-8)',
          right:      'var(--space-8)',
          display:    'flex',
          alignItems: 'center',
          gap:        'var(--space-3)',
          zIndex:     1,
        }}
      >
        <span style={{
          fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
          fontSize:      'var(--text-xs)',
          color:         'var(--color-muted)',
          letterSpacing: isArabic ? '0' : '0.1em',
          textTransform: 'uppercase',
          writingMode:   'vertical-rl',
        }}>
          {t.hero.scroll[lang]}
        </span>
        <div style={{
          width:           '1px',
          height:          '60px',
          backgroundColor: 'var(--color-border)',
          position:        'relative',
          overflow:        'hidden',
        }}>
          <motion.div
            style={{
              position:        'absolute',
              top:             0,
              width:           '100%',
              height:          '30px',
              backgroundColor: 'var(--color-accent)',
            }}
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
}