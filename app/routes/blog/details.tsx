/* @refresh reload */
import Markdown from 'react-markdown';
import type { Route } from './+types/details';
import type { PostMeta, StrapiResponse, StrapiPost } from '~/types';
import { Link } from 'react-router';

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params as { slug: string };

  // const url = new URL(`/posts-meta.json`, request.url);
  // const res = await fetch(url.href);
  const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${slug}?populate=*`);
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  // const postsMeta = await res.json();

  // const post: PostMeta = postsMeta.find((post: PostMeta) => post.slug === slug);
  const json = await res.json();

  if (!json)
    throw new Response('Post not found.', {
      status: 404,
    });
  // dynamically import markdown

  // const markdown = await import(`../../posts/${slug}.md?raw`);
  const item: StrapiPost = json.data;

  const post: PostMeta = {
    id: item.id,
    documentId: item.documentId,
    body: item.body,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    date: item.date,
    image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
  };

  return {
    post,
    // markdown: markdown.default,
  };
}
type BlogPostDetailsPageProps = {
  loaderData: {
    post: PostMeta;
    markdown?: string;
  };
};

const BlogPostDetailsPage = ({ loaderData }: any) => {
  const { post } = loaderData as { post: PostMeta };

  return (
    <article>
      <Link to="/blog" className="text-sm text-muted transition hover:text-fg">
        ← Back to posts
      </Link>
      <time className="label mt-8 block">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
      <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight">{post.title}</h1>
      <img
        src={post.image}
        alt={post.title}
        className="mt-6 h-64 w-full rounded-xl object-cover ring-1 ring-line"
      />
      <div className="prose prose-theme mt-8 max-w-none">
        <Markdown>{post.body}</Markdown>
      </div>
    </article>
  );
};

export default BlogPostDetailsPage;
