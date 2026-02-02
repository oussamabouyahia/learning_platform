import { renderHook, act } from "@testing-library/react";
import { useCourse } from "../useCourse";
import type { Course } from "../../types/course";
import { describe, it, expect } from "vitest";
import { vi } from "vitest";
import { initialCourses } from "../../../../mockData";

// 1. Mock Data
const mockCourses: Course[] = initialCourses;

// Mock the module to use mockCourses instead of real data
vi.mock("../../../mockData", () => ({
  initialCourses: mockCourses,
}));

describe("useCourse hook", () => {
  it("should initialize with courses from mockData", () => {
    const { result } = renderHook(() => useCourse());
    expect(result.current.courses).toEqual(mockCourses);
  });

  it("should toggle isFavorite for a course", () => {
    const { result } = renderHook(() => useCourse());
    act(() => {
      result.current.handleToggleFavorite("2");
    });
    expect(result.current.courses.find((c) => c.id === "2")?.isFavorite).toBe(
      true,
    );

    act(() => {
      result.current.handleToggleFavorite("1");
    });
    expect(result.current.courses.find((c) => c.id === "1")?.isFavorite).toBe(
      false,
    );
  });

  it("should not change isFavorite for non-existent course id", () => {
    const { result } = renderHook(() => useCourse());
    const before = [...result.current.courses];
    act(() => {
      result.current.handleToggleFavorite("999");
    });
    expect(result.current.courses).toEqual(before);
  });

  it("should call alert when handleOpenCourse is called", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    const { result } = renderHook(() => useCourse());
    act(() => {
      result.current.handleOpenCourse("1");
    });
    expect(alertMock).toHaveBeenCalledWith("Navigating to course 1...");
    alertMock.mockRestore();
  });

  it("should allow direct setCourses", () => {
    const { result } = renderHook(() => useCourse());
    act(() => {
      result.current.setCourses([]);
    });
    expect(result.current.courses).toEqual([]);
  });
});
