import FeaturedProjects from '~/components/feature-project';
import type { Route } from './+types/index';
import type { Project, StrapiPost, StrapiProject, StrapiResponse } from '~/types';
import { About, Stacks } from '~/components/about-preview';
import Experience from '~/components/experience';
import ContactCta from '~/components/contact-cta';
import type { PostMeta } from '~/types';
import LatestPosts from '~/components/latest-posts';

export async function loader(_: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  // The page is mostly static, so a CMS outage shouldn't take the whole home page down.
  try {
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
    return mapData(projectsJson, postsJson);
  } catch (error) {
    console.error(error);
    return { projects: [], posts: [] };
  }
}

function mapData(
  projectsJson: StrapiResponse<StrapiProject>,
  postsJson: StrapiResponse<StrapiPost>
): { projects: Project[]; posts: PostMeta[] } {

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
    documentId: item.documentId,
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
      <About />
      <Stacks />
      <Experience />
      <FeaturedProjects projects={projects} />
      <LatestPosts posts={posts} />
      <ContactCta />
    </>
  );
};
export default HomePage;
