interface FavoritesStatsProps {
  count: number;
  totalValue: number;
  totalSavings: number;
  totalOriginalValue: number;
  formatPrice: (price: number) => string;
}

export default function FavoritesStats({
  count,
  totalValue,
  totalSavings,
  totalOriginalValue,
  formatPrice,
}: FavoritesStatsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        <div>
          <div className="text-2xl font-bold text-blue-600 mb-1">{count}</div>
          <div className="text-sm text-gray-600">Khóa học yêu thích</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600 mb-1">{formatPrice(totalValue)}</div>
          <div className="text-sm text-gray-600">Tổng giá trị</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-red-600 mb-1">{formatPrice(totalSavings)}</div>
          <div className="text-sm text-gray-600">Tiết kiệm được</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {totalOriginalValue > 0 ? Math.round((totalSavings / totalOriginalValue) * 100) : 0}%
          </div>
          <div className="text-sm text-gray-600">Giảm giá trung bình</div>
        </div>
      </div>
    </div>
  );
}
