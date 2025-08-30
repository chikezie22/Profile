import Markdown from 'react-markdown';
import type { Route } from './+types';
import { URL } from 'url';
import type { PostMeta } from '~/types';
import { Link } from 'react-router';

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params as { slug: string };
  console.log(slug);

  const url = new URL(`/posts-meta.json`, request.url);
  const res = await fetch(url.href);
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  const postsMeta = await res.json();

  const post: PostMeta = postsMeta.find((post: PostMeta) => post.slug === slug);
  console.log(post);
  if (!post)
    throw new Response('Post not found.', {
      status: 404,
    });
  // dynamically import markdown
  const markdown = await import(`../../posts/${slug}.md?raw`);

  return {
    post,
    markdown: markdown.default,
  };
}
type BlogPostDetailsPageProps = {
  loaderData: {
    post: PostMeta;
    markdown: string;
  };
};

const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
  const { post, markdown } = loaderData;

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
      <div className="prose prose-invert max-w-none mb-12">
        <Markdown>{markdown}</Markdown>
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
