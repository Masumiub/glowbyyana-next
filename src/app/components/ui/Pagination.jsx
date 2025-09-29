// app/components/ui/Pagination.jsx
import Link from 'next/link';

export default function Pagination({ currentPage, totalPages, baseUrl, totalItems, itemsPerPage }) {
  // Calculate visible page numbers
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t">
      {/* Items counter */}
      <div className="text-sm text-gray-600">
        Showing {startItem}-{endItem} of {totalItems} products
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <Link
          href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : '#'}
          className={`flex items-center px-3 py-2 text-sm border rounded-md ${
            currentPage > 1
              ? 'text-gray-700 border-gray-300 hover:bg-gray-50'
              : 'text-gray-400 border-gray-200 cursor-not-allowed'
          }`}
          aria-disabled={currentPage === 1}
        >
          Previous
        </Link>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {visiblePages.map((page, index) => (
            <span key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-sm text-gray-500">...</span>
              ) : (
                <Link
                  href={`${baseUrl}?page=${page}`}
                  className={`flex items-center justify-center w-10 h-10 text-sm border rounded-md ${
                    currentPage === page
                      ? 'text-gray-700 border-gray-300 hover:bg-gray-50'
                      : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </Link>
              )}
            </span>
          ))}
        </div>

        {/* Next button */}
        <Link
          href={currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : '#'}
          className={`flex items-center px-3 py-2 text-sm border rounded-md ${
            currentPage < totalPages
              ? 'text-gray-700 border-gray-300 hover:bg-gray-50'
              : 'text-gray-400 border-gray-200 cursor-not-allowed'
          }`}
          aria-disabled={currentPage === totalPages}
        >
          Next
        </Link>
      </div>
    </div>
  );
}