'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function HorizontalScroll({ children, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track     = trackRef.current;
    if (!container || !track) return;

    const getScrollAmount = () =>
      -(track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger:    container,
        start:      'top top',
        end:        () => `+=${track.scrollWidth - window.innerWidth}`,
        pin:        true,
        scrub:      1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ overflow: 'hidden' }}>
      <div
        ref={trackRef}
        className={className}
        style={{
          display:    'flex',
          flexWrap:   'nowrap',
          alignItems: 'stretch',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}