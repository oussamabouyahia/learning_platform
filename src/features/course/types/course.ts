export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string; // Might be broken URL
  duration: string; // in minutes (e.g., 90)
  author: string;
  progress: number; // 0 to 100
  isFavorite: boolean;
  modules?: Module[];
}

export interface CourseCardProps {
  course: Course;
  onToggleFavorite: (id: string) => void;
  onOpenCourse: (id: string) => void;
}
export interface TabsProps {
  tabs: string;
  setTabs: (val: string) => void;
  label?: string;
}
export interface CourseGridProps {
  isLoading: boolean;
  error: string | null;
  courses: any[];
  handleOpenCourse: (course: any) => void;
  handleToggleFavorite: (course: any) => void;
  headerSlot?: React.ReactNode;
}
export interface SearchProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  tabs: string;
  setTabs: (val: string) => void;
}
