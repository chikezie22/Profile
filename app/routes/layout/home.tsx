import { Outlet } from 'react-router';
import Hero from '~/components/hero';
import { originFromMatches, seoMeta } from '~/lib/seo';
import type { Route } from '../layout/+types/home';

export function meta({ matches }: Route.MetaArgs) {
  return seoMeta(originFromMatches(matches));
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
