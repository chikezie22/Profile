import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import Reveal from './reveal';
import WebDivider from './web-divider';

// Label on the left, content on the right (stacks on mobile).
export default function Section({
  id,
  label,
  icon: Icon,
  children,
}: {
  id?: string;
  label: string;
  icon?: IconType;
  children: ReactNode;
}) {
  return (
    <>
    <WebDivider />
    <section id={id} className="scroll-mt-24 py-10 md:grid md:grid-cols-[9rem_1fr] md:gap-8">
      <Reveal>
        <h2 className="label mb-5 flex items-center gap-2.5 md:mb-0">
          {Icon && (
            <span className="icon-chip">
              <Icon size={15} />
            </span>
          )}
          {label}
        </h2>
      </Reveal>
      <Reveal delay={0.05}>{children}</Reveal>
    </section>
    </>
  );
}
