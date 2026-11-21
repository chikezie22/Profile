import { motion } from 'motion/react';
import { FiMail, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router';
import { profile } from '~/data/profile';

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 12, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const Hero = () => {
  return (
    <header className="pb-6 pt-14 sm:pt-20">
      {profile.openToWork && (
        <motion.p
          {...fade(0)}
          className="label mb-5 flex items-center gap-2 text-soft"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Open to work
        </motion.p>
      )}

      <motion.h1
        {...fade(0.08)}
        className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
      >
        Hi, I’m{' '}
        <img
          src={profile.avatar}
          alt=""
          className="mx-1 inline-block h-9 w-9 -translate-y-0.5 rounded-full object-cover align-middle ring-1 ring-line sm:h-10 sm:w-10"
        />{' '}
        {profile.name}
        <br />
        <span className="text-soft">{profile.title}</span>
      </motion.h1>

      <motion.p {...fade(0.16)} className="mt-4 max-w-md leading-relaxed text-muted">
        {profile.tagline}
      </motion.p>

      <motion.div {...fade(0.24)} className="mt-7 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-bg transition hover:opacity-85 active:scale-[0.98]"
        >
          <FiMail size={15} /> Email me
        </a>
        <Link
          to="/contact"
          className="inline-flex items-center rounded-lg border border-line px-4 py-2.5 text-sm text-soft transition hover:border-muted hover:text-fg"
        >
          Send a message
        </Link>
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg border border-line px-4 py-2.5 text-sm text-soft transition hover:border-muted hover:text-fg"
        >
          Resume ↗
        </a>
        <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-muted">
          <FiMapPin size={14} /> {profile.location}
        </span>
      </motion.div>
    </header>
  );
};

export default Hero;
