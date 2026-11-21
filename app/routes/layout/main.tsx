import { Outlet } from 'react-router';
import { profile } from '~/data/profile';
import type { Route } from '../layout/+types/main';

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${profile.name} — ${profile.title}` },
    { name: 'description', content: profile.tagline },
  ];
}

const MainLayout = () => {
  return (
    <section className="py-10 sm:py-14">
      <Outlet />
    </section>
  );
};

export default MainLayout;
