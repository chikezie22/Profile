import FeaturedProjects from '~/components/feature-project';
import type { Route } from './+types/index';
import type { Project } from '~/types';

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  const data = await res.json();
  return { projects: data };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };
  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
    </>
  );
};
export default HomePage;
