import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "./page/DashboardPage";
import { CourseDetailPage } from "./page/CourseDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        {/* 🔗 The Magic Part: :courseId creates a dynamic variable */}
        <Route path="/course/:courseId" element={<CourseDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
