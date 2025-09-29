// app/skin-type/[slug]/loading.js
import ProductGridSkeleton from '@/app/components/ui/ProductGridSkeleton';

export default function Loading() {
  return (
    <div className="w-full md:max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="h-16 bg-base-300 rounded-full w-16 mx-auto mb-4 animate-pulse"></div>
        <div className="h-8 bg-base-300 rounded w-1/3 mx-auto mb-4 animate-pulse"></div>
        <div className="h-4 bg-base-300 rounded w-1/2 mx-auto animate-pulse"></div>
      </div>
      <ProductGridSkeleton />
    </div>
  );
}