import { useMemo } from "react";
import type { Course } from "../types/course";

export function useSearch(courses: Course[], searchTerm: string, tabs: string) {
  const matchSearchInput = (course: Course) => {
    const title = course.title.toLowerCase();
    const author = course.author.toLowerCase();
    const term = searchTerm.toLowerCase().trim();
    return title.includes(term) || author.includes(term);
  };
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (tabs === "Active")
        return course.progress < 100 && matchSearchInput(course);
      else if (tabs === "Completed")
        return course.progress === 100 && matchSearchInput(course);
      else return matchSearchInput(course);
    });
  }, [courses, tabs, searchTerm]);
  return { filteredCourses };
}
