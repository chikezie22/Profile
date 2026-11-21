import { education, experience } from '~/data/profile';
import Section from './section';

const Experience = () => (
  <Section id="experience" label="Experience">
    <ol className="relative space-y-9 border-l border-line pl-6">
      {experience.map((job, i) => (
        <li key={`${job.company}-${job.period}`} className="relative">
          <span
            className={`absolute -left-[29px] top-1.5 h-2 w-2 rounded-full ring-4 ring-bg ${
              i === 0 ? 'bg-accent' : 'bg-line'
            }`}
            aria-hidden
          />
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
          className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-line ring-4 ring-bg"
          aria-hidden
        />
        <p className="label">{education.period}</p>
        <h3 className="mt-1.5 font-medium text-fg">{education.degree}</h3>
        <p className="mt-0.5 text-sm text-muted">
          {education.school} · {education.note}
        </p>
      </li>
    </ol>
  </Section>
);

export default Experience;
