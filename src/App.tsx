import { useState } from "react";
import CourseCard from "./components/course/CourseCard";
import { initialCourses } from "./mockData";
import type { Course } from "./types/course";

// 1. Create Mock Data
// This simulates what the Backend would send you

function App() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  // 2. Mock Interactions
  const handleToggleFavorite = (id: string) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id
          ? { ...course, isFavorite: !course.isFavorite }
          : course,
      ),
    );
    console.log(`Toggled favorite for course ${id}`);
  };

  const handleOpenCourse = (id: string) => {
    alert(`Navigating to course ${id}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Learning Path
        </h1>

        {/* Grid Layout */}
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
}

export default App;
