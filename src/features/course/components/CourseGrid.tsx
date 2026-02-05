import { useState } from "react";
import CourseCard from "./CourseCard";
import TabsButtons from "./TabsButtons";
import { useSearch } from "../hooks/useSearch";
import { useCourses } from "../hooks/useCourse";

import { CourseCardSkeleton } from "./CourseCardSkeleton";

// 1. Create Mock Data
// This simulates what the Backend would send you

const CouseGrid = () => {
  const { handleToggleFavorite, handleOpenCourse, courses, error, isLoading } =
    useCourses();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tabs, setTabs] = useState("All");
  const { filteredCourses } = useSearch(courses, searchTerm, tabs);
  // 2. Mock Interactions
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    );
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
        <div className="mb-8 relative w-600">
          <input
            type="search"
            id="default-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="search a course"
            className="block  p-4 ps-10 text-sm text-gray-900 border border-gray-300
                       rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          />
        </div>
        <TabsButtons tabs={tabs} setTabs={setTabs} />
        {/* Grid Layout */}
        {filteredCourses.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            No courses found.
          </div>
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
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

export default CouseGrid;
