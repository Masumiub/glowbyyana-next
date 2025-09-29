// lib/api/products.js
import api from './woocommerce';


// Global products cache
let allProductsCache = null;
let allProductsTimestamp = 0;
const ALL_PRODUCTS_CACHE_DURATION = 5 * 60 * 1000; 

// export async function getAllProducts(params = {}) {
//   // Return cached products if available
//   if (allProductsCache && (Date.now() - allProductsTimestamp) < ALL_PRODUCTS_CACHE_DURATION) {
//     console.log('📦 Returning cached all products');
//     return allProductsCache;
//   }

//   try {
//     console.log('🔄 Fetching all products from WooCommerce...');
    
//     const response = await api.get("products", {
//       per_page: 100,
//       status: 'publish',
//       ...params
//     });

//     // Cache the successful response
//     allProductsCache = response.data;
//     allProductsTimestamp = Date.now();
    
//     console.log(`✅ Successfully fetched ${allProductsCache.length} products`);
//     return allProductsCache;
    
//   } catch (error) {
//     console.error('❌ Failed to fetch products:', error.message);
    
//     // In production, return fallback data
//     if (process.env.NODE_ENV === 'production') {
//       console.log('🔄 Using fallback products data');
//       return fallbackProducts;
//     }
    
//     throw error;
//   }
// }

// Cache for category products


const categoryCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function getProductsByCategory(categoryId, limit = 10) {
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
    
    // // Return filtered fallback data
    // const fallback = fallbackProducts.filter(product =>
    //   product.categories?.some(cat => cat.id === categoryId)
    // ).slice(0, limit);
    
    // return fallback;
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



export async function getAllProducts(limit = 50) { //params = {}
  try {
    let allProducts = [];
    let page = 1;
    let hasMore = true;

    // Fetch all pages of products
    while (hasMore) {
      const response = await api.get("products", {
        per_page: limit, // WooCommerce max per page is 100
        page: page,
        status: 'publish',
        //...params
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






