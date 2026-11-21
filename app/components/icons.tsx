import type { IconType } from 'react-icons';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { MdCode } from 'react-icons/md';
import {
  SiAngular,
  SiDocker,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiReactquery,
  SiRedux,
  SiSupabase,
  SiTailwindcss,
  SiTurborepo,
  SiTypescript,
} from 'react-icons/si';

// Brand icons for the stack chips. Anything without a brand icon falls back to a Material one.
const techIcons: Record<string, IconType> = {
  React: SiReact,
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
  'Node.js': SiNodedotjs,
  NestJS: SiNestjs,
  Angular: SiAngular,
  'Tailwind CSS': SiTailwindcss,
  'TanStack Query': SiReactquery,
  'Redux Toolkit': SiRedux,
  PostgreSQL: SiPostgresql,
  Prisma: SiPrisma,
  MongoDB: SiMongodb,
  Supabase: SiSupabase,
  Docker: SiDocker,
  Turborepo: SiTurborepo,
};

export const techIcon = (name: string): IconType => techIcons[name] ?? MdCode;

const socialIcons: Record<string, IconType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedinIn,
};

export const socialIcon = (label: string): IconType | undefined => socialIcons[label];
