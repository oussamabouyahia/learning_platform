import { useState } from "react";
import { initialCourses } from "../../../mockData";
import type { Course } from "../types/course";

export function useCourse() {
  // Placeholder for future course-related logic
  const [courses, setCourses] = useState<Course[]>(initialCourses);
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
  return { handleToggleFavorite, handleOpenCourse, courses, setCourses };
}
