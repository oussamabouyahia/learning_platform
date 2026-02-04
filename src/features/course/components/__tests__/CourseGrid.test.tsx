import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CourseGrid from "../CourseGrid";
import { api } from "../../../../services/api";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1. Mock the API (Network Layer)
vi.mock("../../../../services/api", () => ({
  api: {
    getAllCourses: vi.fn(),
    updateCourse: vi.fn(),
  },
}));

// Mock Data
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
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    // Fresh QueryClient for every test
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
  });

  // Wrapper for Contexts
  const renderGrid = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CourseGrid />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  };

  it("renders courses after loading", async () => {
    // Setup Mock
    (api.getAllCourses as any).mockResolvedValue(mockCourses);

    renderGrid();

    // 1. Check Loading State

    // 2. Wait for Data
    await waitFor(() => {
      expect(screen.getByText("React Basics")).toBeInTheDocument();
      expect(screen.getByText("Vue Mastery")).toBeInTheDocument();
    });
  });

  it("filters courses when searching", async () => {
    (api.getAllCourses as any).mockResolvedValue(mockCourses);
    renderGrid();

    // Wait for load
    await waitFor(() =>
      expect(screen.getByText("Vue Mastery")).toBeInTheDocument(),
    );

    // 1. Find Search Input & Type "Vue"
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "Vue" } });

    // 2. Expect "React" to disappear and "Vue" to stay
    await waitFor(() => {
      expect(screen.queryByText("React Basics")).not.toBeInTheDocument();
      expect(screen.getByText("Vue Mastery")).toBeInTheDocument();
    });
  });

  it("handles the Empty State", async () => {
    (api.getAllCourses as any).mockResolvedValue(mockCourses);
    renderGrid();

    await waitFor(() => screen.getByText("React Basics"));

    // Search for nonsense
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "Angular" },
    });

    // Expect "No courses found" (or whatever your empty state text is)
    await waitFor(() => {
      expect(screen.getByText(/no courses found/i)).toBeInTheDocument(); // Update text to match your UI
    });
  });
});
