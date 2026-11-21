import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ThemeToggle from './components/theme-toggle';
import SpiderWeb from './components/spider-web';
import SmoothScroll from './components/smooth-scroll';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/favicon-64.png' },
  { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap',
  },
];



// The site's own address, used for absolute URLs in share-preview tags. Serverless adapters
// often report "http", so force https for anything that isn't local development.
export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const local = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  return { origin: local ? url.origin : `https://${url.host}` };
}

// Runs before paint so the saved theme never flashes. Dark is the default.
const themeScript = `try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Meta />
        <Links />
      </head>
      <body>
        <SmoothScroll />
        <SpiderWeb />
        <ThemeToggle />
        <Navbar />
        <main className="mx-auto max-w-2xl px-6">{children}</main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto max-w-2xl px-6 pt-24">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
