import { useEffect, useState } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'motion/react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

type Theme = 'dark' | 'light';

// Four legs per side as [x, y] points from the body outwards (mirrored for the other side).
const legs = [
  [[3, 9], [10, 4], [14, 7]],
  [[4, 11], [12, 9], [15, 14]],
  [[4.5, 13], [12, 15], [14, 21]],
  [[4, 15], [10, 20], [11, 27]],
];

function Spider() {
  return (
    <svg viewBox="0 0 32 32" width="34" height="34" fill="none" aria-hidden className="spider">
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        {[-1, 1].map((s) =>
          legs.map((leg, i) => (
            <polyline
              key={`${s}${i}`}
              className="spider-leg"
              style={{ animationDelay: `${i * 70}ms` }}
              points={leg.map(([x, y]) => `${16 + s * x},${y}`).join(' ')}
            />
          ))
        )}
      </g>
      <ellipse cx="16" cy="20" rx="6.5" ry="7.5" fill="currentColor" />
      <circle cx="16" cy="10.5" r="4" fill="currentColor" />
      <path d="M16 16.5l2 3.5-2 3.5-2-3.5z" fill="var(--bg)" opacity="0.85" />
      <circle cx="14.4" cy="10" r="1" fill="var(--accent)" />
      <circle cx="17.6" cy="10" r="1" fill="var(--accent)" />
    </svg>
  );
}

// A spider that hangs on a silk thread from the top of the page. Pull it to switch themes.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const controls = useAnimationControls();
  const reduce = useReducedMotion();

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
    window.dispatchEvent(new Event('themechange'));
    controls.start({
      y: [0, 22, -6, 0],
      transition: { duration: 0.6, ease: 'easeOut' },
    });
  };

  return (
    <motion.div
      className="fixed right-4 top-0 z-50 flex flex-col items-center"
      style={{ transformOrigin: '50% 0%' }}
      animate={reduce ? undefined : { rotate: [-2.5, 2.5, -2.5] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div animate={controls} className="flex flex-col items-center">
        <span className="block h-8 w-px bg-[var(--web)] sm:h-12" aria-hidden />
        <button
          onClick={toggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          className="spider-btn relative cursor-pointer text-fg transition-transform hover:scale-110"
        >
          <Spider />
          <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-fg text-bg">
            {theme === 'dark' ? <MdDarkMode size={10} /> : <MdLightMode size={10} />}
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
}
