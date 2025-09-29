// app/categories/[slug]/page.js
import ProductCard from '@/app/components/ui/ProductCard';
import { getCategoryBySlug, getAllCategories } from '@/app/lib/api/categories';
import { getProductsByCategory } from '@/app/lib/api/products';
import Pagination from '@/app/components/ui/Pagination';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    return categories.map(category => ({
      slug: category.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [{ slug: 'sunscreen' }, { slug: 'moisturizer' }, { slug: 'cleanser' }];
  }
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);
    
    return {
      title: `${category?.name || 'Category'} - Glow by Yana`,
      description: category?.description || `Browse our products`,
    };
  } catch (error) {
    return {
      title: 'Category - Glow by Yana',
      description: 'Browse our products',
    };
  }
}

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const page = await parseInt(searchParams.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  
  try {
    // Fetch category first
    const category = await getCategoryBySlug(slug);

    if (!category) {
      return (
        <div className="w-full md:max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-600">The category "{slug}" doesn't exist.</p>
          <a href="/categories" className="btn btn-primary mt-4">Browse Categories</a>
        </div>
      );
    }

    // Fetch paginated products
    const allProducts = await getProductsByCategory(category.id, 1000); // Get all for pagination
    const totalProducts = allProducts.length;
    const totalPages = Math.ceil(totalProducts / limit);
    const paginatedProducts = allProducts.slice(skip, skip + limit);

    return (
      <div className="w-full md:max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
          )}
        </div>
        
        {paginatedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold mb-2">No Products Found</h2>
            <p className="text-gray-600 mb-4">
              {page > 1 
                ? "No more products found in this category." 
                : "We're working on adding more products to this category."
              }
            </p>
            <a href="/categories" className="btn btn-primary">
              Browse All Categories
            </a>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {paginatedProducts.length} of {totalProducts} products in {category.name}
                {page > 1 && ` (Page ${page} of ${totalPages})`}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Component */}
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                baseUrl={`/categories/${slug}`}
                totalItems={totalProducts}
                itemsPerPage={limit}
              />
            )}
          </>
        )}
      </div>
    );
  } catch (error) {
    console.error('❌ Category page error:', error);
    
    return (
      <div className="w-full md:max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Temporarily Unavailable</h1>
        <p className="text-gray-600 mb-4">
          We're having trouble loading this category right now. Please try again later.
        </p>
        <a href="/categories" className="btn btn-primary">
          Browse Categories
        </a>
      </div>
    );
  }
}




// app/categories/[slug]/page.js
// import ProductCard from '@/app/components/ui/ProductCard';
// import { getCategoryBySlug, getAllCategories } from '@/app/lib/api/categories';
// import { getProductsByCategory } from '@/app/lib/api/products';

// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

// export async function generateStaticParams() {
//   try {
//     const categories = await getAllCategories();
//     return categories.map(category => ({
//       slug: category.slug,
//     }));
//   } catch (error) {
//     console.error('Error generating static params:', error);
//     return [{ slug: 'sunscreen' }, { slug: 'moisturizer' }, { slug: 'cleanser' }];
//   }
// }

// export async function generateMetadata({ params }) {
//   try {
//     const { slug } = await params;
//     const category = await getCategoryBySlug(slug);
    
//     return {
//       title: `${category?.name || 'Category'} - Glow by Yana`,
//       description: category?.description || `Browse our products`,
//     };
//   } catch (error) {
//     return {
//       title: 'Category - Glow by Yana',
//       description: 'Browse our products',
//     };
//   }
// }

// export default async function CategoryPage({ params }) {
//   const { slug } = await params;
  
//   try {
//     // Fetch category and products in parallel
//     const [category, products] = await Promise.all([
//       getCategoryBySlug(slug),
//       (async () => {
//         const categoryObj = await getCategoryBySlug(slug);
//         return categoryObj ? await getProductsByCategory(categoryObj.id) : [];
//       })()
//     ]);

//     if (!category) {
//       return (
//         <div className="w-full md:max-w-7xl mx-auto px-4 py-16 text-center">
//           <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
//           <p className="text-gray-600">The category "{slug}" doesn't exist.</p>
//           <a href="/categories" className="btn btn-primary mt-4">Browse Categories</a>
//         </div>
//       );
//     }

//     return (
//       <div className="w-full md:max-w-7xl mx-auto px-4 py-8">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
//           {category.description && (
//             <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
//           )}
//         </div>
        
//         {products.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="text-6xl mb-4">🔍</div>
//             <h2 className="text-2xl font-bold mb-2">No Products Found</h2>
//             <p className="text-gray-600 mb-4">
//               We're working on adding more products to this category.
//             </p>
//             <a href="/categories" className="btn btn-primary">
//               Browse All Categories
//             </a>
//           </div>
//         ) : (
//           <>
//             <div className="flex justify-between items-center mb-6">
//               <p className="text-gray-600">
//                 {products.length} products found in {category.name}
//               </p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {products.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     );
//   } catch (error) {
//     console.error('❌ Category page error:', error);
    
//     return (
//       <div className="w-full md:max-w-7xl mx-auto px-4 py-16 text-center">
//         <h1 className="text-3xl font-bold mb-4">Temporarily Unavailable</h1>
//         <p className="text-gray-600 mb-4">
//           We're having trouble loading this category right now. Please try again later.
//         </p>
//         <a href="/categories" className="btn btn-primary">
//           Browse Categories
//         </a>
//       </div>
//     );
//   }
// }