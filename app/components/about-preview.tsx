import { profile, stack } from '~/data/profile';
import { MdLayers, MdPersonOutline } from 'react-icons/md';
import { techIcon } from './icons';
import Section from './section';

export const About = () => (
  <Section id="about" label="About me" icon={MdPersonOutline}>
    <div className="space-y-4 leading-relaxed text-soft">
      {profile.bio.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
    <p className="mt-6 font-semibold text-fg">{profile.name}</p>
    <p className="text-sm text-muted">{profile.title}</p>
  </Section>
);

export const Stacks = () => (
  <Section id="stack" label="Stack" icon={MdLayers}>
    <ul className="flex flex-wrap gap-2">
      {stack.map((tech) => {
        const Icon = techIcon(tech);
        return (
          <li
            key={tech}
            className="group flex items-center gap-2 rounded-lg border border-line bg-card px-2.5 py-1.5 text-sm text-soft transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-fg"
          >
            <Icon size={15} className="text-muted transition-colors group-hover:text-accent" />
            {tech}
          </li>
        );
      })}
    </ul>
  </Section>
);

export default About;
