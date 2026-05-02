'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

export default function About() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { lang, isArabic } = useLang();

  const fade = (delay: number) => ({
  initial:    { opacity: 0, y: 30 },
  animate:    inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
});

  const stats = t.about.stats.map(s => ({ value: s.value, label: s[lang] }));
  const skills = t.about.skills.map(g => ({ category: g[lang], items: g.items[lang] }));

  return (
    <section
      ref={ref}
      id="about"
      style={{
        minHeight:  '100vh',
        padding:    'var(--space-32) var(--space-8)',
        background: 'var(--color-bg)',
        position:   'relative',
        direction:  isArabic ? 'rtl' : 'ltr',
      }}
    >
      {/* Section label */}
      <motion.p {...fade(0)} style={{
        fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
        fontSize:      'var(--text-xs)',
        color:         'var(--color-accent)',
        letterSpacing: isArabic ? '0' : '0.2em',
        textTransform: 'uppercase',
        marginBottom:  'var(--space-12)',
      }}>
        {t.about.label[lang]}
      </motion.p>

      {/* Top grid */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: '1fr 1fr',
        gap:                 'var(--space-16)',
        marginBottom:        'var(--space-24)',
        alignItems:          'start',
      }}>
        {/* Bio */}
        <div>
          <motion.h2 {...fade(0.1)} style={{
            fontFamily:   isArabic ? 'var(--font-arabic)' : 'var(--font-display)',
            fontSize:     'var(--text-3xl)',
            fontWeight:   300,
            color:        'var(--color-text)',
            lineHeight:   1.2,
            marginBottom: 'var(--space-8)',
          }}>
            {t.about.heading1[lang]}<br />
            <em style={{ color: 'var(--color-accent)' }}>{t.about.heading2[lang]}</em><br />
            {t.about.heading3[lang]}
          </motion.h2>

          <motion.p {...fade(0.2)} style={{
            fontSize:     'var(--text-base)',
            color:        'var(--color-subtle)',
            lineHeight:   isArabic ? 1.9 : 1.8,
            marginBottom: 'var(--space-4)',
            fontFamily:   isArabic ? 'var(--font-arabic)' : 'var(--font-body)',
          }}>
            {t.about.bio1[lang]}
          </motion.p>

          <motion.p {...fade(0.25)} style={{
            fontSize:   'var(--text-base)',
            color:      'var(--color-subtle)',
            lineHeight: isArabic ? 1.9 : 1.8,
            fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-body)',
          }}>
            {t.about.bio2[lang]}
          </motion.p>
        </div>

        {/* Stats */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 '1px',
          background:          'var(--color-border)',
          border:              '1px solid var(--color-border)',
          borderRadius:        'var(--radius-md)',
          overflow:            'hidden',
        }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...fade(0.15 + i * 0.08)}
              style={{
                padding:       'var(--space-8)',
                background:    'var(--color-surface)',
                display:       'flex',
                flexDirection: 'column',
                gap:           'var(--space-2)',
                textAlign:     isArabic ? 'right' : 'left',
              }}
            >
              <span style={{
                fontFamily:  'var(--font-display)',
                fontSize:    'var(--text-2xl)',
                fontWeight:  300,
                color:       'var(--color-accent)',
                lineHeight:  1,
              }}>{stat.value}</span>
              <span style={{
                fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
                fontSize:      'var(--text-xs)',
                color:         'var(--color-muted)',
                letterSpacing: isArabic ? '0' : '0.08em',
                textTransform: 'uppercase',
              }}>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <motion.p {...fade(0.3)} style={{
          fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
          fontSize:      'var(--text-xs)',
          color:         'var(--color-muted)',
          letterSpacing: isArabic ? '0' : '0.15em',
          textTransform: 'uppercase',
          marginBottom:  'var(--space-8)',
        }}>
          {t.about.capabilitiesLabel[lang]}
        </motion.p>

        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap:                 'var(--space-4)',
        }}>
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              {...fade(0.35 + i * 0.08)}
              style={{
                padding:      'var(--space-6)',
                border:       '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                background:   'var(--color-surface)',
                textAlign:    isArabic ? 'right' : 'left',
              }}
            >
              <p style={{
                fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
                fontSize:      'var(--text-xs)',
                color:         'var(--color-accent)',
                letterSpacing: isArabic ? '0' : '0.1em',
                textTransform: 'uppercase',
                marginBottom:  'var(--space-4)',
              }}>{group.category}</p>

              <div style={{
                display:        'flex',
                flexWrap:       'wrap',
                gap:            'var(--space-2)',
                justifyContent: isArabic ? 'flex-end' : 'flex-start',
              }}>
                {group.items.map(item => (
                  <span key={item} style={{
                    fontFamily:  isArabic ? 'var(--font-arabic)' : 'var(--font-body)',
                    fontSize:    'var(--text-sm)',
                    color:       'var(--color-text-dim)',
                    fontWeight:  300,
                    padding:     '4px 10px',
                    border:      '1px solid var(--color-border)',
                    borderRadius:'var(--radius-sm)',
                  }}>{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{
          position:        'absolute',
          bottom:          0,
          left:            'var(--space-8)',
          right:           'var(--space-8)',
          height:          '1px',
          background:      'var(--color-border)',
          transformOrigin: isArabic ? 'right' : 'left',
        }}
      />
    </section>
  );
}