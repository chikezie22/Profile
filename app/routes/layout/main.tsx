import { Outlet } from 'react-router';
import { originFromMatches, seoMeta } from '~/lib/seo';
import type { Route } from '../layout/+types/main';

export function meta({ matches }: Route.MetaArgs) {
  return seoMeta(originFromMatches(matches));
}

const MainLayout = () => {
  return (
    <section className="py-10 sm:py-14">
      <Outlet />
    </section>
  );
};

export default MainLayout;
