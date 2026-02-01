import type { Course } from "./features/course/types/course";

export const initialCourses: Course[] = [
  {
    id: "1",
    title: "Modern React Patterns 2025",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
    duration: "4h 30m",
    author: "Sarah Drasner",
    progress: 65,
    isFavorite: true,
  },
  {
    id: "2",
    title: "Advanced TypeScript Generics",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop",
    duration: "2h 15m",
    author: "Matt Pocock",
    progress: 10,
    isFavorite: false,
  },
  {
    id: "3",
    title: "Broken Image Test",
    thumbnailUrl: "https://broken-link.com/image.jpg", // Testing our error handling
    duration: "1h 00m",
    author: "Test User",
    progress: 100,
    isFavorite: false,
  },
];
