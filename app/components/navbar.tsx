import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { motion, useScroll, useSpring } from 'motion/react';
import { profile } from '~/data/profile';

const links = [
  { to: '/#experience', label: 'Experience' },
  { to: '/#projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${
        scrolled ? 'bg-bg/80 backdrop-blur-md' : ''
      }`}
    >
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 py-4 pl-6 pr-14 sm:pr-16">
        <Link to="/" aria-label="Home" className="shrink-0">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-9 w-9 rounded-full object-cover ring-1 ring-line"
          />
        </Link>
        <nav className="flex items-center gap-3.5 text-sm text-muted sm:gap-5">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={() =>
                `transition-colors hover:text-fg ${l.to === '/#experience' ? 'hidden sm:inline' : ''} ${
                  !l.to.includes('#') && pathname.startsWith(l.to) ? 'text-fg' : ''
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <motion.div
        style={{ scaleX: progress }}
        className="h-px origin-left bg-accent"
        aria-hidden
      />
    </header>
  );
};

export default Navbar;
