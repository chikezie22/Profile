import { Link } from 'react-router';
import type { Project } from '~/types';

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    // <Link to={`${project.id}`} className=" transition-all duration-300 hover:scale-[1.02]">

    // </Link>
    <Link
      to={`${project.id}`}
      className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-sm transition hover:shadow-md grid grid-rows-[auto_1fr_auto] gap-3  duration-300 hover:scale-[1.02]"
    >
      <picture>
        <source srcSet={project.image} media="(width >= 600px)" />
        <img className="w-full h-52 object-cover" src={project.image} alt={project.title} />
      </picture>
      <div className="p-5 grid grid-rows-subgrid row-span-3 gap-1">
        <h3 className="text-3xl font-semibold text-blue-400 mb-1">{project.title}</h3>

        <p className="text-sm text-gray-300 mb-2">{project.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>{project.category}</span>
          <span>{new Date(project.date).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
