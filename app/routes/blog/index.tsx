import type { Route } from './+types/index';
import type { PostMeta, StrapiResponse, StrapiPost } from '~/types';
import PostCard from '~/components/post-card';
import Pagination from '~/components/pagination';
import { useState } from 'react';
import PostFilter from '~/components/post-filter';

export async function loader({ request }: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  // const url = new URL('/posts-meta.json', request.url);

  // const res = await fetch(url.href);
  const res = await fetch(`${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  const json: StrapiResponse<StrapiPost> = await res.json();

  const data = json.data.map((item) => ({
    id: item.id,
    title: item.title,
    documentId: item.documentId,
    excerpt: item.excerpt,
    slug: item.slug,
    date: item.date,
    body: item.body,
    image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
  }));

  return { posts: data };
}
const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { posts } = loaderData as { posts: PostMeta[] };

  const postPerPage = 3;

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery?.toLocaleLowerCase();
    return (
      post.title.toLocaleLowerCase().includes(query) ||
      post.excerpt.toLocaleLowerCase().includes(query)
    );
  });

  const lastIndex = currentPage * postPerPage;
  const firstIndex = lastIndex - postPerPage;
  const currentPosts = filteredPosts.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredPosts.length / postPerPage);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-white">📝 Blog</h2>
      <PostFilter
        searchQuery={searchQuery}
        onSearchChange={(searchQuery) => {
          setSearchQuery(searchQuery);
          setCurrentPage(1);
        }}
      />
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
