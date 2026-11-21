import { profile } from '~/data/profile';

const Footer = () => (
  <footer className="mx-auto max-w-2xl px-6 pb-12 pt-6">
    <div className="flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <div className="flex gap-5">
        {profile.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-fg"
          >
            {s.label} ↗
          </a>
        ))}
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-fg"
        >
          Resume ↗
        </a>
        <a href={`mailto:${profile.email}`} className="transition-colors hover:text-fg">
          Email
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
