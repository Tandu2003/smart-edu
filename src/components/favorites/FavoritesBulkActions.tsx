import { Button } from '@/components/ui/button';

interface FavoritesBulkActionsProps {
  count: number;
  totalValue: number;
  formatPrice: (price: number) => string;
  onRemoveAll: () => void;
  onBuyAll: () => void;
}

export default function FavoritesBulkActions({
  count,
  totalValue,
  formatPrice,
  onRemoveAll,
  onBuyAll,
}: FavoritesBulkActionsProps) {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="text-sm text-gray-600">
          Bạn có {count} khóa học trong danh sách yêu thích
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={onRemoveAll}>
            Xóa tất cả
          </Button>
          <Button onClick={onBuyAll}>Mua tất cả ({formatPrice(totalValue)})</Button>
        </div>
      </div>
    </div>
  );
}
