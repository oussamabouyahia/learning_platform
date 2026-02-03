import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useCourses } from "../useCourse";
import { api } from "../../../../services/api";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the API Module
vi.mock("../../../../services/api", () => ({
  api: {
    getAllCourses: vi.fn(),
    updateCourse: vi.fn(),
  },
}));

// Base Data
const mockCourses = [
  { id: "1", title: "Test Course", isFavorite: false, progress: 0 },
];

describe("useCourses Hook", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    // Setup a fresh QueryClient for every test
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );

  //  Initial Fetch
  it("should fetch courses initially", async () => {
    // Simple mock
    (api.getAllCourses as any).mockResolvedValue(mockCourses);

    const { result } = renderHook(() => useCourses(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.courses).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.courses).toEqual(mockCourses);
    expect(result.current.error).toBeNull();
  });

  //  Error Handling
  it("should handle API errors", async () => {
    (api.getAllCourses as any).mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useCourses(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe("Network Error");
    expect(result.current.courses).toEqual([]);
  });

  // Toggle Favorite (The Advanced Stateful Test)
  it("should toggle favorite and call API", async () => {
    let serverData = [...mockCourses];

    // 1. Mock getAllCourses to return the dynamic serverData
    (api.getAllCourses as any).mockImplementation(() =>
      Promise.resolve(serverData),
    );

    // 2. Mock updateCourse to actually update serverData
    (api.updateCourse as any).mockImplementation((updatedCourse: any) => {
      serverData = [updatedCourse]; // Simulate DB update
      return Promise.resolve(updatedCourse);
    });

    const { result } = renderHook(() => useCourses(), { wrapper });

    // Wait for load
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // ACT: Toggle
    await act(async () => {
      result.current.handleToggleFavorite("1");
    });

    // ASSERT: Check that the UI reflects the change (via optimistic update or refetch)
    await waitFor(() => {
      expect(result.current.courses[0].isFavorite).toBe(true);
    });

    expect(api.updateCourse).toHaveBeenCalled();
  });
});
