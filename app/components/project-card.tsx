import { Link } from 'react-router';
import type { Project } from '~/types';

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link
      to={`/projects/${project.documentId}`}
      className="group block overflow-hidden rounded-xl border border-line bg-card transition hover:border-muted"
    >
      <img
        className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        src={project.image}
        alt={project.title}
      />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-medium text-fg">{project.title}</h3>
          <span className="text-muted transition group-hover:text-fg" aria-hidden>
            ↗
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{project.description}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-muted">
          <span className="rounded bg-bg px-2 py-0.5">{project.category}</span>
          <span>{new Date(project.date).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
