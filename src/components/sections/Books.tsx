'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

export default function Books() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { lang, isArabic } = useLang();

  const fade = (delay: number) => ({
    initial:    { opacity: 0, y: 30 },
    animate:    inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
  });

  const books = t.books.books.map(b => ({
    ...b,
    title: b.title[lang],
    desc:  b.desc[lang],
  }));

  return (
    <section
      ref={ref}
      id="books"
      style={{
        minHeight:      '100vh',
        padding:        'var(--space-32) var(--space-8)',
        background:     'var(--color-bg)',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        position:       'relative',
        direction:      isArabic ? 'rtl' : 'ltr',
      }}
    >
      {/* Label */}
      <motion.p {...fade(0)} style={{
        fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
        fontSize:      'var(--text-xs)',
        color:         'var(--color-accent)',
        letterSpacing: isArabic ? '0' : '0.2em',
        textTransform: 'uppercase',
        marginBottom:  'var(--space-12)',
      }}>
        {t.books.label[lang]}
      </motion.p>

      {/* Heading */}
      <div style={{
  display:             'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
  gap:                 'var(--space-8)',
  alignItems:          'end',
  marginBottom:        'var(--space-12)',
}}>
        <motion.h2 {...fade(0.1)} style={{
          fontFamily:  isArabic ? 'var(--font-arabic)' : 'var(--font-display)',
          fontSize:    'var(--text-3xl)',
          fontWeight:  300,
          color:       'var(--color-text)',
          lineHeight:  1.2,
        }}>
          {t.books.heading1[lang]}<br />
          <em style={{ color: 'var(--color-accent)' }}>{t.books.heading2[lang]}</em><br />
          {t.books.heading3[lang]}
        </motion.h2>

        <motion.p {...fade(0.2)} style={{
          fontSize:   'var(--text-base)',
          color:      'var(--color-subtle)',
          lineHeight: isArabic ? 1.9 : 1.8,
          maxWidth:   '420px',
          fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-body)',
        }}>
          {t.books.desc[lang]}
        </motion.p>
      </div>

      {/* Book cards */}
      <div style={{
  display:             'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
  gap:                 'var(--space-6)',
}}>
        {books.map((book, i) => (
          <BookCard
            key={book.title}
            book={book}
            delay={0.25 + i * 0.12}
            inView={inView}
            isArabic={isArabic}
            lang={lang}
          />
        ))}
      </div>

      {/* Bottom divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.3 }}
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

function BookCard({
  book, delay, inView, isArabic, lang,
}: {
  book:     { title: string; author: string; desc: string; spine: string; cover: string };
  delay:    number;
  inView:   boolean;
  isArabic: boolean;
  lang:     'en' | 'ar';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay }}
      whileHover="hover"
      style={{
        display:      'flex',
        gap:          'var(--space-6)',
        padding:      'var(--space-8)',
        border:       '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        background:   'var(--color-surface)',
        position:     'relative',
        overflow:     'hidden',
        flexDirection: isArabic ? 'row-reverse' : 'row',
      }}
    >
      {/* Hover glow */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position:      'absolute',
          inset:         0,
          background:    'radial-gradient(ellipse 80% 60% at 0% 100%, rgba(201,185,154,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Book spine */}
      <motion.div
        variants={{ hover: { rotateY: -15, x: 4 } }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          flexShrink:    0,
          width:         '80px',
          height:        '120px',
          background:    book.cover,
          border:        '1px solid var(--color-border)',
          borderRadius:  '3px 6px 6px 3px',
          position:      'relative',
          display:       'flex',
          alignItems:    'center',
          justifyContent:'center',
          transformStyle:'preserve-3d',
          boxShadow:     '4px 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{
          position:    'absolute',
          left:        0, top: 0, bottom: 0,
          width:       '8px',
          background:  book.spine,
          borderRadius:'3px 0 0 3px',
          borderRight: '1px solid rgba(255,255,255,0.04)',
        }} />
        <div style={{
          writingMode:   'vertical-rl',
          transform:     'rotate(180deg)',
          fontFamily:    'var(--font-display)',
          fontSize:      '9px',
          color:         'var(--color-accent)',
          letterSpacing: '0.1em',
          opacity:       0.8,
          padding:       '0 var(--space-2)',
          textAlign:     'center',
        }}>
          {book.title}
        </div>
      </motion.div>

      {/* Content */}
      <div style={{
        flex:          1,
        display:       'flex',
        flexDirection: 'column',
        gap:           'var(--space-3)',
        position:      'relative',
        zIndex:        1,
        textAlign:     isArabic ? 'right' : 'left',
      }}>
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          flexDirection:  isArabic ? 'row-reverse' : 'row',
        }}>
          <span style={{
            fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
            fontSize:      'var(--text-xs)',
            color:         'var(--color-accent)',
            letterSpacing: isArabic ? '0' : '0.1em',
            textTransform: 'uppercase',
          }}>{t.books.role[lang]}</span>
        </div>

        <h3 style={{
          fontFamily:  isArabic ? 'var(--font-arabic)' : 'var(--font-display)',
          fontSize:    'var(--text-xl)',
          fontWeight:  300,
          color:       'var(--color-text)',
          lineHeight:  1.2,
        }}>{book.title}</h3>

        <p style={{
          fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
          fontSize:      'var(--text-xs)',
          color:         'var(--color-muted)',
          letterSpacing: '0.05em',
        }}>by {book.author}</p>

        <p style={{
          fontSize:   'var(--text-sm)',
          color:      'var(--color-subtle)',
          lineHeight: isArabic ? 1.9 : 1.7,
          flex:       1,
          fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-body)',
        }}>{book.desc}</p>

        <div style={{
          display:        'flex',
          alignItems:     'center',
          gap:            'var(--space-2)',
          marginTop:      'var(--space-2)',
          flexDirection:  isArabic ? 'row-reverse' : 'row',
        }}>
          <span style={{
            display:         'block',
            width:           '16px',
            height:          '1px',
            backgroundColor: 'var(--color-accent)',
          }} />
          <span style={{
            fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
            fontSize:      'var(--text-xs)',
            color:         'var(--color-muted)',
            letterSpacing: '0.08em',
          }}>{t.books.publisher[lang]}</span>
        </div>
      </div>
    </motion.div>
  );
}