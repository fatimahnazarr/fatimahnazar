'use client';

import { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'hover' | 'text' | 'link';

export default function Cursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>('default');

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let rafId: number;

    // --- Smooth ring follow ---
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    // --- Mouse move ---
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    // --- State detection ---
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor="link"]')) {
        setState('link');
      } else if (target.closest('p, h1, h2, h3, span, [data-cursor="text"]')) {
        setState('text');
      } else {
        setState('default');
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Inner dot — snaps instantly */}
      <div
        ref={dotRef}
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          width:           state === 'link' ? '6px' : '5px',
          height:          state === 'link' ? '6px' : '5px',
          borderRadius:    '50%',
          backgroundColor: 'var(--color-accent)',
          pointerEvents:   'none',
          zIndex:          9999,
          transition:      'width 200ms, height 200ms, background-color 200ms',
          willChange:      'transform',
        }}
      />
      {/* Outer ring — lags behind smoothly */}
      <div
        ref={ringRef}
        style={{
          position:     'fixed',
          top:          0,
          left:         0,
          width:        state === 'link' ? '44px' : state === 'text' ? '2px' : '32px',
          height:       state === 'link' ? '44px' : state === 'text' ? '28px' : '32px',
          borderRadius: state === 'text' ? '1px' : '50%',
          border:       `1px solid ${state === 'link' ? 'var(--color-accent)' : 'rgba(201,185,154,0.4)'}`,
          pointerEvents:'none',
          zIndex:       9998,
          transition:   'width 300ms var(--ease-out-expo), height 300ms var(--ease-out-expo), border-radius 300ms var(--ease-out-expo), border-color 300ms',
          willChange:   'transform',
        }}
      />
    </>
  );
}