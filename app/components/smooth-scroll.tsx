import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Inertia-style smooth scrolling for the whole page (Lenis). Skipped for visitors who ask for
// reduced motion, and only runs in the browser.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      anchors: true, // smooth-scroll to in-page #links
    });

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    // Same-page links such as "/#experience" would otherwise jump; glide to them instead.
    // Sections use `scroll-mt-24` (96px) to clear the sticky navbar, so match that offset.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const link = (e.target as Element).closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      const target = url.hash ? document.querySelector(url.hash) : null;
      if (!(target instanceof HTMLElement)) return;
      e.preventDefault();
      e.stopPropagation(); // capture phase: keeps the router from doing its own instant jump
      window.history.replaceState(null, '', url.pathname + url.hash);
      // Use the real scroll position (not Lenis' internal one) so the target is always right,
      // even if something else, like the router's scroll restoration, moved the page.
      lenis.scrollTo(target.getBoundingClientRect().top + window.scrollY - 96);
    };
    document.addEventListener('click', onClick, true);

    return () => {
      document.removeEventListener('click', onClick, true);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
