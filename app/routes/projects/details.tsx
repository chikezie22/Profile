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
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
      : '/images/no-image.png',
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  };
  return project;
}

const ProjectDetials = ({ loaderData }: Route.ComponentProps) => {
  const project = loaderData;
  console.log(project);
  return (
    <>
      {/* Go Back Button */}
      <Link
        to="/projects"
        className="flex items-center text-blue-400 hover:text-blue-500 mb-6 transition"
      >
        <FaArrowLeft className="mr-2" />
        Back to Projects
      </Link>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Project Image */}
        <div>
          <picture>
            <source srcSet={project.image} media="(width >= 600px)" />
            <img src={project.image} alt={project.title} className="w-full rounded-lg shadow-md" />
          </picture>
        </div>

        {/* Project Info */}
        <div>
          <h1 className="text-3xl font-bold text-blue-400 mb-4">{project.title}</h1>
          <p className="text-gray-300 text-sm mb-4">
            {new Date(project.date).toLocaleDateString()} • {project.category}
          </p>
          <p className="text-gray-200 mb-6">{project.description}</p>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            View Live Site →
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectDetials;
