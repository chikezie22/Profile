import { Link } from 'react-router';
import type { Project } from '~/types';
import { MdArrowOutward, MdFolderOpen } from 'react-icons/md';
import Section from './section';

const FeaturedProjects = ({ projects }: { projects: Project[] }) => {
  return (
    <Section id="projects" label="Projects" icon={MdFolderOpen}>
      <p className="mb-5 text-soft">A few things I’ve built and shipped.</p>
      {projects.length === 0 ? (
        <p className="text-sm text-muted">Projects are loading soon.</p>
      ) : (
        <ul className="divide-y divide-line border-y border-line">
          {projects.map((p) => (
            <li key={p.id}>
              <Link
                to={`/projects/${p.documentId}`}
                className="group flex items-center gap-3 py-3.5"
              >
                <img
                  src={p.image}
                  alt=""
                  className="h-9 w-9 shrink-0 rounded-lg object-cover ring-1 ring-line"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-fg">{p.title}</span>
                  <span className="block truncate text-sm text-muted">{p.description}</span>
                </span>
                <MdArrowOutward
                  size={18}
                  className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-5 text-sm text-muted">
        Want to see more?{' '}
        <Link to="/projects" className="link-dot">
          View all projects →
        </Link>
      </p>
    </Section>
  );
};

export default FeaturedProjects;
