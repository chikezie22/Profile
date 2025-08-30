import FeaturedProjects from '~/components/feature-project';
import type { Route } from './+types/index';
import type { Project } from '~/types';
import AboutPreview from '~/components/about-preview';
import type { PostMeta } from '~/types';
import LatestPosts from '~/components/latest-posts';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  const url = new URL(request.url);
  const [projectRes, postRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects`),
    fetch(new URL(`/posts-meta.json`, url)),
  ]);

  if (!projectRes.ok || !postRes.ok) {
    throw new Error('Failed to fetch Projects or Posts');
  }
  const [projects, posts] = await Promise.all([await projectRes.json(), await postRes.json()]);

  return { projects, posts };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData;
  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
      <LatestPosts posts={posts} />
    </>
  );
};
export default HomePage;
