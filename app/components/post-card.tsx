import { Link } from 'react-router';
import type { PostMeta } from '~/types';

const PostCard = ({ post }: { post: PostMeta }) => {
  return (
    <article className="group border-b border-line py-6 first:pt-0">
      <Link to={`/blog/${post.documentId}`} className="block">
        <time className="label">
          {new Date(post.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>
        <h3 className="mt-2 text-xl font-medium text-fg group-hover:underline group-hover:decoration-muted group-hover:underline-offset-4">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        <span className="mt-3 inline-block text-sm text-soft transition group-hover:translate-x-0.5">
          Read more →
        </span>
      </Link>
    </article>
  );
};

export default PostCard;
