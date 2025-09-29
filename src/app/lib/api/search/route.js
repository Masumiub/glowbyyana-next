// app/api/search/route.js
// import { getAllProducts } from '../../../lib/api/products';
// import { getAllCategories } from '../../../lib/api/categories';

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const query = searchParams.get('q')?.toLowerCase().trim();
    
//     console.log('🔍 Search query:', query);
    
//     if (!query || query.length < 2) {
//       return new Response(
//         JSON.stringify({ error: 'Query must be at least 2 characters' }),
//         {
//           status: 400,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     }

//     // Fetch all products and categories
//     const [products, categories] = await Promise.all([
//       getAllProducts(),
//       getAllCategories()
//     ]);

//     console.log(`📦 Total products available: ${products.length}`);
//     console.log(`📦 Total categories available: ${categories.length}`);

//     // Filter products by search query (name, categories, SKU, and brand)
//     const matchedProducts = products.filter(product => {
//       // Extract brand from attributes or use a fallback
//       const brandAttribute = product.attributes?.find(attr => 
//         attr.name?.toLowerCase() === 'brand' || 
//         attr.name?.toLowerCase() === 'pa_brand'
//       );
//       const brandName = brandAttribute?.options?.join(' ')?.toLowerCase() || '';
      
//       const searchableText = `
//         ${product.name?.toLowerCase() || ''}
//         ${product.categories?.map(cat => cat.name).join(' ')?.toLowerCase() || ''}
//         ${product.sku?.toLowerCase() || ''}
//         ${brandName}
//       `.toLowerCase();
      
//       const isMatch = searchableText.includes(query);
      
//       // Debug logging for Toner products
//       if (query === 'toner' && product.categories?.some(cat => cat.name.toLowerCase().includes('toner'))) {
//         console.log(`🔍 Toner product: ${product.name}, Categories: ${product.categories.map(c => c.name).join(', ')}`);
//       }
      
//       return isMatch;
//     });

//     // Filter categories by search query
//     const matchedCategories = categories.filter(category => 
//       category.name.toLowerCase().includes(query) ||
//       category.slug.toLowerCase().includes(query)
//     );

//     console.log('✅ Search results:', {
//       products: matchedProducts.length,
//       categories: matchedCategories.length,
//       query: query
//     });

//     // Debug: Check Toner category specifically
//     if (query === 'toner') {
//       const tonerCategory = categories.find(cat => 
//         cat.name.toLowerCase().includes('toner') || 
//         cat.slug.toLowerCase().includes('toner')
//       );
      
//       if (tonerCategory) {
//         const tonerProducts = products.filter(product => 
//           product.categories?.some(cat => cat.id === tonerCategory.id)
//         );
//         console.log(`🔍 Toner category found: ${tonerCategory.name} (ID: ${tonerCategory.id})`);
//         console.log(`🔍 Products in Toner category: ${tonerProducts.length}`);
//       }
//     }

//     return new Response(JSON.stringify({
//       products: matchedProducts.slice(0, 10),
//       categories: matchedCategories.slice(0, 10),
//     }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('❌ Search API Error:', error);
//     return new Response(
//       JSON.stringify({ error: 'Failed to search: ' + error.message }),
//       {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
// }


// app/api/search/route.js
import { getAllProducts } from '../../../lib/api/products';
import { getAllCategories } from '../../../lib/api/categories';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase().trim();
    
    console.log('🔍 Search query:', query);
    
    if (!query || query.length < 2) {
      return new Response(
        JSON.stringify({ error: 'Query must be at least 2 characters' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Fetch all products and categories
    const [products, categories] = await Promise.all([
      getAllProducts({ per_page: 100 }),
      getAllCategories()
    ]);

    console.log(`📦 Search base: ${products.length} products, ${categories.length} categories`);

    // Filter products
    const matchedProducts = products.filter(product => {
      const searchableText = `
        ${product.name?.toLowerCase() || ''}
        ${product.categories?.map(cat => cat.name).join(' ')?.toLowerCase() || ''}
        ${product.sku?.toLowerCase() || ''}
      `;
      return searchableText.includes(query);
    });

    // Filter categories
    const matchedCategories = categories.filter(category => 
      category.name.toLowerCase().includes(query) ||
      category.slug.toLowerCase().includes(query)
    );

    console.log('✅ Search results:', {
      products: matchedProducts.length,
      categories: matchedCategories.length,
    });

    return new Response(JSON.stringify({
      products: matchedProducts.slice(0, 10),
      categories: matchedCategories.slice(0, 5),
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Search API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to search: ' + error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}