import api from './woocommerce';


export async function getAllCategories() {
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