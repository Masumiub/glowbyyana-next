// app/search/page.js
import { getAllProducts } from '@/app/lib/api/products';
import { getAllCategories } from '@/app/lib/api/categories';
import ProductCard from '@/app/components/ui/ProductCard';
import Link from 'next/link';

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams;
  const query = q?.toLowerCase().trim();

  if (!query) {
    return (
      <div className="w-full md:max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Search</h1>
        <p className="text-gray-600">Enter a search term to find products.</p>
      </div>
    );
  }

  try {
    const [allProducts, allCategories] = await Promise.all([
      getAllProducts({ per_page: 100 }),
      getAllCategories()
    ]);

    // Search by query (ONLY name, categories, and SKU)
    const filteredProducts = allProducts.filter(product => {
      const searchableText = `
        ${product.name?.toLowerCase() || ''}
        ${product.categories?.map(cat => cat.name).join(' ')?.toLowerCase() || ''}
        ${product.sku?.toLowerCase() || ''}
      `;
      return searchableText.includes(query);
    });

    return (
      <div className="w-full md:max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          <p className="text-gray-600">
            {filteredProducts.length} products found for "{query}"
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold mb-2">No products found</h2>
            <p className="text-gray-600 mb-4">
              Try different keywords or browse our categories
            </p>
            <Link href="/" className="btn btn-primary">
              Browse Categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Search page error:', error);
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-gray-600">Failed to load search results.</p>
      </div>
    );
  }
}


// app/search/page.js
// import { getAllProducts } from '@/app/lib/api/products';
// import { getAllCategories } from '@/app/lib/api/categories';
// import ProductCard from '@/app/components/ui/ProductCard';
// import Link from 'next/link';
// import Pagination from '@/app/components/ui/Pagination';

// export default async function SearchPage({ searchParams }) {
//   const { q, page } = await searchParams;
//   const query = q?.toLowerCase().trim();
//   const currentPage = parseInt(page) || 1;
//   const limit = 10;
//   const skip = (currentPage - 1) * limit;

//   if (!query) {
//     return (
//       <div className="w-full md:max-w-7xl mx-auto px-4 py-16 text-center">
//         <h1 className="text-3xl font-bold mb-4">Search</h1>
//         <p className="text-gray-600">Enter a search term to find products.</p>
//       </div>
//     );
//   }

//   try {
//     const [allProducts, allCategories] = await Promise.all([
//       getAllProducts({ per_page: 100 }),
//       getAllCategories()
//     ]);

//     // Search by query (ONLY name, categories, and SKU)
//     const filteredProducts = allProducts.filter(product => {
//       const searchableText = `
//         ${product.name?.toLowerCase() || ''}
//         ${product.categories?.map(cat => cat.name).join(' ')?.toLowerCase() || ''}
//         ${product.sku?.toLowerCase() || ''}
//       `;
//       return searchableText.includes(query);
//     });

//     // Apply pagination
//     const totalProducts = filteredProducts.length;
//     const totalPages = Math.ceil(totalProducts / limit);
//     const paginatedProducts = filteredProducts.slice(skip, skip + limit);
//     const startItem = skip + 1;
//     const endItem = Math.min(skip + limit, totalProducts);

//     console.log('🔍 Search Debug:', {
//       query,
//       currentPage,
//       totalProducts,
//       totalPages,
//       skip,
//       limit,
//       paginatedProductsCount: paginatedProducts.length,
//       startItem,
//       endItem
//     });

//     return (
//       <div className="w-full md:max-w-7xl mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold mb-2">Search Results</h1>
//           <p className="text-gray-600">
//             {totalProducts > 0 
//               ? `Showing ${startItem}-${endItem} of ${totalProducts} products found for "${query}"`
//               : `No products found for "${query}"`
//             }
//             {currentPage > 1 && totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//           </p>
//         </div>

//         {paginatedProducts.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="text-6xl mb-4">🔍</div>
//             <h2 className="text-2xl font-bold mb-2">
//               {currentPage > 1 && totalProducts > 0 ? "No more products found" : "No products found"}
//             </h2>
//             <p className="text-gray-600 mb-4">
//               {currentPage > 1 && totalProducts > 0
//                 ? "Try going back to previous pages or refine your search."
//                 : "Try different keywords or browse our categories"
//               }
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               {currentPage > 1 && totalProducts > 0 ? (
//                 <Link href={`/search?q=${encodeURIComponent(query)}&page=1`} className="btn btn-primary">
//                   Back to First Page
//                 </Link>
//               ) : (
//                 <Link href="/categories" className="btn btn-primary">
//                   Browse Categories
//                 </Link>
//               )}
//               <Link href="/" className="btn btn-outline">
//                 Continue Shopping
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//               {paginatedProducts.map(product => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>

//             {/* Pagination Component */}
//             {totalPages > 1 && (
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 baseUrl={`/search?q=${encodeURIComponent(query)}`}
//                 totalItems={totalProducts}
//                 itemsPerPage={limit}
//               />
//             )}
//           </>
//         )}
//       </div>
//     );
//   } catch (error) {
//     console.error('Search page error:', error);
//     return (
//       <div className="w-full md:max-w-7xl mx-auto px-4 py-16 text-center">
//         <h1 className="text-3xl font-bold mb-4">Error</h1>
//         <p className="text-gray-600 mb-4">Failed to load search results.</p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link href={`/search?q=${encodeURIComponent(query)}`} className="btn btn-primary">
//             Try Again
//           </Link>
//           <Link href="/" className="btn btn-outline">
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }