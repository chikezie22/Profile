import { education, experience, profile } from '~/data/profile';
import { MdSchool, MdWorkOutline } from 'react-icons/md';
import Section from './section';

const Experience = () => (
  <Section id="experience" label="Experience" icon={MdWorkOutline}>
    <ol className="relative ml-3 space-y-9 border-l border-line pl-7">
      {experience.map((job, i) => (
        <li key={`${job.company}-${job.period}`} className="relative">
          <span
            className={`absolute -left-[40px] top-0 grid h-6 w-6 place-items-center rounded-full border ring-4 ring-bg ${
              i === 0 ? 'border-accent bg-accent text-bg' : 'border-line bg-card text-muted'
            }`}
            aria-hidden
          >
            <MdWorkOutline size={13} />
          </span>
          <p className="label">{job.period}</p>
          <h3 className="mt-1.5 font-medium text-fg">
            {job.role} <span className="font-normal text-muted">at</span>{' '}
            <span className="rounded-md border border-line bg-card px-1.5 py-0.5 text-[0.95em]">
              {job.company}
            </span>
          </h3>
          <p className="mt-0.5 text-xs text-muted">{job.location}</p>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-soft">
            {job.points.map((pt) => (
              <li key={pt} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" aria-hidden />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {job.tags.map((t) => (
              <li key={t} className="rounded bg-card px-2 py-0.5 text-xs text-muted">
                {t}
              </li>
            ))}
          </ul>
        </li>
      ))}

      <li className="relative">
        <span
          className="absolute -left-[40px] top-0 grid h-6 w-6 place-items-center rounded-full border border-line bg-card text-muted ring-4 ring-bg"
          aria-hidden
        >
          <MdSchool size={13} />
        </span>
        <p className="label">{education.period}</p>
        <h3 className="mt-1.5 font-medium text-fg">{education.degree}</h3>
        <p className="mt-0.5 text-sm text-muted">
          {education.school} · {education.note}
        </p>
      </li>
    </ol>
    <p className="mt-8 text-sm text-muted">
      The full history is in my{' '}
      <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="link-dot">
        resume
      </a>
      .
    </p>
  </Section>
);

export default Experience;
