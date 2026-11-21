type PaginationProp = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};
const Pagination: React.FC<PaginationProp> = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-1.5">
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx + 1}
          onClick={() => onPageChange(idx + 1)}
          aria-current={currentPage === idx + 1 ? 'page' : undefined}
          className={`h-8 min-w-8 cursor-pointer rounded-md px-2 text-sm transition ${
            currentPage === idx + 1
              ? 'bg-fg text-bg'
              : 'border border-line text-soft hover:border-muted hover:text-fg'
          }`}
        >
          {idx + 1}
        </button>
      ))}
    </nav>
  );
};

export default Pagination;
