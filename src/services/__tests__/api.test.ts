import { describe, it, expect, vi } from "vitest";
import { api } from "../api";

describe("api.completeModule", () => {
  it("should correctly calculate progress when a module is completed", async () => {
    const mockCourse = {
      id: "1",
      title: "Test Course",
      thumbnailUrl: "http://example.com/image.jpg",
      duration: "120",
      author: "Test Author",
      isFavorite: false,
      description: "A course for testing",
      modules: [
        { id: "m1", title: "Module 1", completed: false },
        { id: "m2", title: "Module 2", completed: false },
      ],
      progress: 0,
    };

    // api mocks
    vi.spyOn(api, "getCourseById").mockResolvedValue(mockCourse);
    const updateSpy = vi
      .spyOn(api, "updateCourse")
      .mockImplementation((c) => Promise.resolve(c));

    // excution
    const result = await api.completeModule("1", "m1");
    const testDecimal = 50;
    // assertions
    expect(result.modules[0].completed).toBe(true);
    expect(result.progress).toBe(testDecimal.toFixed(2)); // 1 out of 2 modules completed
    expect(updateSpy).toHaveBeenCalledWith(
      expect.objectContaining({ progress: testDecimal.toFixed(2) }),
    );
  });

  it("should throw an error if the module does not exist", async () => {
    vi.spyOn(api, "getCourseById").mockResolvedValue({
      id: "1",
      title: "Test Course",
      thumbnailUrl: "http://example.com/image.jpg",
      duration: "120",
      author: "Test Author",
      isFavorite: false,
      description: "A course for testing",
      progress: 0,
      modules: [],
    });

    await expect(api.completeModule("1", "wrong-id")).rejects.toThrow(
      /not found/,
    );
  });
});
