import FeaturedProjects from '~/components/feature-project';
import type { Route } from './+types/index';
import type { Project, StrapiProject, StrapiResponse } from '~/types';
import AboutPreview from '~/components/about-preview';
import type { PostMeta } from '~/types';
import LatestPosts from '~/components/latest-posts';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  const url = new URL(request.url);
  const [projectsRes, postsRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`),
    fetch(new URL(`/posts-meta.json`, url)),
  ]);

  if (!projectsRes.ok || !postsRes.ok) {
    throw new Error('Failed to fetch Projects or Posts');
  }
  const projectsJson: StrapiResponse<StrapiProject> = await projectsRes.json();
  const postsJson = await postsRes.json();

  const projects = projectsJson.data.map((item  ) => ({
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
  }));

  return { projects, posts: postsJson };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData;
  return (
    <>
      <FeaturedProjects projects={projects} />
      <AboutPreview />
      <LatestPosts posts={posts} />
    </>
  );
};
export default HomePage;
