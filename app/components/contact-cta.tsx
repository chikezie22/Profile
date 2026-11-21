import { Link } from 'react-router';
import { profile } from '~/data/profile';
import Section from './section';

const ContactCta = () => (
  <Section id="contact" label="Contact">
    <p className="font-serif text-3xl italic leading-snug text-fg sm:text-4xl">
      Have a project in mind? Let’s build something great.
    </p>
    <div className="mt-6 flex flex-wrap gap-3">
      <a
        href={`mailto:${profile.email}`}
        className="rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-bg transition hover:opacity-85 active:scale-[0.98]"
      >
        {profile.email}
      </a>
      <Link
        to="/contact"
        className="rounded-lg border border-line px-4 py-2.5 text-sm text-soft transition hover:border-muted hover:text-fg"
      >
        Use the contact form
      </Link>
    </div>
  </Section>
);

export default ContactCta;
