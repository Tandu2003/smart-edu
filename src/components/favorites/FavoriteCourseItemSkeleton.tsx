import { Skeleton } from '@/components/ui/skeleton';

export default function FavoriteCourseItemSkeleton() {
  return (
    <div className="card p-6">
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Course Image */}
        <div className="relative lg:w-64 lg:flex-shrink-0">
          <Skeleton className="w-full h-48 lg:h-32 rounded-lg" />
          <Skeleton className="absolute top-2 left-2 w-12 h-6 rounded" />
        </div>

        {/* Course Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <div className="flex items-center space-x-4 mb-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-20 rounded" />
              </div>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-28 rounded-lg" />
              <Skeleton className="h-10 w-20 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
