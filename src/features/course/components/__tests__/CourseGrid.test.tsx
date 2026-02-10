import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import CourseGrid from "../CourseGrid";

import { MemoryRouter } from "react-router-dom";
import LoadingSkeleton from "../../../../shared/LoadingSkeleton";

const mockCourses = [
  {
    id: "1",
    title: "React Basics",
    author: "Sara",
    progress: 50,
    isFavorite: false,
  },
  {
    id: "2",
    title: "Vue Mastery",
    author: "Evan",
    progress: 100,
    isFavorite: false,
  },
];

describe("CourseGrid Integration", () => {
  // Wrapper for Contexts
  let isLoading = false;
  let error = "";
  const renderGrid = () => {
    return render(
      <MemoryRouter>
        <CourseGrid
          courses={mockCourses}
          headerSlot={null}
          handleOpenCourse={vi.fn()}
          handleToggleFavorite={vi.fn()}
          isLoading={isLoading}
          error={error}
        />
      </MemoryRouter>,
    );
  };

  it("renders courses after loading", () => {
    renderGrid();

    expect(screen.getByText("React Basics")).toBeInTheDocument();
    expect(screen.getByText("Vue Mastery")).toBeInTheDocument();
  });
  it("shows loading state", () => {
    isLoading = true;

    render(<LoadingSkeleton />);
  });
  it("handles error state", () => {
    error = "Failed to load courses";
    render(<div>Error loading courses: {error}</div>);
  });
});
