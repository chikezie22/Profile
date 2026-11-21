import { Link } from 'react-router';
import { profile } from '~/data/profile';
import { MdMailOutline, MdSend } from 'react-icons/md';
import { socialIcon } from './icons';
import Section from './section';

const ContactCta = () => (
  <Section id="contact" label="Contact" icon={MdMailOutline}>
    <p className="text-2xl font-semibold leading-snug tracking-tight text-fg sm:text-3xl">
      Have a project in mind? Let’s build something great.
    </p>
    <div className="mt-6 flex flex-wrap gap-3">
      <a
        href={`mailto:${profile.email}`}
        className="inline-flex items-center gap-2 rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-bg transition hover:opacity-85 active:scale-[0.98]"
      >
        <MdMailOutline size={16} />
        {profile.email}
      </a>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm text-soft transition hover:border-muted hover:text-fg"
      >
        <MdSend size={15} />
        Use the contact form
      </Link>
    </div>
    <ul className="mt-6 flex gap-3">
      {profile.socials.map((s) => {
        const Icon = socialIcon(s.label);
        return (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card text-soft transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              {Icon && <Icon size={17} />}
            </a>
          </li>
        );
      })}
    </ul>
  </Section>
);

export default ContactCta;
