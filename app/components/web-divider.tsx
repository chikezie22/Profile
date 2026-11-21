// A single web thread that sags between sections, with a dew bead hanging from it.
export default function WebDivider() {
  return (
    <div aria-hidden className="relative h-6 w-full">
      <svg viewBox="0 0 600 24" preserveAspectRatio="none" className="h-full w-full">
        <path d="M0 2 Q300 18 600 2" className="web-thread" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="absolute left-1/2 top-[9px] flex -translate-x-1/2 flex-col items-center">
        <span className="h-1.5 w-px bg-[var(--web)]" />
        <span className="web-bead h-1.5 w-1.5 rounded-full" />
      </span>
    </div>
  );
}
