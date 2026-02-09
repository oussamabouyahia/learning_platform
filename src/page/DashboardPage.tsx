// src/pages/DashboardPage.tsx

import { useState } from "react";
import CourseGrid from "../features/course/components/CourseGrid";
import { useCourses } from "../features/course/hooks/useCourse";
import { useDebounce } from "use-debounce";
import { useSearch } from "../features/course/hooks/useSearch";

export const DashboardPage = () => {
  const { handleToggleFavorite, handleOpenCourse, courses, error, isLoading } =
    useCourses();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouceTerm] = useDebounce(searchTerm, 500);
  const [tabs, setTabs] = useState("All");
  const { filteredCourses } = useSearch(courses, debouceTerm, tabs);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* You can add a global Navigation Bar here later */}
      <CourseGrid
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        tabs={tabs}
        setTabs={setTabs}
        courses={filteredCourses}
        handleOpenCourse={handleOpenCourse}
        handleToggleFavorite={handleToggleFavorite}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};
