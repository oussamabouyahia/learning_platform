import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "./page/DashboardPage";

const CourseDetailPage = lazy(() =>
  import("./page/CourseDetailPage").then((module) => ({
    default: module.CourseDetailPage,
  })),
);

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={<div className="p-10">Loading Application...</div>}
      ></Suspense>
      <Routes>
        <Route path="/" element={<DashboardPage />} />

        <Route path="/course/:courseId" element={<CourseDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
