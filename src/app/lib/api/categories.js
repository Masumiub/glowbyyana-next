import api from './woocommerce';


// Cache for categories
let categoriesCache = null;
let categoriesTimestamp = 0;
const CATEGORIES_CACHE_DURATION = 10 * 60 * 1000;

export async function getAllCategories() {


    // Return cached categories if available
  if (categoriesCache && (Date.now() - categoriesTimestamp) < CATEGORIES_CACHE_DURATION) {
    console.log('📦 Returning cached categories');
    return categoriesCache;
  }

  
  try {
    let allCategories = [];
    let page = 1;
    let hasMore = true;

    // Fetch all pages of categories
    while (hasMore) {
      const response = await api.get("products/categories", {
        per_page: 100,
        page: page,
        hide_empty: true,
        orderby: 'name',
        order: 'asc'
      });

      if (response.data && response.data.length > 0) {
        allCategories = [...allCategories, ...response.data];
        page++;
        
        if (response.data.length < 100) {
          hasMore = false;
        }
      } else {
        hasMore = false;
      }
    }

    console.log(`📦 Fetched ${allCategories.length} categories total`);
    return allCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getCategoryBySlug(slug) {
  try {
    const response = await api.get("products/categories", {
      slug: slug,
      hide_empty: true
    });
    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
}