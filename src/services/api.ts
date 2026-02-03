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
};
