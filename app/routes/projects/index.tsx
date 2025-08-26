import ProjectCard from '~/components/project-card';
import type { Route } from './+types/index';
import type { Project } from '~/types';
import { useState } from 'react';
export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch('http://localhost:8000/projects');
  const data = await res.json();
  return { projects: data };
}
const ProjectPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2;
  const totalPages = Math.ceil(projects.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  return (
    <>
      <h2 className="text-white font-bold mt-3">Project Page</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </>
  );
};

export default ProjectPage;
