import FeaturedProjects from '~/components/feature-project';
import type { Route } from './+types/index';
import type { Project, StrapiPost, StrapiProject, StrapiResponse } from '~/types';
import AboutPreview from '~/components/about-preview';
import type { PostMeta } from '~/types';
import LatestPosts from '~/components/latest-posts';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  // const url = new URL(request.url);
  const [projectsRes, postsRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`),
    fetch(
      `${import.meta.env.VITE_API_URL}/posts?sort[0]=date:desc&pagination[limit]=3&populate=image`
    ),
  ]);

  if (!projectsRes.ok || !postsRes.ok) {
    throw new Error('Failed to fetch Projects or Posts');
  }
  const projectsJson: StrapiResponse<StrapiProject> = await projectsRes.json();
  const postsJson: StrapiResponse<StrapiPost> = await postsRes.json();

  const projects = projectsJson.data.map((item) => ({
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
  const posts = postsJson.data.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    date: item.date,
    image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
  }));

  return { projects, posts };
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
