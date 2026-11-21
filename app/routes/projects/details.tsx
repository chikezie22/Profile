import { FaArrowLeft } from 'react-icons/fa';
import type { Route } from './+types/details';
import type { StrapiProject, Project } from '~/types';
import { Link } from 'react-router';
export async function loader({ request, params }: Route.LoaderArgs) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/${params.id}?populate=*`);

  if (!res.ok) throw new Response(`Project not found`, { status: 404 });
  const data = await res.json();
  const item: StrapiProject = await data.data;

  const project: Project = {
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  };
  return project;
}

const ProjectDetials = ({ loaderData }: Route.ComponentProps) => {
  const project = loaderData;

  return (
    <article>
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-fg"
      >
        <FaArrowLeft size={12} /> Back to projects
      </Link>

      <img
        src={project.image}
        alt={project.title}
        className="mt-6 w-full rounded-xl object-cover ring-1 ring-line"
      />

      <p className="label mt-8">
        {new Date(project.date).toLocaleDateString()} · {project.category}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{project.title}</h1>
      <p className="mt-4 leading-relaxed text-soft">{project.description}</p>

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-block rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-bg transition hover:opacity-85 active:scale-[0.98]"
      >
        View live site ↗
      </a>
    </article>
  );
};

export default ProjectDetials;
