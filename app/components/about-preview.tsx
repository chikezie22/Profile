import { profile, stack } from '~/data/profile';
import Section from './section';

export const About = () => (
  <Section id="about" label="About me">
    <div className="space-y-4 leading-relaxed text-soft">
      {profile.bio.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
    <p className="mt-6 font-serif text-4xl italic leading-none text-fg">{profile.firstName}</p>
    <p className="mt-1 text-sm text-muted">{profile.name}</p>
  </Section>
);

export const Stacks = () => (
  <Section id="stack" label="Stack">
    <ul className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-md border border-line bg-card px-2.5 py-1 text-sm text-soft transition-colors hover:border-muted hover:text-fg"
        >
          {tech}
        </li>
      ))}
    </ul>
  </Section>
);

export default About;
