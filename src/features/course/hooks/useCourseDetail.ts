import { useState, useEffect } from "react";
import { api } from "../../../services/api"; // Adjust path
import type { Course } from "../types/course";
import { toast } from "sonner";

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
  const handleProgress = async (moduleId: string) => {
    if (!course) return;
    // optimistic update
    const updatedModules = course.modules.map((mod) =>
      mod.id === moduleId ? { ...mod, completed: true } : mod,
    );
    const completedCount = updatedModules.filter((m) => m.completed).length;
    const newProgress = (completedCount / updatedModules.length) * 100;
    const previousCourse = { ...course };
    // real-time UI update
    setCourse({
      ...course,
      modules: updatedModules,
      progress: newProgress,
    });
    try {
      await api.completeModule(course.id, moduleId);
      toast.success("Module marked as completed");
    } catch (error) {
      setCourse(previousCourse);
      toast.error("Failed to update progress. Please try again.");
    }
  };

  return { course, loading, error, handleProgress };
}
