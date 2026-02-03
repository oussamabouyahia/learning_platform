import { useNavigate } from "react-router-dom";

export const BackToDashboard = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className="mb-6 text-gray-500 hover:text-blue-600 font-medium flex items-center gap-2"
    >
      ← Back to Dashboard
    </button>
  );
};
