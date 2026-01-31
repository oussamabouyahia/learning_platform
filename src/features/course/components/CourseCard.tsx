import { useState } from "react";
import type { CourseCardProps } from "../../../types/course";

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onToggleFavorite,
  onOpenCourse,
}) => {
  const [imgSrc, setImgSrc] = useState(course.thumbnailUrl);

  return (
    <div
      onClick={() => onOpenCourse(course.id)}
      className="group relative w-80 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer flex flex-col"
    >
      {/* 1. Image Area */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={imgSrc}
          alt={course.title}
          onError={() =>
            setImgSrc("https://via.placeholder.com/300x200?text=No+Image")
          }
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Duration Badge */}
        <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md">
          {course.duration}
        </span>
      </div>

      {/* 2. Content Body */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div>
          <h2 className="font-bold text-lg text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">
            {course.title}
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-1">
            by {course.author}
          </p>
        </div>

        {/* 3. Custom Progress Bar */}
        <div className="mt-auto">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-semibold">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          {/* Track */}
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            {/* Fill */}
            <div
              style={{ width: `${course.progress}%` }}
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                course.progress === 100 ? "bg-green-500" : "bg-blue-600"
              }`}
            />
          </div>
        </div>
      </div>

      {/* 4. Action Footer */}
      <div className="px-5 py-3 border-t border-gray-50 flex justify-between items-center bg-gray-50/30">
        <span className="text-xs text-gray-400 font-medium">
          Updated 2 days ago
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(course.id);
          }}
          className="p-2 -mr-2 rounded-full hover:bg-red-50 transition-colors active:scale-90"
        >
          {/* Using a span for the icon ensures consistent line-height */}
          <span
            className={`text-xl transition-opacity duration-300 ${course.isFavorite ? "opacity-100" : "opacity-50 grayscale hover:grayscale-0"}`}
          >
            {course.isFavorite ? "❤️" : "🤍"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
