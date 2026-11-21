// Single place to edit the content of the one-page portfolio.

export const profile = {
  name: 'Chikezie Simon',
  firstName: 'Chike',
  title: 'Software Engineer',
  tagline:
    'I build scalable web apps across the stack, from polished React interfaces to NestJS APIs and fintech integrations.',
  location: 'Jos, Nigeria',
  email: 'simonchikezie44@gmail.com',
  avatar: '/images/github-avatar.jpg',
  resume: '/chikezie-simon-resume.pdf',
  openToWork: true,
  bio: [
    'Software Engineer with 4+ years of experience building scalable web applications. Strong frontend foundation in React, Next.js and TypeScript, backed by hands-on work in NestJS, Node.js, Prisma and PostgreSQL.',
    'I’ve delivered full-stack SaaS products, multi-tenant monorepo platforms, a loan origination and repayment API, and AI-integrated tools. I also care about teaching, mentoring and sharing what I learn.',
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/chikezie22' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/chikezie-simon' },
  ],
};

export const stack = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'NestJS',
  'Angular',
  'Tailwind CSS',
  'TanStack Query',
  'Redux Toolkit',
  'Zustand',
  'PostgreSQL',
  'Prisma',
  'MongoDB',
  'Supabase',
  'Docker',
  'Turborepo',
];

export type Experience = {
  period: string;
  role: string;
  company: string;
  location: string;
  points: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    period: 'Sep 2025 – Present',
    role: 'Next.js Developer',
    company: 'MangoZest',
    location: 'Canada · Remote',
    points: [
      'Building Tradia, a Turborepo monorepo e-commerce platform with four apps (merchant dashboard, buyer auth, buyer dashboard, storefront) sharing common packages.',
      'Engineered subdomain-based multi-tenant routing with Next.js middleware, passing tenant headers to Server Components and preventing infinite rewrite loops.',
      'Implemented buyer auth (login, signup, 2FA, SSO, password reset) managing session state with RTK Query, Redux Toolkit and Zustand.',
      'Developed Swifly, a platform connecting artisans to clients, with TanStack Query, TypeScript and Docker-based deployment pipelines.',
    ],
    tags: ['Next.js', 'Turborepo', 'RTK Query', 'Zustand', 'Docker'],
  },
  {
    period: 'Sep 2025 – Sep 2026',
    role: 'Software Engineer',
    company: 'Cartolinks',
    location: 'United Kingdom · Remote',
    points: [
      'Architected and delivered Soloa AI, a full-stack SaaS app, using Next.js and Supabase with serverless Edge Functions and custom API routes.',
      'Integrated Replicate generative AI models for in-app media and content generation.',
    ],
    tags: ['Next.js', 'Supabase', 'Edge Functions', 'Replicate'],
  },
  {
    period: 'Jul 2026 – Sep 2026',
    role: 'Frontend Engineer (Contract)',
    company: 'Finclusion Group',
    location: 'Remote',
    points: [
      'Built frontend screens for VidVerify, a video evidence and KYC verification platform, delivering React Query setup, TypeScript patterns and Docker fixes under a tight deadline.',
    ],
    tags: ['React', 'React Query', 'TypeScript', 'Docker'],
  },
  {
    period: 'Jun 2026 – Sep 2026',
    role: 'Backend Engineer (Contract)',
    company: 'HHHoldings',
    location: 'United States · Remote',
    points: [
      'Developed Sure Repay, a NestJS loan origination and repayment platform with Prisma ORM, PostgreSQL and Swagger-documented REST APIs.',
      'Integrated the Mono Direct Debit API for repayment mandates and audited SSO, BVN, KYC, credit bureau and wallet clients.',
      'Resolved Prisma schema drift between local and staging, and fixed a token-expiry redirect loop in a NextAuth integration.',
    ],
    tags: ['NestJS', 'Prisma', 'PostgreSQL', 'Mono API'],
  },
  {
    period: 'Apr 2025 – Sep 2025',
    role: 'Frontend Engineer',
    company: 'Erande',
    location: 'Lagos, Nigeria',
    points: [
      'Led frontend development with React, Tailwind CSS and Zustand across customer, vendor and delivery modules.',
      'Conducted code reviews and mentored junior engineers, contributing to a 15% improvement in team delivery KPIs.',
    ],
    tags: ['React', 'Tailwind CSS', 'Zustand'],
  },
  {
    period: 'Sep 2024 – Aug 2025',
    role: 'Frontend Engineer (Contract)',
    company: 'GeeCore Limited',
    location: 'Calabar, Nigeria',
    points: [
      'Developed and optimized React and Node.js web apps with AI-powered API integrations for real-time user engagement.',
      'Designed automated test workflows and fixed bugs to improve deployment reliability.',
    ],
    tags: ['React', 'Node.js', 'AI APIs'],
  },
  {
    period: 'Sep 2022 – Nov 2023',
    role: 'Lead Frontend Engineer',
    company: 'Sohclick',
    location: 'Jos, Nigeria',
    points: [
      'Built web apps with Angular, Node.js and MongoDB, architected RESTful APIs and led cross-functional agile teams.',
    ],
    tags: ['Angular', 'Node.js', 'MongoDB'],
  },
  {
    period: 'Jun 2021 – Aug 2022',
    role: 'Software Engineering Intern',
    company: 'Plateau State ICT Development Agency',
    location: 'Jos, Nigeria',
    points: ['Built and debugged applications, implemented responsive UI and improved platform accessibility.'],
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
];

export const education = {
  period: '2017 – 2021',
  degree: 'B.Sc. Computer Science Education',
  school: 'University of Jos',
  note: 'CGPA 4.2 / 5.0',
};
