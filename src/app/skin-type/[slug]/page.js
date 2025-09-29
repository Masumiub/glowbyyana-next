export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getProductsBySkinType } from '@/app/lib/api/skinTypeProducts';
import { skinTypes } from '@/app/lib/utils/skinTypes';
import ProductCard from '@/app/components/ui/ProductCard';
import Link from 'next/link';

export async function generateStaticParams() {
  return skinTypes.map(skinType => ({
    slug: skinType.slug,
  }));
}

export default async function SkinTypePage({ params }) {
  const { slug } = await params;
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
    // Use the optimized function with caching
    const filteredProducts = await getProductsBySkinType(slug);
    
    console.log(`✅ Skin type "${skinType.name}": Displaying ${filteredProducts.length} products`);

    return (
      <div className="w-full md:max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{skinType.icon}</div>
          <h1 className="text-4xl font-bold mb-4">{skinType.name}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {skinType.description}
          </p>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold mb-2">Exploring {skinType.name} Products</h2>
            <p className="text-gray-600 mb-4">
              Were curating the perfect products for {skinType.name.toLowerCase()}. 
              Check back soon or browse our current collection.
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
                {filteredProducts.length} products recommended for {skinType.name}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
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

// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

// import { getAllProducts } from '@/app/lib/api/products';
// import { skinTypes } from '@/app/lib/utils/skinTypes';
// import ProductCard from '@/app/components/ui/ProductCard';
// import Link from 'next/link';

// export async function generateStaticParams() {
//   return skinTypes.map(skinType => ({
//     slug: skinType.slug,
//   }));
// }

// export default async function SkinTypePage({ params }) {
//   const { slug } = await params;
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
//     // Get all products with better error handling
//     let allProducts = [];
//     try {
//       allProducts = await getAllProducts();
//       console.log(`✅ Skin type "${skinType.name}": Fetched ${allProducts.length} total products`);
//     } catch (error) {
//       console.error(`❌ Failed to fetch products for ${skinType.name}:`, error.message);
//       // Continue with empty array - the page will show "no products" message
//     }

//     // Improved search terms for each skin type
//     const searchTerms = {
//       'normal-skin': ['normal', 'balanced', 'all skin', 'every skin', 'universal', 'all type'],
//       'oily-skin': ['oily', 'oil', 'shine', 'sebum', 'greasy', 'matte', 'matifying', 'oil control', 'shine control'],
//       'dry-skin': ['dry', 'hydration', 'moisture', 'dehydrated', 'flaky', 'moisturizing', 'hydrating', 'nourishing'],
//       'combination-skin': ['combination', 'combo', 't-zone', 'mixed', 'normal to oily', 'normal to dry'],
//       'sensitive-skin': ['sensitive', 'gentle', 'calming', 'soothing', 'irritated', 'redness', 'fragrance free', 'hypoallergenic'],
//       'damaged-skin': ['damaged', 'repair', 'restore', 'barrier', 'recovery', 'healing', 'barrier repair', 'skin repair']
//     };

//     const terms = searchTerms[slug] || [slug.replace('-skin', '')];
    
//     const filteredProducts = allProducts.filter(product => {
//       if (!product) return false;

//       // Create a comprehensive searchable text
//       const searchableText = `
//         ${product.name?.toLowerCase() || ''}
//         ${product.short_description?.toLowerCase() || ''}
//         ${product.description?.toLowerCase() || ''}
//         ${product.tags?.map(tag => tag?.name || '').join(' ')?.toLowerCase() || ''}
//         ${product.categories?.map(cat => cat?.name || '').join(' ')?.toLowerCase() || ''}
//         ${product.attributes?.map(attr => attr?.options?.join(' ') || '').join(' ')?.toLowerCase() || ''}
//       `.toLowerCase();

//       // Check if any search term matches
//       return terms.some(term => {
//         const lowercaseTerm = term.toLowerCase();
//         return searchableText.includes(lowercaseTerm);
//       });
//     });

//     console.log(`✅ Skin type "${skinType.name}": Found ${filteredProducts.length} matching products`);

//     return (
//       <div className="w-full md:max-w-7xl mx-auto px-4 py-8">
//         <div className="text-center mb-8">
//           <div className="text-6xl mb-4">{skinType.icon}</div>
//           <h1 className="text-4xl font-bold mb-4">{skinType.name}</h1>
//           <p className="text-gray-600 max-w-2xl mx-auto text-lg">
//             {skinType.description}
//           </p>
//         </div>
        
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="text-6xl mb-4">🔍</div>
//             <h2 className="text-2xl font-bold mb-2">Exploring {skinType.name} Products</h2>
//             <p className="text-gray-600 mb-4">
//               Were curating the perfect products for {skinType.name.toLowerCase()}. 
//               Check back soon or browse our current collection.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link href="/" className="btn btn-primary">
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
//                 {filteredProducts.length} products recommended for {skinType.name}
//               </p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
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
//           <Link href="/" className="btn btn-primary">
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

