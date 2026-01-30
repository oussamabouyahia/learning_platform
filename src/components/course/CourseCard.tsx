import type { CourseCardProps } from "../../types/course"; // Fixed typo 'couse'

const CourseCard = ({
  course,
  onOpenCourse,
  onToggleFavorite,
}: CourseCardProps) => {
  // 1. Basic Defensive Image Handling (Optional but recommended)
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = "https://via.placeholder.com/300"; // Fallback image
  };

  return (
    // Added onClick to the parent wrapper
    <div className="course-card" onClick={() => onOpenCourse(course.id)}>
      {/* 2. Accessible Alt Text & Error Handling */}
      <img
        src={course.thumbnailUrl}
        alt={course.title}
        onError={handleImageError}
      />

      <h2>{course.title}</h2>
      <h3>{course.author}</h3>
      <p>{course.duration} minutes</p>

      {/* 3. The "Stop Propagation" Fix */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // <--- STOP THE CLICK FROM REACHING THE DIV
          onToggleFavorite(course.id);
        }}
      >
        {/* Fixed: Use Emoji or SVG instead of <link> */}
        {course.isFavorite ? "❤️" : "🤍"}
      </button>

      <div>
        <label htmlFor={`progress-${course.id}`}>Download progress:</label>

        {/* 4. Fixed: Dynamic Value */}
        <progress
          id={`progress-${course.id}`}
          value={course.progress} // <--- Dynamic
          max="100"
        >
          {course.progress}%
        </progress>
      </div>
    </div>
  );
};

export default CourseCard;
