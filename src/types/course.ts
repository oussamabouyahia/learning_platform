export interface Course {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string; // Might be broken URL
  duration: string; // in minutes (e.g., 90)
  author: string;
  progress: number; // 0 to 100
  isFavorite: boolean;
}

export interface CourseCardProps {
  course: Course;
  onToggleFavorite: (id: string) => void;
  onOpenCourse: (id: string) => void;
}
