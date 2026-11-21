import { Outlet } from 'react-router';
import Hero from '~/components/hero';
import { profile } from '~/data/profile';
import type { Route } from '../layout/+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${profile.name} — ${profile.title}` },
    { name: 'description', content: profile.tagline },
  ];
}

const HomeLayout = () => {
  return (
    <>
      <Hero />
      <Outlet />
    </>
  );
};

export default HomeLayout;
