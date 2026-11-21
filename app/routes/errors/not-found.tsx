import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <section className="flex min-h-[55vh] flex-col items-start justify-center">
      <p className="label">404</p>
      <h1 className="mt-3 font-serif text-5xl italic">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you’re looking for doesn’t exist. It might have been moved or deleted.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-bg transition hover:opacity-85"
      >
        Go home
      </Link>
    </section>
  );
};

export default NotFoundPage;
