// src/pages/DashboardPage.tsx

import CouseGrid from "../features/course/components/CourseGrid";

export const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* You can add a global Navigation Bar here later */}
      <CouseGrid />
    </div>
  );
};
