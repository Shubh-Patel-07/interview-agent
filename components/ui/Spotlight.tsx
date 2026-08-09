'use client';

import { useEffect, useRef } from 'react';

export function Spotlight() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      el.style.setProperty('--mouse-x', `${e.clientX}px`);
      el.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 opacity-90 w-full h-full"
      style={{
        background: `radial-gradient(650px circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(37, 99, 235, 0.15), transparent 45%)`,
      }}
    />
  );
}
