import { URL } from 'url';
import type { Route } from '../blog/+types/index';
import type { PostMeta } from '~/types';
import PostCard from '~/components/post-card';
export async function loader({ request }: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL('/posts-meta.json', request.url);
  console.log(url);
  const res = await fetch(url.href);
  if (!res.ok) throw new Error('Failed to fetch posts');
  const data = await res.json();
  return { posts: data };
}
const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData as { posts: PostMeta[] };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-white">📝 Blog</h2>
      {posts.map((post: PostMeta) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default BlogPage;
