import { Skeleton } from "../../../shared/Skeleton";

export const CourseCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Thumbnail */}
      <Skeleton className="w-full h-48" />

      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <Skeleton className="h-6 w-3/4 mb-4" />

        {/* Author */}
        <Skeleton className="h-4 w-1/2 mb-6" />

        {/* Progress Bar */}
        <div className="mt-auto">
          <Skeleton className="h-2 w-full rounded-full" />
          <div className="flex justify-between mt-2">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};
