import { useEffect, useState } from "react";

import type { Course } from "../types/course";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
export function useCourse() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    // Simulate fetching data

    api
      .getAllCourses()
      .then((data) => setCourses(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);
  const navigate = useNavigate();
  // ... imports

  const handleToggleFavorite = async (id: string) => {
    const courseToUpdate = courses.find((c) => c.id === id);
    if (!courseToUpdate) return;
    const updatedCourse = {
      ...courseToUpdate,
      isFavorite: !courseToUpdate.isFavorite,
    };
    setCourses((prev) =>
      prev.map((course) => (course.id === id ? updatedCourse : course)),
    );
    try {
      await api.updateCourse(updatedCourse);
    } catch (err) {
      console.error("Failed to update favorite", err);
      setCourses((prev) =>
        prev.map(
          (course) => (course.id === id ? courseToUpdate : course), // Revert to old state
        ),
      );
    }
  };
  const handleOpenCourse = (id: string) => {
    navigate(`/course/${id}`);
  };
  return {
    handleToggleFavorite,
    handleOpenCourse,
    courses,
    setCourses,
    error,
    loading,
  };
}
