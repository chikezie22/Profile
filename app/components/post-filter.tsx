type PostFilterProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

const PostFilter = ({ searchQuery, onSearchChange }: PostFilterProps) => {
  return (
    <div className="mb-8">
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search posts..."
        aria-label="Search posts"
        className="w-full rounded-lg border border-line bg-card px-3.5 py-2.5 text-sm text-fg placeholder:text-muted transition-colors focus:border-muted focus:outline-none"
      />
    </div>
  );
};

export default PostFilter;
