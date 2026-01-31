import { useState } from "react";
import CourseCard from "./components/course/CourseCard";
import { initialCourses } from "./mockData";
import type { Course } from "./types/course";
import { TabsButton } from "./components/course/TabsButton";

// 1. Create Mock Data
// This simulates what the Backend would send you

function App() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tabs, setTabs] = useState("All");
  const filteredCourses = courses.filter((course) => {
    if (tabs === "Active")
      return (
        course.progress > 0 &&
        course.progress < 100 &&
        (course.title
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()) ||
          course.author
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()))
      );
    if (tabs === "Completed")
      return (
        course.progress === 100 &&
        (course.title
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()) ||
          course.author
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()))
      );
    if (tabs === "All")
      return (
        course.title
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()) ||
        course.author
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
      );
  });
  // 2. Mock Interactions
  const handleToggleFavorite = (id: string) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id
          ? { ...course, isFavorite: !course.isFavorite }
          : course,
      ),
    );
    console.log(`Toggled favorite for course ${id}`);
  };

  const handleOpenCourse = (id: string) => {
    alert(`Navigating to course ${id}...`);
  };
  // const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   setTabs(e.currentTarget.id);
  //   console.log(e.currentTarget.id, tabs);
  // };
  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Learning Path
        </h1>
        <div className="mb-8 relative w-600">
          <input
            type="search"
            id="default-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="search a course"
            className="block  p-4 ps-10 text-sm text-gray-900 border border-gray-300
 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          />
        </div>
        <TabsButton tabs={tabs} setTabs={setTabs} />
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onToggleFavorite={handleToggleFavorite}
              onOpenCourse={handleOpenCourse}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
