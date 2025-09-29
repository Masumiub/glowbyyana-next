// app/api/search/route.js
import { getAllProducts } from '@/app/lib/api/products';
import { getAllCategories } from '@/app/lib/api/categories';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase().trim();
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;
    
    console.log('🔍 Search query:', query, 'Page:', page);
    
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

    // Apply pagination to products
    const paginatedProducts = matchedProducts.slice(skip, skip + limit);
    const totalProducts = matchedProducts.length;
    const totalPages = Math.ceil(totalProducts / limit);

    console.log('✅ Search results:', {
      products: paginatedProducts.length,
      totalProducts: totalProducts,
      categories: matchedCategories.length,
      page: page,
      totalPages: totalPages
    });

    return new Response(JSON.stringify({
      products: paginatedProducts,
      categories: matchedCategories.slice(0, 5),
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalProducts: totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
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

// app/api/search/route.js
// import { getAllProducts } from '@/app/lib/api/products';
// import { getAllCategories } from '@/app/lib/api/categories';

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
//       getAllProducts({ per_page: 100 }),
//       getAllCategories()
//     ]);

//     console.log(`📦 Search base: ${products.length} products, ${categories.length} categories`);

//     // Filter products
//     const matchedProducts = products.filter(product => {
//       const searchableText = `
//         ${product.name?.toLowerCase() || ''}
//         ${product.categories?.map(cat => cat.name).join(' ')?.toLowerCase() || ''}
//         ${product.sku?.toLowerCase() || ''}
//       `;
//       return searchableText.includes(query);
//     });

//     // Filter categories
//     const matchedCategories = categories.filter(category => 
//       category.name.toLowerCase().includes(query) ||
//       category.slug.toLowerCase().includes(query)
//     );

//     console.log('✅ Search results:', {
//       products: matchedProducts.length,
//       categories: matchedCategories.length,
//     });

//     return new Response(JSON.stringify({
//       products: matchedProducts.slice(0, 10),
//       categories: matchedCategories.slice(0, 5),
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