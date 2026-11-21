import { useEffect, useRef } from 'react';

type Drop = { x: number; y: number; len: number; speed: number; alpha: number };
type Ripple = { x: number; age: number };

const SLANT = 0.16; // sideways pixels per falling pixel (a light wind)
const MAX_DROPS = 90;
const RIPPLE_MS = 420;

// A full-screen canvas of light rain. It ramps up when `active` turns on, and when it turns off the
// drops already in the air finish falling, so it tapers away instead of cutting out. The animation
// loop only runs while there is something to draw, so it costs nothing when idle.
export default function Rain({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  const startRef = useRef<() => void>(() => {});

  useEffect(() => {
    activeRef.current = active;
    if (active) startRef.current();
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // no rain for them

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const readColour = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--rain').trim() ||
      'rgba(176, 188, 255, 0.55)';
    let colour = readColour();
    const onTheme = () => (colour = readColour());
    window.addEventListener('themechange', onTheme);

    const drops: Drop[] = [];
    const ripples: Ripple[] = [];
    let intensity = 0; // 0..1, eases toward on/off so the rain builds and fades
    let last = 0;
    let frame = 0;
    let running = false;

    const spawn = () => {
      drops.push({
        x: Math.random() * (width + 120) - 60,
        y: -20 - Math.random() * 80,
        len: 9 + Math.random() * 11,
        speed: 650 + Math.random() * 500,
        alpha: 0.2 + Math.random() * 0.4,
      });
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      intensity += ((activeRef.current ? 1 : 0) - intensity) * Math.min(dt * 2.4, 1);

      if (!activeRef.current && intensity < 0.03 && drops.length === 0 && ripples.length === 0) {
        ctx.clearRect(0, 0, width, height);
        running = false;
        return;
      }

      if (activeRef.current) {
        const target = Math.min(MAX_DROPS, Math.round(width / 15)) * intensity;
        for (let n = Math.min(6, target - drops.length); n > 0; n--) spawn();
      }

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = colour;
      ctx.lineCap = 'round';
      ctx.lineWidth = 1.1;

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.y += d.speed * dt;
        d.x += d.speed * SLANT * dt;
        if (d.y > height - 2) {
          if (Math.random() < 0.4 && ripples.length < 40) ripples.push({ x: d.x, age: 0 });
          drops.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = d.alpha;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.len * SLANT, d.y - d.len);
        ctx.stroke();
      }

      ctx.lineWidth = 0.9;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.age += dt * 1000;
        const p = r.age / RIPPLE_MS;
        if (p >= 1) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = (1 - p) * 0.5;
        ctx.beginPath();
        ctx.ellipse(r.x, height - 2, 2 + p * 9, 0.8 + p * 2.6, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      frame = requestAnimationFrame(tick);
    };

    startRef.current = () => {
      colour = readColour();
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    if (activeRef.current) startRef.current();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('themechange', onTheme);
      startRef.current = () => {};
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 h-full w-full"
    />
  );
}
