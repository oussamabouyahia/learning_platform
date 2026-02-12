import { describe, it, expect, vi } from "vitest";
import { api } from "../api";

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
    { id: "m3", title: "Module 3", completed: false },
  ],
  progress: 0,
};
describe("api.completeModule", () => {
  it("should correctly calculate progress when a module is completed", async () => {
    // api mocks
    vi.spyOn(api, "getCourseById").mockResolvedValue(mockCourse);
    const updateSpy = vi
      .spyOn(api, "updateCourse")
      .mockImplementation((c) => Promise.resolve(c));

    // excution
    const result = await api.completeModule("1", "m1");
    const testDecimal = 33.33;
    // assertions
    expect(result.modules[0].completed).toBe(true);
    expect(result.progress).toBe(Number(testDecimal.toFixed(2))); // 1 out of 3 modules completed
    expect(updateSpy).toHaveBeenCalledWith(
      expect.objectContaining({ progress: Number(testDecimal.toFixed(2)) }),
    );
  });

  it("should throw an error if the module does not exist", async () => {
    vi.spyOn(api, "getCourseById").mockResolvedValue({
      ...mockCourse,
      modules: [],
    });

    await expect(api.completeModule("1", "wrong-id")).rejects.toThrow(
      /not found/,
    );
  });
});
