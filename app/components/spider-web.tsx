import { useEffect, useState, type CSSProperties } from 'react';

// A quarter spider web anchored in a corner. The geometry is generated once, deterministically,
// so the server and client render identical markup.
const SIZE = 320;
const STRANDS = 7;
const RINGS = 7;
const RING_GAP = 38;
const START = 6;
const SPAN = 78; // degrees covered by the radial strands

const round = (n: number) => Math.round(n * 10) / 10;
const phis = Array.from({ length: STRANDS }, (_, i) => START + (i * SPAN) / (STRANDS - 1));

// The anchor sits in the top-right corner; strands fan out down and to the left.
const point = (phi: number, r: number) => {
  const t = (phi * Math.PI) / 180;
  return { x: round(SIZE - Math.cos(t) * r), y: round(Math.sin(t) * r) };
};

const radials = phis.map((phi) => {
  const end = point(phi, SIZE - 6);
  return `M${SIZE} 0 L${end.x} ${end.y}`;
});

// Spiral threads: each segment links one strand to the next and sags toward the anchor.
const spiral: string[] = [];
for (let k = 0; k < RINGS; k++) {
  for (let i = 0; i < STRANDS - 1; i++) {
    const r1 = RING_GAP * (k + 1) + (i * RING_GAP) / (STRANDS - 1);
    const r2 = RING_GAP * (k + 1) + ((i + 1) * RING_GAP) / (STRANDS - 1);
    const p = point(phis[i], r1);
    const q = point(phis[i + 1], r2);
    const c = {
      x: round(SIZE + ((p.x + q.x) / 2 - SIZE) * 0.9),
      y: round(((p.y + q.y) / 2) * 0.9),
    };
    spiral.push(`M${p.x} ${p.y} Q${c.x} ${c.y} ${q.x} ${q.y}`);
  }
}

// [ring, strand, radius] for the dew drops caught in the web.
const dew = (
  [
    [1, 2, 2.1],
    [2, 4, 1.6],
    [3, 1, 1.9],
    [4, 5, 2.3],
    [5, 3, 1.7],
    [6, 2, 2],
  ] as const
).map(([k, i, r]) => {
  const pt = point(phis[i], RING_GAP * (k + 1) + (i * RING_GAP) / (STRANDS - 1));
  return { ...pt, r };
});

const idx = (i: number) => ({ '--i': i }) as CSSProperties;

function Web({ className }: { className: string }) {
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={`web ${className}`} aria-hidden>
      {radials.map((d, i) => (
        <path key={`r${i}`} d={d} pathLength={1} className="web-line" style={idx(i)} />
      ))}
      {spiral.map((d, i) => (
        <path key={`s${i}`} d={d} pathLength={1} className="web-line" style={idx(i + 6)} />
      ))}
      {dew.map((d, i) => (
        <circle key={`d${i}`} cx={d.x} cy={d.y} r={d.r} className="web-dew" style={idx(i * 7 + 12)} />
      ))}
    </svg>
  );
}

// Re-weaves itself whenever the theme toggle fires a `themechange` event.
export default function SpiderWeb() {
  const [weave, setWeave] = useState(0);

  useEffect(() => {
    const onChange = () => setWeave((n) => n + 1);
    window.addEventListener('themechange', onChange);
    return () => window.removeEventListener('themechange', onChange);
  }, []);

  return (
    <div key={weave} aria-hidden className="pointer-events-none">
      <Web className="fixed right-0 top-0 -z-10 w-52 origin-top-right sm:w-80" />
      <Web className="fixed bottom-0 left-0 -z-10 w-36 rotate-180 opacity-60 sm:w-60" />
    </div>
  );
}
