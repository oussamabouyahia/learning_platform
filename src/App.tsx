// 1. Create Mock Data
// This simulates what the Backend would send you

import CouseGrid from "./features/course/components/CourseGrid";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Learning Path
        </h1>
        <CouseGrid />
      </div>
    </div>
  );
}

export default App;
