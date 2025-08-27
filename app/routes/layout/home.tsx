import { Outlet } from 'react-router';
import Hero from '~/components/hero';
import type { Route } from '../layout/+types/home';
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Friendly | Web App' },
    { name: 'description', content: 'Friendly Web Application using React Router 7' },
  ];
}
const HomeLayout = () => {
  return (
    <>
      <Hero />
      <section className="max-w-6xl mx-auto px-6 my-8">
        <Outlet />
      </section>
    </>
  );
};

export default HomeLayout;
