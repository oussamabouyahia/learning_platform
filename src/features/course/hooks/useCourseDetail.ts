import { useState, useEffect } from "react";
import { api } from "../../../services/api"; // Adjust path
import type { Course } from "../types/course";

export function useCourseDetail(courseId: string | undefined) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;

    setLoading(true);
    api
      .getCourseById(courseId)
      .then((data) => {
        setCourse(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setCourse(null);
      })
      .finally(() => setLoading(false));
  }, [courseId]);

  return { course, loading, error };
}
