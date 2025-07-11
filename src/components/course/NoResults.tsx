interface NoResultsProps {
  onClearFilters: () => void;
}

export default function NoResults({ onClearFilters }: NoResultsProps) {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy khóa học</h3>
      <p className="text-gray-600 mb-4">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
      <button onClick={onClearFilters} className="btn-primary">
        Xóa bộ lọc
      </button>
    </div>
  );
}
