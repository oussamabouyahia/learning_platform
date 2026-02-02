import { renderHook } from "@testing-library/react";
import { useSearch } from "../useSearch";
import type { Course } from "../../types/course";
import { describe, it, expect } from "vitest";
// 1. Mock Data
const mockCourses: Course[] = [
  {
    id: "1",
    title: "React Basics",
    author: "John Doe",
    progress: 50, // Active
    duration: "1h",
    thumbnailUrl: "",
    isFavorite: false,
  },
  {
    id: "2",
    title: "Advanced Vue",
    author: "Jane Smith",
    progress: 100, // Completed
    duration: "2h",
    thumbnailUrl: "",
    isFavorite: false,
  },
];

describe("useSearch Hook", () => {
  // Test 1: Basic Search
  it("should filter courses by title", () => {
    // Render the hook
    const { result } = renderHook(() => useSearch(mockCourses, "Vue", "All"));

    // Assert
    expect(result.current.filteredCourses).toHaveLength(1);
    expect(result.current.filteredCourses[0].title).toBe("Advanced Vue");
    expect(result.current.filteredCourses[0].author).toBe("Jane Smith");
  });

  // Test 2: Status Filter (The "Active" Tab)
  it("should filter by Active status", () => {
    const { result } = renderHook(() => useSearch(mockCourses, "", "Active"));

    expect(result.current.filteredCourses).toHaveLength(1);
    expect(result.current.filteredCourses[0].title).toBe("React Basics");
    expect(result.current.filteredCourses[0].progress).toBe(50);
  });

  // Test 3: The "Combo" (Search + Tab)
  it("should filter by BOTH search term and status", () => {
    const { result } = renderHook(() =>
      useSearch(mockCourses, "React", "Completed"),
    );
    const { result: activeResult } = renderHook(() =>
      useSearch(mockCourses, "React", "Active"),
    );

    expect(result.current.filteredCourses).toHaveLength(0);
    expect(activeResult.current.filteredCourses).toHaveLength(1);
    expect(activeResult.current.filteredCourses[0].title).toBe("React Basics");
  });
});
