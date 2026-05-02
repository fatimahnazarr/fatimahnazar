'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Project } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

const sectionIcons: Record<string, string> = {
  problem:  '⊘',
  goal:     '◎',
  audience: '◈',
  solution: '◆',
  features: '◉',
  outcome:  '✦',
  process:  '◐',
  gallery:  '▣',
};


export default function CaseStudyClient({ project }: { project: Project }) {


  return (
    <main style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>

      {/* ── Back to Work ── */}
<div style={{
  margin:    'var(--space-8)',
  textAlign: 'center',
}}>
  <Link href="/#work">
    <motion.div
      whileHover={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
      style={{
        display:       'inline-flex',
        alignItems:    'center',
        gap:           'var(--space-2)',
        padding:       '12px 28px',
        border:        '1px solid var(--color-border)',
        borderRadius:  'var(--radius-sm)',
        fontFamily:    'var(--font-mono)',
        fontSize:      'var(--text-xs)',
        color:         'var(--color-muted)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        transition:    'all 250ms',
        cursor:        'pointer',
      }}
    >
      ← Back to Work
    </motion.div>
  </Link>
</div>

      {/* ── Coming Soon State ── */}
      {project.comingSoon ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            minHeight:      '100vh',
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            'var(--space-6)',
            padding:        'var(--space-8)',
            textAlign:      'center',
            position:       'relative',
            overflow:       'hidden',
          }}
        >
          {/* Grid bg */}
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

          {/* Glow */}
          <div style={{
            position:   'absolute',
            inset:      0,
            background: `radial-gradient(ellipse 50% 40% at 50% 60%, ${project.accent}10 0%, transparent 70%)`,
            zIndex:     0,
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                gap:            'var(--space-3)',
                marginBottom:   'var(--space-6)',
              }}
            >
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      'var(--text-xs)',
                color:         'var(--color-accent)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}>✦ &nbsp; Case Study</span>
              <span style={{
                width:    '1px',
                height:   '12px',
                background:'var(--color-border)',
                display:  'inline-block',
              }} />
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      'var(--text-xs)',
                color:         'var(--color-muted)',
                letterSpacing: '0.1em',
              }}>{project.year}</span>
            </motion.div>

            {/* Title */}
            <div style={{ overflow: 'hidden', marginBottom: 'var(--space-4)' }}>
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                style={{
                  fontFamily:  'var(--font-display)',
                  fontSize:    'clamp(2.5rem, 6vw, 6rem)',
                  fontWeight:  300,
                  color:       'var(--color-text)',
                  lineHeight:  1,
                }}
              >
                {project.title}
              </motion.h1>
            </div>

            {/* Arabic title */}
            {project.titleAr && (
              <div style={{ overflow: 'hidden', marginBottom: 'var(--space-6)' }}>
                <motion.p
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.62 }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize:   'clamp(1.2rem, 2.5vw, 2rem)',
                    fontWeight: 300,
                    fontStyle:  'italic',
                    color:      'var(--color-accent)',
                    direction:  'rtl',
                  }}
                >
                  {project.titleAr}
                </motion.p>
              </div>
            )}

            {/* Role tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ delay: 0.75 }}
              style={{
                display:        'flex',
                justifyContent: 'center',
                flexWrap:       'wrap',
                gap:            'var(--space-2)',
                marginBottom:   'var(--space-8)',
              }}
            >
              {(project.tags ?? []).map(tag => (
  <span key={tag} style={{
    fontFamily:    'var(--font-mono)',
    fontSize:      'var(--text-xs)',
    color:         'var(--color-muted)',
    border:        '1px solid var(--color-border)',
    borderRadius:  '100px',
    padding:       '3px 10px',
    letterSpacing: '0.05em',
  }}>{tag}</span>
))}
            </motion.div>

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1   }}
              transition={{ delay: 0.9 }}
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            'var(--space-3)',
                padding:        '10px 20px',
                border:         '1px solid var(--color-border)',
                borderRadius:   '100px',
                background:     'var(--color-surface)',
                marginBottom:   'var(--space-8)',
              }}
            >
              <span style={{
                width:           '7px',
                height:          '7px',
                borderRadius:    '50%',
                backgroundColor: 'var(--color-accent)',
                display:         'inline-block',
                animation:       'pulse 2s infinite',
              }} />
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      'var(--text-xs)',
                color:         'var(--color-muted)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>Case study in progress</span>
            </motion.div>

            {/* Overview */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ delay: 1 }}
              style={{
                fontFamily:   'var(--font-display)',
                fontSize:     'var(--text-xl)',
                fontWeight:   300,
                color:        'var(--color-text-dim)',
                lineHeight:   1.7,
                marginBottom: 'var(--space-10)',
              }}
            >
              {project.overview}
            </motion.p>

            {/* Back button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <Link href="/#work">
                <motion.div
                  whileHover={{
                    borderColor: 'var(--color-accent)',
                    color:       'var(--color-accent)',
                  }}
                  style={{
                    display:       'inline-flex',
                    alignItems:    'center',
                    gap:           'var(--space-2)',
                    padding:       '12px 28px',
                    border:        '1px solid var(--color-border)',
                    borderRadius:  'var(--radius-sm)',
                    fontFamily:    'var(--font-mono)',
                    fontSize:      'var(--text-xs)',
                    color:         'var(--color-muted)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    transition:    'border-color 250ms, color 250ms',
                  }}
                >
                  ← Back to Work
                </motion.div>
              </Link>
            </motion.div>
          </div>

          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(201,185,154,0.4); }
              50%       { opacity: 0.5; box-shadow: 0 0 0 4px rgba(201,185,154,0); }
            }
          `}</style>
        </motion.div>

      ) : (
        /* ── Full Case Study ── */
        <>
          {/* ── Hero ── */}
          <section style={{
            minHeight:      '100vh',
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'flex-end',
            padding:        'var(--space-32) var(--space-8) var(--space-16)',
            position:       'relative',
            overflow:       'hidden',
          }}>
            {/* Grid bg */}
            <div style={{
              position:        'absolute',
              inset:           0,
              backgroundImage: `
                linear-gradient(var(--color-border) 1px, transparent 1px),
                linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
              opacity:        0.2,
              zIndex:         0,
            }} />

            {/* Glow */}
            <div style={{
              position:   'absolute',
              inset:      0,
              background: `radial-gradient(ellipse 60% 50% at 10% 90%, ${project.accent}12 0%, transparent 70%)`,
              zIndex:     0,
            }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>

              {/* Project number + year */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          'var(--space-4)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                <span style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      'var(--text-xs)',
                  color:         'var(--color-accent)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}>✦ &nbsp; Case Study</span>
                <span style={{
                  width:      '1px',
                  height:     '12px',
                  background: 'var(--color-border)',
                  display:    'inline-block',
                }} />
                <span style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      'var(--text-xs)',
                  color:         'var(--color-muted)',
                  letterSpacing: '0.1em',
                }}>{project.year}</span>
                <span style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      'var(--text-xs)',
                  color:         'var(--color-muted)',
                  letterSpacing: '0.1em',
                }}>{project.year}</span>
              </motion.div>

              {/* Title */}
              <div style={{ overflow: 'hidden', marginBottom: 'var(--space-3)' }}>
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: '0%'   }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  style={{
                    fontFamily:  'var(--font-display)',
                    fontSize:    'clamp(3rem, 8vw, 8rem)',
                    fontWeight:  300,
                    color:       'var(--color-text)',
                    lineHeight:  1,
                  }}
                >
                  {project.title}
                </motion.h1>
              </div>

              {/* Arabic title */}
              {project.titleAr && (
                <div style={{ overflow: 'hidden', marginBottom: 'var(--space-8)' }}>
                  <motion.p
                    initial={{ y: '100%' }}
                    animate={{ y: '0%'   }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.52 }}
                    style={{
                      fontFamily:  'var(--font-display)',
                      fontSize:    'clamp(1.5rem, 3vw, 2.5rem)',
                      fontWeight:  300,
                      fontStyle:   'italic',
                      color:       'var(--color-accent)',
                      direction:   'rtl',
                    }}
                  >
                    {project.titleAr}
                  </motion.p>
                </div>
              )}

              {/* Role + tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ delay: 0.7, duration: 0.7 }}
                style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          'var(--space-4)',
                  flexWrap:     'wrap',
                  marginBottom: 'var(--space-8)',
                }}
              >
                <span style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      'var(--text-xs)',
                  color:         'var(--color-text-dim)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>{project.role}</span>
                <span style={{ color: 'var(--color-border)' }}>·</span>
                {project.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      'var(--text-xs)',
                    color:         'var(--color-muted)',
                    border:        '1px solid var(--color-border)',
                    borderRadius:  '100px',
                    padding:       '3px 10px',
                    letterSpacing: '0.05em',
                  }}>{tag}</span>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ delay: 0.85, duration: 0.7 }}
                style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}
              >
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    style={{
                      display:         'inline-flex',
                      alignItems:      'center',
                      gap:             'var(--space-2)',
                      padding:         '12px 28px',
                      backgroundColor: 'var(--color-accent)',
                      color:           'var(--color-bg)',
                      fontFamily:      'var(--font-body)',
                      fontSize:        'var(--text-sm)',
                      fontWeight:      400,
                      letterSpacing:   '0.06em',
                      textTransform:   'uppercase' as const,
                      borderRadius:    'var(--radius-sm)',
                      transition:      'opacity 250ms',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    View Live Site ↗
                  </a>
                )}
                {project.figmaUrl && (
                  <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer"
                    style={{
                      display:       'inline-flex',
                      alignItems:    'center',
                      gap:           'var(--space-2)',
                      padding:       '12px 28px',
                      border:        '1px solid var(--color-border)',
                      color:         'var(--color-text-dim)',
                      fontFamily:    'var(--font-body)',
                      fontSize:      'var(--text-sm)',
                      fontWeight:    300,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase' as const,
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
                    View on Figma ↗
                  </a>
                )}
              </motion.div>
            </div>
          </section>

          {/* ── Overview ── */}
          <FadeSection>
            <div style={{
              padding:   'var(--space-24) var(--space-8)',
              borderTop: '1px solid var(--color-border)',
              maxWidth:  '800px',
            }}>
              <p style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      'var(--text-xs)',
                color:         'var(--color-accent)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom:  'var(--space-6)',
              }}>Overview</p>
              <p style={{
                fontFamily:  'var(--font-display)',
                fontSize:    'var(--text-2xl)',
                fontWeight:  300,
                color:       'var(--color-text)',
                lineHeight:  1.5,
              }}>
                {project.overview}
              </p>
            </div>
          </FadeSection>

          {/* ── Case study sections ── */}
          {(project.sections ?? []).map((section, i) => (
            <CaseSection
              key={section.type}
              section={section}
              index={i}
              accent={project.accent}
              isMobile={project.slug === 'arab-professionals' || project.slug === 'kutubly'}
            />
          ))}

          {/* ── Divider ── */}
          <div style={{
            height:     '1px',
            background: 'var(--color-border)',
            margin:     '0 var(--space-8)',
          }} />

          <div style={{ height: 'var(--space-16)' }} />
        </>
      )}
    </main>
  );
}

/* ── Reusable fade wrapper ── */
function FadeSection({ children }: { children: React.ReactNode }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Individual case study section ── */
function CaseSection({
  section,
  index,
  accent,
  isMobile = false,
}: {
  section:   { type: string; title: string; content: string | string[]; images?: string[] };
  index:     number;
  accent:    string;
  isMobile?: boolean;
}) {
  if (section.type === 'gallery') {
    return <GallerySection section={section} accent={accent} isMobile={isMobile} />;
  }

  const isEven = index % 2 === 0;
  const icon   = sectionIcons[section.type] ?? '◆';
  const items  = Array.isArray(section.content) ? section.content : [section.content];

  return (
    <FadeSection>
      <div style={{
        padding:             'var(--space-16) var(--space-8)',
        borderTop:           '1px solid var(--color-border)',
        display:             'grid',
        gridTemplateColumns: '260px 1fr',
        gap:                 'var(--space-16)',
        alignItems:          'start',
        background:          isEven ? 'transparent' : 'rgba(22,22,22,0.4)',
      }}>
        <div>
          <div style={{
            display:      'flex',
            alignItems:   'center',
            gap:          'var(--space-3)',
            marginBottom: 'var(--space-2)',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize:   'var(--text-base)',
              color:      accent,
            }}>{icon}</span>
            <p style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-xs)',
              color:         'var(--color-accent)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>{section.title}</p>
          </div>
          <div style={{
            width:           '32px',
            height:          '1px',
            backgroundColor: 'var(--color-border)',
            marginTop:       'var(--space-3)',
          }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}
            >
              {items.length > 1 && (
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize:   'var(--text-xs)',
                  color:      'var(--color-accent)',
                  marginTop:  '4px',
                  flexShrink: 0,
                }}>0{i + 1}</span>
              )}
              <p style={{
                fontFamily:  'var(--font-display)',
                fontSize:    'var(--text-xl)',
                fontWeight:  300,
                color:       'var(--color-text)',
                lineHeight:  1.5,
              }}>{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeSection>
  );
}

/* ── Gallery section ── */
function GallerySection({
  section,
  accent,
  isMobile = false,
}: {
  section:   { title: string; content: string | string[]; images?: string[] };
  accent:    string;
  isMobile?: boolean;
}) {
  const [active, setActive] = useState(0);
  const images = section.images ?? [];
  const desc   = Array.isArray(section.content) ? section.content[0] : section.content;

  return (
    <FadeSection>
      <div style={{
        padding:   'var(--space-24) var(--space-8)',
        borderTop: '1px solid var(--color-border)',
        background:'rgba(12,12,12,0.6)',
      }}>
        <div style={{
          display:      'flex',
          alignItems:   'center',
          gap:          'var(--space-4)',
          marginBottom: 'var(--space-4)',
        }}>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-xs)',
            color:         accent,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>◉ &nbsp; {section.title}</span>
        </div>

        <p style={{
          fontFamily:   'var(--font-display)',
          fontSize:     'var(--text-xl)',
          fontWeight:   300,
          color:        'var(--color-text-dim)',
          lineHeight:   1.5,
          maxWidth:     '600px',
          marginBottom: 'var(--space-16)',
        }}>{desc}</p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>

          {isMobile ? (
            /* ── Phone mockup ── */
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position:     'relative',
                width:        '300px',
                height:       '620px',
                background:   '#1a1a1a',
                borderRadius: '44px',
              }}
            >
              {/* Phone shell */}
              <div style={{
                position:      'absolute',
                inset:         0,
                background:    'transparent',
                borderRadius:  '44px',
                border:        '2px solid #444',
                boxShadow:     '0 60px 120px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.06)',
                zIndex:        2,
                pointerEvents: 'none',
              }}>
                <div style={{
                  position:     'absolute',
                  top:          '14px',
                  left:         '50%',
                  transform:    'translateX(-50%)',
                  width:        '90px',
                  height:       '26px',
                  background:   '#000',
                  borderRadius: '20px',
                  zIndex:       3,
                }} />
                <div style={{ position: 'absolute', left: '-3px', top: '100px', width: '3px', height: '36px', background: '#333', borderRadius: '2px 0 0 2px' }} />
                <div style={{ position: 'absolute', left: '-3px', top: '150px', width: '3px', height: '64px', background: '#333', borderRadius: '2px 0 0 2px' }} />
                <div style={{ position: 'absolute', right: '-3px', top: '130px', width: '3px', height: '80px', background: '#333', borderRadius: '0 2px 2px 0' }} />
              </div>

              {/* Screen */}
              <div style={{
                position:     'absolute',
                top:          '8px',
                left:         '8px',
                right:        '8px',
                bottom:       '8px',
                borderRadius: '38px',
                overflow:     'hidden',
                background:   '#111',
                zIndex:       1,
              }}>
                {images.map((src, i) => (
                  <motion.div
                    key={src}
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.03 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ position: 'absolute', inset: 0, zIndex: 1 }}
                  >
                    <Image src={src} alt={`Screen ${i + 1}`} fill sizes="300px"
                      style={{ objectFit: 'cover', objectPosition: 'top' }} priority={i === 0} />
                  </motion.div>
                ))}
              </div>

              {/* Counter badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                style={{
                  position:     'absolute',
                  top:          '40px',
                  right:        '-80px',
                  background:   'var(--color-surface)',
                  border:       '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding:      'var(--space-3) var(--space-4)',
                  zIndex:       10,
                }}
              >
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>Screen</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 300, color: 'var(--color-text)', lineHeight: 1 }}>
                  {String(active + 1).padStart(2, '0')}
                  <span style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)' }}>/{String(images.length).padStart(2, '0')}</span>
                </p>
              </motion.div>
            </motion.div>

          ) : (
            /* ── Browser mockup ── */
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%', maxWidth: '1100px',
                background: '#1a1a1a', borderRadius: '12px',
                border: '1px solid var(--color-border)',
                overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
                position: 'relative',
              }}
            >
              <div style={{ background: '#222', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--color-border)' }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => (
                  <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.8 }} />
                ))}
                <div style={{ flex: 1, background: '#2a2a2a', borderRadius: '4px', padding: '4px 12px', marginLeft: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-muted)' }}>
                  dashboard.app
                </div>
              </div>

              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#111' }}>
                {images.map((src, i) => (
                  <motion.div key={src} initial={false}
                    animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.03 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <Image src={src} alt={`Screen ${i + 1}`} fill sizes="(max-width: 1100px) 100vw, 1100px"
                      style={{ objectFit: 'cover', objectPosition: 'top' }} priority={i === 0} />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.5 }}
                style={{ position: 'absolute', top: '60px', right: '-20px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4) var(--space-6)', zIndex: 10 }}
              >
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 'var(--space-1)' }}>Screen</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 300, color: 'var(--color-text)', lineHeight: 1 }}>
                  {String(active + 1).padStart(2, '0')}
                  <span style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)' }}>/{String(images.length).padStart(2, '0')}</span>
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Shared navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-6)', marginTop: 'var(--space-8)' }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setActive(a => Math.max(0, a - 1))} disabled={active === 0}
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: active === 0 ? 0.4 : 1, transition: 'opacity 200ms' }}
            >←</motion.button>

            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              {images.map((_, i) => (
                <motion.button key={i} onClick={() => setActive(i)}
                  animate={{ width: i === active ? '24px' : '6px', backgroundColor: i === active ? accent : 'var(--color-border)' }}
                  transition={{ duration: 0.3 }}
                  style={{ height: '6px', borderRadius: '3px', border: 'none', padding: 0 }}
                />
              ))}
            </div>

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setActive(a => Math.min(images.length - 1, a + 1))} disabled={active === images.length - 1}
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: active === images.length - 1 ? 0.4 : 1, transition: 'opacity 200ms' }}
            >→</motion.button>
          </div>

          {/* Thumbnails */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-4)', flexWrap: 'wrap' }}>
            {images.map((src, i) => (
              <motion.button key={src} onClick={() => setActive(i)} whileHover={{ scale: 1.05 }}
                animate={{ borderColor: i === active ? accent : 'var(--color-border)', opacity: i === active ? 1 : 0.5 }}
                transition={{ duration: 0.2 }}
                style={{ width: isMobile ? '44px' : '80px', height: isMobile ? '80px' : '50px', borderRadius: isMobile ? '10px' : 'var(--radius-sm)', border: '1px solid', overflow: 'hidden', position: 'relative', padding: 0, background: '#111', flexShrink: 0 }}
              >
                <Image src={src} alt={`Thumbnail ${i + 1}`} fill sizes={isMobile ? '44px' : '80px'}
                  style={{ objectFit: 'cover', objectPosition: 'top' }} />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </FadeSection>
  );
}