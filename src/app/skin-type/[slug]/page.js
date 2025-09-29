// app/skin-type/[slug]/page.js
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getProductsBySkinTypePaginated, getSkinTypeProductsCount } from '@/app/lib/api/skinTypeProducts';
import { skinTypes } from '@/app/lib/utils/skinTypes';
import ProductCard from '@/app/components/ui/ProductCard';
import Link from 'next/link';
import Pagination from '@/app/components/ui/Pagination';

export async function generateStaticParams() {
  return skinTypes.map(skinType => ({
    slug: skinType.slug,
  }));
}

export default async function SkinTypePage({ params, searchParams }) {
  const { slug } = await params;
  const page = parseInt(searchParams.page) || 1;
  const limit = 10;
  
  const skinType = skinTypes.find(st => st.slug === slug);

  if (!skinType) {
    return (
      <div className="w-full md:max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Skin Type Not Found</h1>
        <p className="text-gray-600">The skin type youre looking for doesnt exist.</p>
      </div>
    );
  }

  try {
    // Use paginated functions instead of loading all products
    const [products, totalProducts] = await Promise.all([
      getProductsBySkinTypePaginated(slug, page, limit),
      getSkinTypeProductsCount(slug)
    ]);

    const totalPages = Math.ceil(totalProducts / limit);
    const startItem = (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, totalProducts);
    
    console.log(`✅ Skin type "${skinType.name}": Displaying ${products.length} of ${totalProducts} products`);

    return (
      <div className="w-full md:max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{skinType.icon}</div>
          <h1 className="text-4xl font-bold mb-4">{skinType.name}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {skinType.description}
          </p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold mb-2">Exploring {skinType.name} Products</h2>
            <p className="text-gray-600 mb-4">
              {page > 1 
                ? "No more products found for this skin type." 
                : "We're curating the perfect products for " + skinType.name.toLowerCase() + ". Check back soon or browse our current collection."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/categories" className="btn btn-primary">
                Browse All Categories
              </Link>
              <Link href="/search" className="btn btn-outline">
                Search Products
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {startItem}-{endItem} of {totalProducts} products recommended for {skinType.name}
                {page > 1 && ` (Page ${page} of ${totalPages})`}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Component */}
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                baseUrl={`/skin-type/${slug}`}
                totalItems={totalProducts}
                itemsPerPage={limit}
              />
            )}
          </>
        )}
      </div>
    );
  } catch (error) {
    console.error(`❌ Skin type page error for ${skinType.name}:`, error.message);
    
    return (
      <div className="w-full md:max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">{skinType.icon}</div>
        <h1 className="text-3xl font-bold mb-4">{skinType.name}</h1>
        <p className="text-gray-600 mb-4">
          Were currently updating our product recommendations for {skinType.name.toLowerCase()}.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/categories" className="btn btn-primary">
            Browse Categories
          </Link>
          <Link href="/" className="btn btn-outline">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
}

// app/skin-type/[slug]/page.js
// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

// import { getProductsBySkinType } from '@/app/lib/api/skinTypeProducts';
// import { skinTypes } from '@/app/lib/utils/skinTypes';
// import ProductCard from '@/app/components/ui/ProductCard';
// import Link from 'next/link';
// import Pagination from '@/app/components/ui/Pagination';

// export async function generateStaticParams() {
//   return skinTypes.map(skinType => ({
//     slug: skinType.slug,
//   }));
// }

// export default async function SkinTypePage({ params, searchParams }) {
//   const { slug } = await params;
//   const page = await parseInt(searchParams.page) || 1;
//   const limit = 10;
//   const skip = (page - 1) * limit;
  
//   const skinType = skinTypes.find(st => st.slug === slug);

//   if (!skinType) {
//     return (
//       <div className="w-full md:max-w-7xl mx-auto px-4 py-16 text-center">
//         <h1 className="text-3xl font-bold mb-4">Skin Type Not Found</h1>
//         <p className="text-gray-600">The skin type youre looking for doesnt exist.</p>
//       </div>
//     );
//   }

//   try {
//     // Get all products for pagination
//     const allProducts = await getProductsBySkinType(slug, 1000);
//     const totalProducts = allProducts.length;
//     const totalPages = Math.ceil(totalProducts / limit);
//     const paginatedProducts = allProducts.slice(skip, skip + limit);
    
//     console.log(`✅ Skin type "${skinType.name}": Displaying ${paginatedProducts.length} of ${totalProducts} products`);

//     return (
//       <div className="w-full md:max-w-7xl mx-auto px-4 py-8">
//         <div className="text-center mb-8">
//           <div className="text-6xl mb-4">{skinType.icon}</div>
//           <h1 className="text-4xl font-bold mb-4">{skinType.name}</h1>
//           <p className="text-gray-600 max-w-2xl mx-auto text-lg">
//             {skinType.description}
//           </p>
//         </div>
        
//         {paginatedProducts.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="text-6xl mb-4">🔍</div>
//             <h2 className="text-2xl font-bold mb-2">Exploring {skinType.name} Products</h2>
//             <p className="text-gray-600 mb-4">
//               {page > 1 
//                 ? "No more products found for this skin type." 
//                 : "We're curating the perfect products for " + skinType.name.toLowerCase() + ". Check back soon or browse our current collection."
//               }
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link href="/categories" className="btn btn-primary">
//                 Browse All Categories
//               </Link>
//               <Link href="/search" className="btn btn-outline">
//                 Search Products
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="flex justify-between items-center mb-6">
//               <p className="text-gray-600">
//                 Showing {paginatedProducts.length} of {totalProducts} products recommended for {skinType.name}
//                 {page > 1 && ` (Page ${page} of ${totalPages})`}
//               </p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//               {paginatedProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>

//             {/* Pagination Component */}
//             {totalPages > 1 && (
//               <Pagination
//                 currentPage={page}
//                 totalPages={totalPages}
//                 baseUrl={`/skin-type/${slug}`}
//                 totalItems={totalProducts}
//                 itemsPerPage={limit}
//               />
//             )}
//           </>
//         )}
//       </div>
//     );
//   } catch (error) {
//     console.error(`❌ Skin type page error for ${skinType.name}:`, error.message);
    
//     return (
//       <div className="w-full md:max-w-7xl mx-auto px-4 py-16 text-center">
//         <div className="text-6xl mb-4">{skinType.icon}</div>
//         <h1 className="text-3xl font-bold mb-4">{skinType.name}</h1>
//         <p className="text-gray-600 mb-4">
//           Were currently updating our product recommendations for {skinType.name.toLowerCase()}.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link href="/categories" className="btn btn-primary">
//             Browse Categories
//           </Link>
//           <Link href="/" className="btn btn-outline">
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }
