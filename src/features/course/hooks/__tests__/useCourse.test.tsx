import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useCourse } from "../useCourse";
import { api } from "../../../../services/api"; // Check your path!
import { MemoryRouter } from "react-router-dom"; //

// 1. Mock the API Module
// This tells Vitest: "Don't use the real api.ts file, let me define what it does."
vi.mock("../../../../services/api", () => ({
  api: {
    getAllCourses: vi.fn(),
    updateCourse: vi.fn(),
  },
}));

// Mock Data
const mockCourses = [
  { id: "1", title: "Test Course", isFavorite: false, progress: 0 },
];
describe("useCourse Hook", () => {
  // Clear mocks before each test so call counts reset
  beforeEach(() => {
    vi.clearAllMocks();
  });
  // Helper to wrap hook in Router (Fixes "useNavigate() may be used only in context...")
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>{children}</MemoryRouter>
  );

  it("should fetch courses initially", async () => {
    // 1. Setup the mock response
    (api.getAllCourses as any).mockResolvedValue(mockCourses);

    // 2. Render the hook
    const { result } = renderHook(() => useCourse(), { wrapper });

    // 3. Initial State Check (Synchronous)
    expect(result.current.loading).toBe(true);
    expect(result.current.courses).toEqual([]);

    // 4. Wait for the Async Update
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // 5. Assert Final State
    expect(result.current.courses).toEqual(mockCourses);
    expect(result.current.error).toBeNull();
  });

  it("should handle API errors", async () => {
    // 1. Mock a failure
    (api.getAllCourses as any).mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useCourse(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Network Error");
    expect(result.current.courses).toEqual([]);
  });

  it("should toggle favorite and call API", async () => {
    // Start with data loaded
    (api.getAllCourses as any).mockResolvedValue(mockCourses);
    (api.updateCourse as any).mockResolvedValue({}); // Success response

    const { result } = renderHook(() => useCourse(), { wrapper });

    // Wait for load
    await waitFor(() => expect(result.current.loading).toBe(false));

    // ACT: Toggle Favorite
    await act(async () => {
      result.current.handleToggleFavorite("1");
    });

    // ASSERT 1: Optimistic UI Update (Instant)
    expect(result.current.courses[0].isFavorite).toBe(true);

    // ASSERT 2: API Call (Side Effect)
    // We expect the API to be called with the UPDATED object
    expect(api.updateCourse).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "1",
        isFavorite: true,
      }),
    );
  });
});
