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
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-400 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-6">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </p>
      <img src={post.image} alt={post.title} className="w-full h-64 object-cover mb-4" />
      <div className="prose prose-invert max-w-none mb-12">
        <Markdown>{post.body}</Markdown>
      </div>
      <div className="text-center">
        <Link
          to="/blog"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ← Go Back to Posts
        </Link>
      </div>
    </div>
  );
};

export default BlogPostDetailsPage;
