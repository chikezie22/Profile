import { useEffect, useRef, useState, type ReactNode } from 'react';

// Fades and lifts content in as it scrolls into view.
// The server renders it fully visible, so nothing waits on JavaScript to appear. After hydration,
// only blocks that start below the fold are hidden and then revealed by an IntersectionObserver.
export default function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Already on screen at load: leave it alone, no flash.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setHidden(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -60px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${hidden ? 'reveal-hidden' : ''} ${className}`}
      style={{ transitionDelay: hidden ? '0s' : `${delay}s` }}
    >
      {children}
    </div>
  );
}
