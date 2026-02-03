export const LoadingComponent = ({ label }: { label?: string }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <p className="text-lg text-gray-500">{label || "Loading..."}</p>
    </div>
  );
};
