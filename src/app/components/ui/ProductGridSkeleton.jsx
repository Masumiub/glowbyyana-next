// components/ui/ProductGridSkeleton.jsx
export default function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card bg-base-100 shadow-sm animate-pulse">
          <div className="h-48 bg-base-300 rounded-t-lg"></div>
          <div className="card-body p-4">
            <div className="h-4 bg-base-300 rounded mb-2"></div>
            <div className="h-3 bg-base-300 rounded w-3/4 mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-base-300 rounded w-1/4"></div>
              <div className="h-8 bg-base-300 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}