import { URL } from 'url';
import type { Route } from '../blog/+types/index';
import type { PostMeta } from '~/types';
import PostCard from '~/components/post-card';
import Pagination from '~/components/pagination';
import { useState } from 'react';

export async function loader({ request }: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL('/posts-meta.json', request.url);

  const res = await fetch(url.href);
  if (!res.ok) throw new Error('Failed to fetch posts');
  const data = await res.json();
  data.sort((a: PostMeta, b: PostMeta) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return { posts: data };
}
const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { posts } = loaderData as { posts: PostMeta[] };
  const postPerPage = 3;
  const totalPages = Math.ceil(posts.length / postPerPage);
  const lastIndex = currentPage * postPerPage;
  const firstIndex = lastIndex - postPerPage;
  const currentPosts = posts.slice(firstIndex, lastIndex);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-white">📝 Blog</h2>
      {currentPosts.map((post: PostMeta) => (
        <PostCard key={post.slug} post={post} />
      ))}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default BlogPage;
