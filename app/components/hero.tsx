import { MdDescription, MdLocationOn, MdMailOutline, MdSend } from 'react-icons/md';
import { Link } from 'react-router';
import { profile } from '~/data/profile';

// Entrance animation is pure CSS (see .fade-up) so the hero paints immediately,
// without waiting for JavaScript to load and hydrate.
const delay = (s: number) => ({ animationDelay: `${s}s` });

const Hero = () => {
  return (
    <header className="pb-6 pt-14 sm:pt-20">
      {profile.openToWork && (
        <p className="label fade-up mb-5 flex items-center gap-2 text-soft" style={delay(0)}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
          </span>
          Open to work
        </p>
      )}

      <h1
        className="fade-up text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
        style={delay(0.05)}
      >
        Hi, I’m {profile.name}
        <br />
        <span className="text-soft">{profile.title}</span>
      </h1>

      <p className="fade-up mt-4 max-w-md leading-relaxed text-muted" style={delay(0.1)}>
        {profile.tagline}
      </p>

      <div className="fade-up mt-7 flex flex-wrap items-center gap-3" style={delay(0.15)}>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-bg transition hover:opacity-85 active:scale-[0.98]"
        >
          <MdMailOutline size={17} /> Email me
        </a>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm text-soft transition hover:border-muted hover:text-fg"
        >
          <MdSend size={15} />
          Send a message
        </Link>
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm text-soft transition hover:border-muted hover:text-fg"
        >
          <MdDescription size={16} />
          Resume
        </a>
        <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-muted">
          <MdLocationOn size={16} /> {profile.location}
        </span>
      </div>
    </header>
  );
};

export default Hero;
