import { MdDescription, MdMailOutline } from 'react-icons/md';
import { profile } from '~/data/profile';
import { socialIcon } from './icons';

const Footer = () => (
  <footer className="mx-auto max-w-2xl px-6 pb-12 pt-6">
    <div className="flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {profile.socials.map((s) => {
          const Icon = socialIcon(s.label);
          return (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-fg"
            >
              {Icon && <Icon size={14} />}
              {s.label}
            </a>
          );
        })}
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 transition-colors hover:text-fg"
        >
          <MdDescription size={15} />
          Resume
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-fg"
        >
          <MdMailOutline size={15} />
          Email
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
