import type { Course } from "../features/course/types/course";

const API_URL = "http://localhost:3001/courses";
export const api = {
  getAllCourses: async (): Promise<Course[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }
    return response.json();
  },
  getCourseById: async (id: string): Promise<Course> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch course with id: ${id}`);
    }
    return response.json();
  },
  updateCourse: async (course: Course): Promise<Course> => {
    const response = await fetch(`${API_URL}/${course.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });
    if (!response.ok) {
      throw new Error(`Failed to update course with id: ${course.id}`);
    }
    return response.json();
  },
  completeModule: async (
    courseId: string | undefined,
    moduleId: string,
  ): Promise<Course> => {
    const course = await api.getCourseById(courseId!);
    const targetModule = course.modules.find((mod) => mod.id === moduleId);
    if (!targetModule) {
      throw new Error(
        `Module with id: ${moduleId} not found in course ${courseId}`,
      );
    }
    targetModule.completed = true;
    const completedCount = course.modules.filter((mod) => mod.completed).length;
    const totalModules = course.modules.length;
    course.progress = Number(
      ((completedCount / totalModules) * 100).toFixed(2),
    );
    return api.updateCourse(course);
  },
};
