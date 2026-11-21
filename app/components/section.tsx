import type { ReactNode } from 'react';
import Reveal from './reveal';

// Label on the left, content on the right (stacks on mobile).
export default function Section({
  id,
  label,
  children,
}: {
  id?: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-10 md:grid md:grid-cols-[9rem_1fr] md:gap-8">
      <Reveal>
        <h2 className="label mb-5 md:mb-0 md:pt-1">{label}</h2>
      </Reveal>
      <Reveal delay={0.05}>{children}</Reveal>
    </section>
  );
}
