import { Link } from 'react-router';
import type { PostMeta } from '~/types';
import Section from './section';

type LatestPostsProps = {
  posts: PostMeta[];
  limit?: number;
};

const LatestPosts = ({ posts, limit = 3 }: LatestPostsProps) => {
  const latest = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  if (latest.length === 0) return null;

  return (
    <Section id="writing" label="Writing">
      <ul className="divide-y divide-line border-y border-line">
        {latest.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.documentId ?? post.slug}`} className="group block py-3.5">
              <span className="flex items-baseline justify-between gap-4">
                <span className="font-medium text-fg group-hover:underline group-hover:decoration-muted group-hover:underline-offset-4">
                  {post.title}
                </span>
                <time className="shrink-0 text-xs text-muted">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </time>
              </span>
              <span className="mt-1 block text-sm text-muted">{post.excerpt}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-muted">
        <Link to="/blog" className="link-dot">
          Read all posts →
        </Link>
      </p>
    </Section>
  );
};

export default LatestPosts;
