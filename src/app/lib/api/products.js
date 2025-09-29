// lib/api/products.js
import api from './woocommerce';

// Global products cache
let allProductsCache = null;
let allProductsTimestamp = 0;
const ALL_PRODUCTS_CACHE_DURATION = 5 * 60 * 1000; 


const categoryCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes


export async function getProductsByCategory(categoryId, limit = 1000) { // Increased default limit for pagination
  // Check cache first
  const cacheKey = `category-${categoryId}-${limit}`;
  const cached = categoryCache.get(cacheKey);
  
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log(`📦 Returning cached products for category ${categoryId}`);
    return cached.products;
  }

  try {
    console.log(`🔄 Fetching products for category ${categoryId}`);
    
    // Fetch all products once and filter by category
    const allProducts = await getAllProducts();
    
    // Filter products by category ID
    const categoryProducts = allProducts.filter(product => 
      product.categories?.some(cat => cat.id === categoryId)
    ).slice(0, limit);

    console.log(`✅ Found ${categoryProducts.length} products for category ${categoryId}`);

    // Cache the results
    categoryCache.set(cacheKey, {
      products: categoryProducts,
      timestamp: Date.now()
    });

    return categoryProducts;
  } catch (error) {
    console.error(`❌ Error fetching products for category ${categoryId}:`, error);
    return [];
  }
}


export async function getProductsByCategoryPaginated(categoryId, page = 1, limit = 10) {
  const cacheKey = `category-${categoryId}-page-${page}-limit-${limit}`;
  const cached = categoryCache.get(cacheKey);
  
  if (cached) return cached.products;

  try {
    const response = await api.get("products", {
      category: categoryId,
      per_page: limit,
      page: page,
      status: 'publish'
    });

    const products = response.data || [];
    
    categoryCache.set(cacheKey, {
      products: products,
      timestamp: Date.now()
    });

    return products;
  } catch (error) {
    console.error(`Error fetching paginated products:`, error);
    return [];
  }
}


export async function getProductsCountByCategory(categoryId) {
  const cacheKey = `category-${categoryId}-count`;
  const cached = categoryCache.get(cacheKey);
  
  if (cached) return cached.count;

  try {
    const response = await api.get("products", {
      category: categoryId,
      per_page: 1, // Minimal data
      page: 1
    });

    const total = parseInt(response.headers['x-wp-total']) || 0;
    
    categoryCache.set(cacheKey, {
      count: total,
      timestamp: Date.now()
    });

    return total;
  } catch (error) {
    console.error(`Error fetching products count:`, error);
    return 0;
  }
}


// export async function getBestSellers(limit = 8) {
//   try {
//     const response = await api.get("products", {
//       per_page: limit,
//       orderby: 'popularity',
//       order: 'desc',
//       status: 'publish'
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching best sellers:', error);
//     throw error;
//   }
// }

export async function getLatestProducts(limit = 8) {
  try {
    //console.log('Fetching latest products from:', process.env.WOOCOMMERCE_URL);
    
    const response = await api.get("products", {
      per_page: limit,
      orderby: 'date',
      order: 'desc',
      status: 'publish'
    });
    
    console.log('Products fetched successfully:', response.data.length);
    return response.data;
  } catch (error) {
    console.error('Error fetching latest products:', error);
    
    // More detailed error logging
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    
    throw error;
  }
}



export async function getAllProducts(params = {}) { //params = {}
  try {
    let allProducts = [];
    let page = 1;
    let hasMore = true;

    // Fetch all pages of products
    while (hasMore) {
      const response = await api.get("products", {
        per_page: 100, // WooCommerce max per page is 100
        page: page,
        status: 'publish',
        ...params
      });

      if (response.data && response.data.length > 0) {
        allProducts = [...allProducts, ...response.data];
        page++;
        
        // If we got less than 100 products, we've reached the end
        if (response.data.length < 100) {
          hasMore = false;
        }
      } else {
        hasMore = false;
      }
    }

    console.log(`📦 Fetched ${allProducts.length} products total`);
    return allProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}




export async function getProductBySlug(slug) {
  try {
    const response = await api.get("products", {
      slug: slug,
      status: 'publish'
    });
    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}






