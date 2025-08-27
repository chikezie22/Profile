import { Outlet } from 'react-router';
import type { Route } from '../layout/+types/main';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Friendly | Web App' },
    { name: 'description', content: 'Friendly Web Application using React Router 7' },
  ];
}
const MainLayout = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 my-8">
      <Outlet />
    </section>
  );
};

export default MainLayout;
