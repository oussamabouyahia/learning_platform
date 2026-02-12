import { useParams } from "react-router-dom";
import { useCourseDetail } from "../features/course/hooks/useCourseDetail";
import { BackToDashboard } from "../shared/BackToDashboard";
import { LoadingComponent } from "../shared/LoadingComponent";

export const CourseDetailPage = () => {
  const { courseId } = useParams(); // 1. Read the URL param

  const { course, loading, error, handleProgress } = useCourseDetail(courseId); //fetching one course (the logic inside useCourseDetail hook)

  if (loading) {
    return <LoadingComponent label="Loading course details..." />;
  }
  if (error || !course) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Error: {error}</p>
        <BackToDashboard />
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-8">
      <BackToDashboard />
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Hero Section */}
        <div className="relative h-64 bg-gray-800">
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/80 to-transparent w-full">
            <h1 className="text-4xl font-bold text-white mb-2">
              {course.title}
            </h1>
            <p className="text-gray-200 text-lg">by {course.author}</p>
          </div>
        </div>
        {/* Content Section */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold text-sm">
              {course.duration}
            </span>
            <div className="w-1/3">
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Your Progress
              </label>
              <div className="w-full h-3 bg-gray-100 rounded-full mt-1">
                <div
                  style={{ width: `${course.progress}%` }}
                  className="h-full bg-green-500 rounded-full"
                />
              </div>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-4">Course Content</h3>
          <p className="text-gray-600 leading-relaxed">
            This is where the video player and lesson list would go. Since this
            is a mock, imagine a high-quality video player right here! 🎥
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold m-4">Course modules</h2>
          <ul className="space-y-2 px-4 mb-8">
            {course.modules.map((module) => (
              <li
                key={module.id}
                className="flex items-center m-1-2 p-4 bg-gray-50 rounded-lg shadow-sm gap-4"
              >
                <span className="mr-2 ml-2 text-lg">
                  {module.completed ? "✅" : "⏳"}
                </span>
                <span>{module.title}</span>

                <button
                  role="button"
                  className="ml-6 text-blue-500 hover:text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-sm font-medium"
                  onClick={() => handleProgress(module.id)}
                >
                  complete this module
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
