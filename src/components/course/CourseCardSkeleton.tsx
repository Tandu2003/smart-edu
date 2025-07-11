import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CourseCardSkeleton() {
  return (
    <Card className="overflow-hidden shadow-md rounded-2xl p-0">
      <CardHeader className="p-0 relative">
        <Skeleton className="w-full h-48 rounded-t-2xl" />
        <Skeleton className="absolute top-3 right-3 w-8 h-8 rounded-full" />
        <Skeleton className="absolute top-3 left-3 w-12 h-6 rounded" />
        <Skeleton className="absolute bottom-3 left-3 w-16 h-6 rounded" />
      </CardHeader>
      <CardContent className="p-4">
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-3" />
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex items-center space-x-1">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col space-y-2">
        <Skeleton className="w-full h-12 rounded-xl" />
        <Skeleton className="w-full h-12 rounded-xl" />
      </CardFooter>
    </Card>
  );
}
