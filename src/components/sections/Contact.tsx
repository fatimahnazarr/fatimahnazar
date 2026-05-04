'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/lib/translations';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
type FormState = 'idle' | 'loading' | 'success' | 'error';

const socials = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/fatimah-nazar',  handle: '@fatimah-nazar' },
  { label: 'Instagram', href: 'https://www.instagram.com/fatimahnazarr?igsh=MTd6cmJ1Nzc3M2d1dg==',     handle: '@fatimahnazar'  },
  { label: 'GitHub',    href: 'https://github.com/fatimahnazar',            handle: '@fatimahnazar'  },
  { label: 'Behance',   href: 'https://www.behance.net/fatimahnazar',       handle: '@fatimahnazar'  },
];

export default function Contact() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { lang, isArabic } = useLang();

  const [form, setForm]   = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState<FormState>('idle');

  const fade = (delay: number) => ({
    initial:    { opacity: 0, y: 30 },
    animate:    inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setState('loading');
  try {
    await addDoc(collection(db, 'messages'), {
      name:      form.name,
      email:     form.email,
      message:   form.message,
      read:      false,
      createdAt: serverTimestamp(),
    });
    setState('success');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setState('idle'), 4000);
  } catch (err) {
    console.error(err);
    setState('error');
  }
};

  const inputStyle = {
    width:        '100%',
    background:   'var(--color-surface)',
    border:       '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    padding:      '14px 16px',
    fontFamily:   isArabic ? 'var(--font-arabic)' : 'var(--font-body)',
    fontSize:     'var(--text-sm)',
    color:        'var(--color-text)',
    outline:      'none',
    transition:   'border-color 250ms',
    direction:    isArabic ? 'rtl' : 'ltr',
    textAlign:    isArabic ? 'right' : 'left',
  } as React.CSSProperties;

  return (
    <section
      ref={ref}
      id="contact"
      style={{
        minHeight:      '100vh',
        padding:        'var(--space-32) var(--space-8)',
        background:     'var(--color-bg)',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
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
        {t.contact.label[lang]}
      </motion.p>

      <div style={{
  display:             'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
  gap:                 'var(--space-8)',
  alignItems:          'start',
}}>
        {/* Left — heading + socials */}
        <div>
          <motion.h2 {...fade(0.1)} style={{
            fontFamily:   isArabic ? 'var(--font-arabic)' : 'var(--font-display)',
            fontSize:     'var(--text-3xl)',
            fontWeight:   300,
            color:        'var(--color-text)',
            lineHeight:   1.2,
            marginBottom: 'var(--space-6)',
          }}>
            {t.contact.heading1[lang]}<br />
            <em style={{ color: 'var(--color-accent)' }}>{t.contact.heading2[lang]}</em>
          </motion.h2>

          <motion.p {...fade(0.2)} style={{
            fontSize:     'var(--text-base)',
            color:        'var(--color-subtle)',
            lineHeight:   isArabic ? 1.9 : 1.8,
            maxWidth:     '400px',
            marginBottom: 'var(--space-12)',
            fontFamily:   isArabic ? 'var(--font-arabic)' : 'var(--font-body)',
          }}>
            {t.contact.desc[lang]}
          </motion.p>

          {/* Socials */}
          <motion.div {...fade(0.25)} style={{
            display:      'flex',
            flexDirection:'column',
            gap:          '1px',
            background:   'var(--color-border)',
            border:       '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            overflow:     'hidden',
          }}>
            {socials.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.3 + i * 0.07 }}
                whileHover={{ backgroundColor: 'rgba(201,185,154,0.05)' }}
                style={{
                  display:        'flex',
                  justifyContent: 'space-between',
                  alignItems:     'center',
                  padding:        'var(--space-4) var(--space-6)',
                  background:     'var(--color-surface)',
                  flexDirection:  isArabic ? 'row-reverse' : 'row',
                  transition:     'background 250ms',
                }}
              >
                <span style={{
                  fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-body)',
                  fontSize:      'var(--text-sm)',
                  color:         'var(--color-text-dim)',
                  fontWeight:    300,
                }}>{social.label}</span>
                <div style={{
                  display:       'flex',
                  alignItems:    'center',
                  gap:           'var(--space-3)',
                  flexDirection: isArabic ? 'row-reverse' : 'row',
                }}>
                  <span style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      'var(--text-xs)',
                    color:         'var(--color-muted)',
                    letterSpacing: '0.05em',
                  }}>{social.handle}</span>
                  <span style={{ color: 'var(--color-accent)', fontSize: 'var(--text-sm)' }}>
                    {isArabic ? '↗' : '↗'}
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right — form */}
        <motion.form
          {...fade(0.15)}
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
          <p style={{
            fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
            fontSize:      'var(--text-xs)',
            color:         'var(--color-muted)',
            letterSpacing: isArabic ? '0' : '0.1em',
            textTransform: 'uppercase',
            marginBottom:  'var(--space-2)',
            textAlign:     isArabic ? 'right' : 'left',
          }}>{t.contact.formTitle[lang]}</p>

          {/* Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <label style={{
              fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
              fontSize:      'var(--text-xs)',
              color:         'var(--color-muted)',
              letterSpacing: isArabic ? '0' : '0.08em',
              textAlign:     isArabic ? 'right' : 'left',
            }}>{t.contact.name[lang]}</label>
            <input
              type="text" required
              placeholder={t.contact.namePH[lang]}
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
              onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')}
            />
          </div>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <label style={{
              fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
              fontSize:      'var(--text-xs)',
              color:         'var(--color-muted)',
              letterSpacing: isArabic ? '0' : '0.08em',
              textAlign:     isArabic ? 'right' : 'left',
            }}>{t.contact.email[lang]}</label>
            <input
              type="email" required
              placeholder={t.contact.emailPH[lang]}
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
              onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')}
            />
          </div>

          {/* Message */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <label style={{
              fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
              fontSize:      'var(--text-xs)',
              color:         'var(--color-muted)',
              letterSpacing: isArabic ? '0' : '0.08em',
              textAlign:     isArabic ? 'right' : 'left',
            }}>{t.contact.message[lang]}</label>
            <textarea
              required rows={5}
              placeholder={t.contact.messagePH[lang]}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              style={{ ...inputStyle, resize: 'none', lineHeight: 1.7 }}
              onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
              onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')}
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={state === 'loading' || state === 'success'}
            whileHover={{ opacity: 0.88 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding:         '14px 28px',
              backgroundColor: state === 'success' ? '#4ade80' : 'var(--color-accent)',
              color:           'var(--color-bg)',
              fontFamily:      isArabic ? 'var(--font-arabic)' : 'var(--font-body)',
              fontSize:        'var(--text-sm)',
              fontWeight:      400,
              letterSpacing:   isArabic ? '0' : '0.08em',
              textTransform:   'uppercase',
              border:          'none',
              borderRadius:    'var(--radius-sm)',
              transition:      'background-color 400ms',
              marginTop:       'var(--space-2)',
            }}
          >
            {state === 'loading' ? t.contact.sending[lang]
              : state === 'success' ? t.contact.sent[lang]
              : t.contact.send[lang]}
          </motion.button>

          {state === 'error' && (
            <p style={{
              fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
              fontSize:   'var(--text-xs)',
              color:      '#f87171',
              textAlign:  'center',
            }}>
              {t.contact.error[lang]}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}