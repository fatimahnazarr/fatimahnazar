'use client';

import { useEffect, useRef, useState } from 'react';
import { motion }                      from 'framer-motion';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db }                          from '@/lib/firebase';
import { gsap, ScrollTrigger }         from '@/lib/gsap';
import Link                            from 'next/link';
import { useLang }                     from '@/context/LanguageContext';
import { t }                           from '@/lib/translations';
import type { Project }                from '@/lib/types';

export default function Work() {
  const sectionRef       = useRef<HTMLElement>(null);
  const trackRef         = useRef<HTMLDivElement>(null);
  const { lang, isArabic } = useLang();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading,  setLoading]  = useState(true);

  // Fetch visible projects from Firestore
  useEffect(() => {
    const q = query(
      collection(db, 'projects'),
      where('visible', '==', true),
      orderBy('order', 'asc'),
    );
    return onSnapshot(q, snap => {
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() } as Project)));
      setLoading(false);
    });
  }, []);

  // GSAP horizontal scroll
  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track || loading || projects.length === 0) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x:    isArabic ? totalScroll : -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger:       section,
          start:         'top top',
          end:           () => `+=${totalScroll}`,
          pin:           true,
          scrub:         1.2,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isArabic, loading, projects]);

  if (loading) {
    return (
      <section id="work" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
        <div style={{ width: '32px', height: '32px', border: '1px solid var(--color-border)', borderTop: '1px solid var(--color-accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-bg)' }}
    >
      {/* Section label */}
      <div style={{
        position:   'absolute',
        top:        'var(--space-8)',
        left:       isArabic ? 'auto' : 'var(--space-8)',
        right:      isArabic ? 'var(--space-8)' : 'auto',
        zIndex:     10,
        display:    'flex',
        alignItems: 'center',
        gap:        'var(--space-3)',
        paddingTop: 'var(--navbar-h)',
      }}>
        <span style={{
          fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
          fontSize:      'var(--text-xs)',
          color:         'var(--color-accent)',
          letterSpacing: isArabic ? '0' : '0.2em',
          textTransform: 'uppercase',
        }}>{t.work.label[lang]}</span>
        <span style={{
          fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
          fontSize:   'var(--text-xs)',
          color:      'var(--color-muted)',
        }}>0{projects.length} {isArabic ? 'مشروع' : 'Projects'}</span>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        style={{
          display:      'flex',
          alignItems:   'center',
          height:       '100vh',
          width:        `calc(${projects.length} * 520px + 20vw + var(--space-8))`,
          paddingLeft:  isArabic ? 'var(--space-8)' : '20vw',
          paddingRight: isArabic ? '20vw' : 'var(--space-8)',
          gap:          'var(--space-6)',
          direction:    isArabic ? 'rtl' : 'ltr',
        }}
      >
        {/* Intro card */}
        <div style={{
          flexShrink:   0,
          width:        '340px',
          paddingRight: isArabic ? '0' : 'var(--space-12)',
          paddingLeft:  isArabic ? 'var(--space-12)' : '0',
          textAlign:    isArabic ? 'right' : 'left',
        }}>
          <h2 style={{
            fontFamily:   isArabic ? 'var(--font-arabic)' : 'var(--font-display)',
            fontSize:     'var(--text-3xl)',
            fontWeight:   300,
            color:        'var(--color-text)',
            lineHeight:   1.2,
            marginBottom: 'var(--space-6)',
          }}>
            {t.work.heading[lang]}<br />
            <em style={{ color: 'var(--color-accent)' }}>{t.work.headingEm[lang]}</em>
          </h2>
          <p style={{
            fontSize:   'var(--text-sm)',
            color:      'var(--color-subtle)',
            lineHeight: 1.7,
            fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-body)',
          }}>
            {t.work.desc[lang]}
          </p>
          <div style={{
            marginTop:      'var(--space-8)',
            display:        'flex',
            alignItems:     'center',
            gap:            'var(--space-3)',
            justifyContent: isArabic ? 'flex-end' : 'flex-start',
          }}>
            <span style={{
              fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
              fontSize:      'var(--text-xs)',
              color:         'var(--color-muted)',
              letterSpacing: isArabic ? '0' : '0.1em',
            }}>{t.work.scroll[lang]}</span>
          </div>
        </div>

        {/* Project cards */}
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} isArabic={isArabic} />
        ))}

        <div style={{ flexShrink: 0, width: '10vw' }} />
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isArabic }: {
  project:  Project;
  index:    number;
  isArabic: boolean;
}) {
  const typeIcons: Record<string, string> = {
    mobile:      '📱',
    web:         '🌐',
    design:      '✦',
    development: '{ }',
    both:        '◈',
  };
const { lang } = useLang();
  return (
    <Link href={`/work/${project.slug}`} style={{ textDecoration: 'none' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
        whileHover="hover"
        style={{
          flexShrink:     0,
          width:          '460px',
          height:         '560px',
          background:     project.color || '#111',
          border:         '1px solid var(--color-border)',
          borderRadius:   'var(--radius-lg)',
          padding:        'var(--space-8)',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'space-between',
          position:       'relative',
          overflow:       'hidden',
          cursor:         'pointer',
          textAlign:      isArabic ? 'right' : 'left',
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
            background:    `radial-gradient(ellipse 60% 50% at 50% 100%, ${project.accent || '#c9b99a'}18 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Top row */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'flex-start',
          flexDirection:  isArabic ? 'row-reverse' : 'row',
        }}>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-xs)',
            color:         'var(--color-muted)',
            letterSpacing: '0.1em',
          }}>{String(index + 1).padStart(2, '0')}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-xs)',
              color:         'var(--color-muted)',
              letterSpacing: '0.05em',
            }}>{typeIcons[project.type] || '◆'}</span>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-xs)',
              color:         'var(--color-muted)',
              letterSpacing: '0.1em',
            }}>{project.year}</span>
          </div>
        </div>

        {/* Middle */}
        <div>
          <h3 style={{
            fontFamily:   isArabic ? 'var(--font-arabic)' : 'var(--font-display)',
            fontSize:     'var(--text-2xl)',
            fontWeight:   300,
            color:        'var(--color-text)',
            marginBottom: 'var(--space-3)',
            lineHeight:   1.1,
          }}>{project.title}</h3>
          {project.titleAr && isArabic && (
            <p style={{
              fontFamily:   'var(--font-arabic)',
              fontSize:     'var(--text-sm)',
              color:        project.accent || 'var(--color-accent)',
              marginBottom: 'var(--space-3)',
              direction:    'rtl',
            }}>{project.titleAr}</p>
          )}
          <p style={{
            fontFamily:    isArabic ? 'var(--font-arabic)' : 'var(--font-mono)',
            fontSize:      'var(--text-xs)',
            color:         project.accent || 'var(--color-accent)',
            letterSpacing: isArabic ? '0' : '0.1em',
            textTransform: 'uppercase',
            marginBottom:  'var(--space-4)',
          }}>{isArabic && project.roleAr ? project.roleAr : project.role}</p>
          <p style={{
            fontSize:   'var(--text-sm)',
            color:      'var(--color-subtle)',
            lineHeight: 1.7,
            fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-body)',
}}>{isArabic && project.descAr ? project.descAr : project.desc}</p>        </div>

        {/* Tags */}
        <div style={{
          display:        'flex',
          flexWrap:       'wrap',
          gap:            'var(--space-2)',
          justifyContent: isArabic ? 'flex-end' : 'flex-start',
        }}>
          {project.tags?.map(tag => (
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
        </div>
      </motion.div>
    </Link>
  );
}