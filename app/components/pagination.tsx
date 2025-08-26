type PaginationProp = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};
const Pagination: React.FC<PaginationProp> = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center items-center w-full gap-2 mt-4 mx-auto">
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx + 1}
          onClick={() => onPageChange(idx + 1)}
          className={`px-3 py-1 cursor-pointer rounded ${
            currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'
          }`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
