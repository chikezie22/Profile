import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import Rain from './rain';

type Theme = 'dark' | 'light';

const THREAD = 44; // resting length of the silk thread, in px
const PULL = 70; // how far you must drag the spider down for the pull to count

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

// A spider on a silk thread. Drag it down and let go: the theme flips and it starts to rain.
// Pull it again and the rain stops and the theme flips back. A plain click or the keyboard does
// the same thing, so it works without dragging too.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [raining, setRaining] = useState(false);
  const [armed, setArmed] = useState(false); // pulled far enough that letting go will count
  const reduce = useReducedMotion();
  const y = useMotionValue(0);
  const threadHeight = useTransform(y, (v) => THREAD + 8 + Math.max(v, 0));
  const dragging = useRef(false);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  }, []);

  useMotionValueEvent(y, 'change', (v) => setArmed(v >= PULL * 0.75));

  const flip = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
    setRaining((r) => !r);
    window.dispatchEvent(new Event('themechange'));
  };

  return (
    <>
      <Rain active={raining} />
      <motion.div
        className="fixed right-4 top-0 z-50 w-[34px]"
        style={{ transformOrigin: '50% 0%' }}
        animate={reduce ? undefined : { rotate: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.span
          aria-hidden
          style={{ height: threadHeight }}
          className="absolute left-1/2 top-0 block w-px -translate-x-1/2 bg-[var(--web)]"
        />
        <motion.button
          type="button"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.75 }}
          dragSnapToOrigin
          dragTransition={{ bounceStiffness: 420, bounceDamping: 14 }}
          whileHover={{ scale: 1.08 }}
          style={{ y, marginTop: THREAD }}
          onDragStart={() => {
            dragging.current = true;
          }}
          onDragEnd={(_, info) => {
            if (info.offset.y > PULL) flip();
            window.setTimeout(() => (dragging.current = false), 60);
          }}
          onClick={() => {
            if (dragging.current) return; // the drag already handled it
            flip();
            animate(y, [0, 22, -6, 0], { duration: 0.6, ease: 'easeOut' });
          }}
          aria-label={raining ? 'Stop the rain and switch theme' : 'Make it rain and switch theme'}
          title="Pull me down"
          className={`spider-btn relative block cursor-grab touch-none select-none text-fg active:cursor-grabbing ${
            armed ? 'spider-armed' : ''
          }`}
        >
          <Spider />
        </motion.button>
      </motion.div>
    </>
  );
}
