// src/features/course/hooks/useCourse.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../services/api";
import type { Course } from "../types/course";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Keys for caching
export const courseKeys = {
  all: ["courses"] as const,
  lists: () => [...courseKeys.all, "list"] as const,
  detail: (id: string) => [...courseKeys.all, "detail", id] as const,
};

export function useCourses() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // 1. Fetching (The "Source of Truth")
  const {
    data: courses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: courseKeys.lists(),
    queryFn: api.getAllCourses,
  });

  // 2. Mutation (The "Updater")
  const toggleFavoriteMutation = useMutation({
    mutationFn: (course: Course) => api.updateCourse(course),

    // Optimistic Update Logic
    onMutate: async (updatedCourse) => {
      // Cancel background refetches
      await queryClient.cancelQueries({ queryKey: courseKeys.lists() });

      // Snapshot the previous value
      const previousCourses = queryClient.getQueryData<Course[]>(
        courseKeys.lists(),
      );

      // Optimistically update
      if (previousCourses) {
        queryClient.setQueryData<Course[]>(
          courseKeys.lists(),
          (old) =>
            old?.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)) ||
            [],
        );
      }

      return { previousCourses };
    },
    onSuccess: (_, variables) => {
      // 'variables' contains the data of the mutation (the course object)
      const status = variables.isFavorite ? "Added to" : "Removed from";
      toast.success(`${status} Favorites`);
    },

    // If API fails, roll back
    onError: (err, newTodo, context) => {
      console.error("Error updating favorite:", err, newTodo);
      if (context?.previousCourses) {
        queryClient.setQueryData(courseKeys.lists(), context.previousCourses);
      }
      toast.error("Failed to update favorite");
    },

    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
    },
  });

  // 3. The Handler
  const handleToggleFavorite = (id: string) => {
    const course = courses.find((c) => c.id === id);
    if (course) {
      // ⚡️ Triggers the mutation defined above
      toggleFavoriteMutation.mutate({
        ...course,
        isFavorite: !course.isFavorite,
      });
    }
  };
  const handleOpenCourse = (id: string) => {
    navigate(`/course/${id}`);
    alert(`Navigate to course with ID: ${id}`);
  };

  return {
    courses,
    isLoading,
    error: error ? (error as Error).message : null,
    handleToggleFavorite,
    handleOpenCourse,
  };
}
