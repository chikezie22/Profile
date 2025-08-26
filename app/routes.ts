import { type RouteConfig, index, route, layout } from '@react-router/dev/routes';

export default [
  layout('./routes/layout/home.tsx', [index('routes/home/index.tsx')]),
  layout('./routes/layout/main.tsx', [
    route(`about`, `./routes/about/index.tsx`),
    route('contact', './routes/contact/index.tsx'),
    route('blog', './routes/blog/index.tsx'),
    route('projects', './routes/projects/index.tsx'),
    route('projects/:id', './routes/projects/details.tsx'),
  ]),
] satisfies RouteConfig;
