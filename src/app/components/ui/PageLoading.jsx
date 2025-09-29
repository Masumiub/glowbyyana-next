// components/ui/PageLoading.jsx
export default function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}