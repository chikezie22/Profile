import ProjectCard from '~/components/project-card';
import type { Route } from '../projects/+types/index';
import type { Project } from '~/types';
import { useMemo, useState } from 'react';
import Pagination from '~/components/pagination';
import { AnimatePresence, motion } from 'motion/react';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Friendly | Projects' }, { name: 'description', content: 'All Projects' }];
}
export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
 
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  const data = await res.json();
  return { projects: data };
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
      : projects.filter((project) => project.category === selectedCategory);
  }, [categories]);
  const productsPerPage = 5;
  const totalPages = Math.ceil(filteredProjects.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-white font-bold mt-3">Project Page</h2>
        <div className="space-x-3">
          <label htmlFor="category">Categories</label>
          <select
            className="bg-gray-800 border border-gray-600 px-4 py-2.5 rounded-lg text-gray-200 cursor-pointer 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
             hover:border-gray-500 transition-colors duration-200 "
            defaultValue={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            id="category"
          >
            {categories.map((category) => (
              <option
                key={category.label}
                value={category.value}
                className="bg-gray-800 text-gray-200"
              >
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div layout className="grid gap-6 sm:grid-cols-2 w-full h-full">
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
