// lib/api/products.js
import api from './woocommerce';


export async function getLatestProducts(limit = 8) {
  try {
    console.log('Fetching latest products from:', process.env.WOOCOMMERCE_URL);
    
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



export async function getAllProducts(params = {}) {
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



export async function getProductsByCategory(categoryId, limit = 100) {
  try {
    let allProducts = [];
    let page = 1;
    let hasMore = true;

    // Fetch all pages of products for the category
    while (hasMore && allProducts.length < limit) {
      const response = await api.get("products", {
        category: categoryId,
        per_page: Math.min(100, limit - allProducts.length),
        page: page,
        status: 'publish'
      });

      if (response.data && response.data.length > 0) {
        allProducts = [...allProducts, ...response.data];
        page++;
        
        // If we got less than requested, we've reached the end
        if (response.data.length < 100) {
          hasMore = false;
        }
      } else {
        hasMore = false;
      }
    }

    console.log(`📦 Fetched ${allProducts.length} products for category ${categoryId}`);
    return allProducts;
  } catch (error) {
    console.error('Error fetching category products:', error);
    throw error;
  }
}



