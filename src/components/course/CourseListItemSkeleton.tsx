import { Skeleton } from '@/components/ui/skeleton';

export default function CourseListItemSkeleton() {
  return (
    <div className="card p-6">
      <div className="flex space-x-6">
        {/* Course Image with Badges */}
        <div className="relative flex-shrink-0">
          <Skeleton className="w-48 h-32 rounded-lg" />
          <Skeleton className="absolute top-2 right-2 w-8 h-8 rounded-full" />
          <Skeleton className="absolute top-2 left-2 w-12 h-6 rounded" />
          <Skeleton className="absolute bottom-2 left-2 w-16 h-6 rounded" />
        </div>

        {/* Course Info */}
        <div className="flex-1 min-w-0">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/3 mb-3" />

          {/* Rating and Duration */}
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center space-x-1">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Action Buttons - Vertical Layout */}
        <div className="flex flex-col space-y-3 flex-shrink-0">
          <Skeleton className="w-32 h-12 rounded-lg" />
          <Skeleton className="w-32 h-12 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
