import CourseCard from "./CourseCard";

import type { CourseGridProps } from "../types/course";
import LoadingSkeleton from "../../../shared/LoadingSkeleton";

const CourseGrid = ({
  isLoading,
  error,
  courses,
  handleOpenCourse,
  handleToggleFavorite,
  headerSlot,
}: CourseGridProps) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (error) {
    return <div>Error loading courses: {error}</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Learning Path
        </h1>
        {headerSlot}
        {/* Grid Layout */}
        {courses.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            No courses found.
          </div>
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onToggleFavorite={handleToggleFavorite}
              onOpenCourse={handleOpenCourse}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseGrid;
