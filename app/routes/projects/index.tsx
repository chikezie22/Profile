import ProjectCard from '~/components/project-card';
import { apiFetch } from '~/lib/api';
import type { Route } from './+types/index';
import type { Project, StrapiProject, StrapiResponse } from '~/types';
import { useMemo, useState } from 'react';
import Pagination from '~/components/pagination';
import { AnimatePresence, motion } from 'motion/react';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Projects | Chikezie Simon' }, { name: 'description', content: 'All Projects' }];
}
export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await apiFetch(`/projects?populate=*`);
  const json: StrapiResponse<StrapiProject> = await res.json();

  const projects = json.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  }));
  return { projects };
}
const ProjectPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };

  const categories = ['All', ...new Set(projects.map((project) => project.category))].map(
    (category) => ({
      label: category,
      value: category,
    })
  );

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const filteredProjects = useMemo(() => {
    return selectedCategory === 'All'
      ? projects
      : projects?.filter((project) => project.category === selectedCategory);
  }, [projects, selectedCategory]);
  const productsPerPage = 5;
  const totalPages = Math.ceil(filteredProjects.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-2 text-muted">Things I’ve built, shipped and learned from.</p>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="category" className="label">
            Category
          </label>
          <select
            className="cursor-pointer rounded-lg border border-line bg-card px-3 py-2 text-sm text-fg transition-colors hover:border-muted focus:outline-none"
            defaultValue={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            id="category"
          >
            {categories.map((category) => (
              <option
                key={category.label}
                value={category.value}
                className="bg-card text-fg"
              >
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div layout className="grid w-full gap-5 sm:grid-cols-2">
          {currentProjects.map((project) => (
            <motion.div key={project.id}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );
};

export default ProjectPage;
