import { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'motion/react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

type Theme = 'dark' | 'light';

// A little pull-cord that hangs from the top of the page.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const controls = useAnimationControls();

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
    controls.start({
      y: [0, 14, -4, 0],
      transition: { duration: 0.5, ease: 'easeOut' },
    });
  };

  return (
    <motion.div animate={controls} className="fixed right-5 top-0 z-50 flex flex-col items-center">
      <span className="block h-10 w-px bg-line sm:h-14" aria-hidden />
      <button
        onClick={toggle}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-line bg-fg text-bg shadow-lg transition-transform hover:scale-110"
      >
        {theme === 'dark' ? <MdDarkMode size={17} /> : <MdLightMode size={17} />}
      </button>
    </motion.div>
  );
}
