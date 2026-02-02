import { useState } from "react";
import CourseCard from "./CourseCard";
import TabsButtons from "./TabsButtons";
import { useSearch } from "../hooks/useSearch";
import { useCourse } from "../hooks/useCourse";

// 1. Create Mock Data
// This simulates what the Backend would send you

function CouseGrid() {
  const { handleToggleFavorite, handleOpenCourse, courses } = useCourse();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tabs, setTabs] = useState("All");
  const { filteredCourses } = useSearch(courses, searchTerm, tabs);
  // 2. Mock Interactions

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
}

export default CouseGrid;
