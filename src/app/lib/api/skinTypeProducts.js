// lib/api/skinTypeProducts.js
import { getAllCategories } from './categories';
import { getAllProducts } from './products';

// Cache for skin type products
const skinTypeCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Search configuration for skin types
const skinTypeSearchConfig = {
  'normal-skin': {
    terms: ['normal', 'balanced', 'all skin', 'every skin', 'universal', 'all type'],
    fields: ['name', 'tags', 'short_description', 'description', 'categories', 'attributes']
  },
  'oily-skin': {
    terms: ['oily', 'oil', 'shine', 'sebum', 'matte', 'oil control'],
    fields: ['name', 'tags', 'short_description', 'description', 'categories', 'attributes']
  },
  'dry-skin': {
    terms: ['dry', 'hydration', 'moisture', 'dehydrated', 'moisturizing'],
    fields: ['name', 'tags', 'short_description', 'description', 'categories', 'attributes']
  },
  'combination-skin': {
    terms: ['combination', 'combo', 't-zone', 'mixed', 'normal to oily', 'normal to dry'],
    fields: ['name', 'tags', 'short_description', 'description', 'categories', 'attributes']
  },
  'sensitive-skin': {
    terms: ['sensitive', 'gentle', 'calming', 'soothing', 'irritated', 'redness', 'fragrance free', 'hypoallergenic'],
    fields: ['name', 'tags', 'short_description', 'description', 'categories', 'attributes']
  },
  'damaged-skin': {
    terms: ['damaged', 'repair', 'restore', 'barrier', 'recovery', 'healing', 'barrier repair', 'skin repair'],
    fields: ['name', 'tags', 'short_description', 'description', 'categories', 'attributes']
  }
};

// Map skin type slugs to WooCommerce category slugs
const skinTypeCategoryMap = {
  'normal-skin': 'normal-skin',
  'oily-skin': 'oily-skin', 
  'dry-skin': 'dry-skin',
  'combination-skin': 'combination-skin',
  'sensitive-skin': 'sensitive-skin',
  'damaged-skin': 'damaged-skin'
};

export async function getProductsBySkinType(skinTypeSlug, limit = 100) {
  // Check cache first
  const cacheKey = `skin-type-${skinTypeSlug}`;
  const cached = skinTypeCache.get(cacheKey);
  
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log(`📦 Returning cached products for ${skinTypeSlug}`);
    return cached.products;
  }

  try {
    const wooCommerceSlug = skinTypeCategoryMap[skinTypeSlug];
    
    if (!wooCommerceSlug) {
      console.warn(`No WooCommerce category mapping found for skin type: ${skinTypeSlug}`);
      return await fallbackTextSearch(skinTypeSlug, limit);
    }

    // Get all categories to find the matching category
    const allCategories = await getAllCategories();
    const skinTypeCategory = allCategories.find(cat => 
      cat.slug === wooCommerceSlug || cat.slug === skinTypeSlug
    );

    if (!skinTypeCategory) {
      console.warn(`No WooCommerce category found for skin type: ${skinTypeSlug} (slug: ${wooCommerceSlug})`);
      return await fallbackTextSearch(skinTypeSlug, limit);
    }

    console.log(`✅ Found category for ${skinTypeSlug}: ${skinTypeCategory.name} (ID: ${skinTypeCategory.id})`);

    // Get all products and filter by category
    const allProducts = await getAllProducts();
    const filteredProducts = allProducts.filter(product => 
      product.categories?.some(cat => cat.id === skinTypeCategory.id)
    ).slice(0, limit);

    console.log(`✅ Skin type "${skinTypeSlug}": Found ${filteredProducts.length} products from category`);

    // Cache the results
    skinTypeCache.set(cacheKey, {
      products: filteredProducts,
      timestamp: Date.now()
    });

    return filteredProducts;
  } catch (error) {
    console.error(`❌ Error fetching products for skin type ${skinTypeSlug}:`, error);
    return await fallbackTextSearch(skinTypeSlug, limit);
  }
}

// Fallback to text-based search if category approach fails
async function fallbackTextSearch(skinTypeSlug, limit = 100) {
  console.log(`🔄 Using fallback text search for ${skinTypeSlug}`);
  
  const config = skinTypeSearchConfig[skinTypeSlug];
  if (!config) return [];

  const allProducts = await getAllProducts();
  const searchRegex = new RegExp(config.terms.join('|'), 'i');
  
  const filteredProducts = allProducts.filter(product => {
    if (!product) return false;

    const searchableText = `
      ${product.name?.toLowerCase() || ''}
      ${product.short_description?.toLowerCase() || ''}
      ${product.description?.toLowerCase() || ''}
      ${product.tags?.map(tag => tag?.name || '').join(' ')?.toLowerCase() || ''}
      ${product.categories?.map(cat => cat?.name || '').join(' ')?.toLowerCase() || ''}
      ${product.attributes?.map(attr => attr?.options?.join(' ') || '').join(' ')?.toLowerCase() || ''}
    `.toLowerCase();

    return searchRegex.test(searchableText);
  }).slice(0, limit);

  console.log(`✅ Fallback search for "${skinTypeSlug}": Found ${filteredProducts.length} products`);
  return filteredProducts;
}

// Paginated version for better performance
export async function getProductsBySkinTypePaginated(skinTypeSlug, page = 1, limit = 10) {
  const cacheKey = `skin-type-${skinTypeSlug}-page-${page}-limit-${limit}`;
  const cached = skinTypeCache.get(cacheKey);
  
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log(`📦 Returning cached paginated products for ${skinTypeSlug}`);
    return cached.products;
  }

  try {
    // Try category-based approach first for better performance
    const wooCommerceSlug = skinTypeCategoryMap[skinTypeSlug];
    if (wooCommerceSlug) {
      const allCategories = await getAllCategories();
      const skinTypeCategory = allCategories.find(cat => 
        cat.slug === wooCommerceSlug || cat.slug === skinTypeSlug
      );

      if (skinTypeCategory) {
        const allProducts = await getAllProducts();
        const filteredProducts = allProducts.filter(product => 
          product.categories?.some(cat => cat.id === skinTypeCategory.id)
        );

        const skip = (page - 1) * limit;
        const paginatedProducts = filteredProducts.slice(skip, skip + limit);

        console.log(`✅ Skin type "${skinTypeSlug}": Found ${paginatedProducts.length} products for page ${page} from category`);

        skinTypeCache.set(cacheKey, {
          products: paginatedProducts,
          timestamp: Date.now()
        });

        return paginatedProducts;
      }
    }

    // Fallback to text search
    const config = skinTypeSearchConfig[skinTypeSlug];
    if (!config) {
      console.warn(`No search config found for skin type: ${skinTypeSlug}`);
      return [];
    }

    const allProducts = await getAllProducts();
    const searchRegex = new RegExp(config.terms.join('|'), 'i');
    
    const filteredProducts = allProducts.filter(product => {
      if (!product) return false;

      let searchableText = '';
      
      config.fields.forEach(field => {
        if (field === 'name') {
          searchableText += ' ' + (product.name?.toLowerCase() || '');
        } else if (field === 'tags') {
          searchableText += ' ' + (product.tags?.map(tag => tag?.name || '').join(' ') || '');
        } else if (field === 'short_description') {
          searchableText += ' ' + (product.short_description?.toLowerCase() || '');
        } else if (field === 'description') {
          searchableText += ' ' + (product.description?.toLowerCase() || '');
        } else if (field === 'categories') {
          searchableText += ' ' + (product.categories?.map(cat => cat?.name || '').join(' ') || '');
        } else if (field === 'attributes') {
          searchableText += ' ' + (product.attributes?.map(attr => 
            Array.isArray(attr.options) ? attr.options.join(' ') : ''
          ).join(' ') || '');
        }
      });

      return searchRegex.test(searchableText);
    });

    const skip = (page - 1) * limit;
    const paginatedProducts = filteredProducts.slice(skip, skip + limit);

    console.log(`✅ Skin type "${skinTypeSlug}": Found ${paginatedProducts.length} products for page ${page}`);

    skinTypeCache.set(cacheKey, {
      products: paginatedProducts,
      timestamp: Date.now()
    });

    return paginatedProducts;
  } catch (error) {
    console.error(`❌ Error fetching paginated products for skin type ${skinTypeSlug}:`, error);
    return [];
  }
}

export async function getSkinTypeProductsCount(skinTypeSlug) {
  const cacheKey = `skin-type-${skinTypeSlug}-count`;
  const cached = skinTypeCache.get(cacheKey);
  
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.count;
  }

  try {
    // Try category-based approach first
    const wooCommerceSlug = skinTypeCategoryMap[skinTypeSlug];
    if (wooCommerceSlug) {
      const allCategories = await getAllCategories();
      const skinTypeCategory = allCategories.find(cat => 
        cat.slug === wooCommerceSlug || cat.slug === skinTypeSlug
      );

      if (skinTypeCategory) {
        const allProducts = await getAllProducts();
        const count = allProducts.filter(product => 
          product.categories?.some(cat => cat.id === skinTypeCategory.id)
        ).length;

        skinTypeCache.set(cacheKey, {
          count: count,
          timestamp: Date.now()
        });

        return count;
      }
    }

    // Fallback to text search
    const config = skinTypeSearchConfig[skinTypeSlug];
    if (!config) return 0;

    const allProducts = await getAllProducts();
    const searchRegex = new RegExp(config.terms.join('|'), 'i');
    
    const filteredProducts = allProducts.filter(product => {
      if (!product) return false;

      let searchableText = '';
      
      config.fields.forEach(field => {
        if (field === 'name') {
          searchableText += ' ' + (product.name?.toLowerCase() || '');
        } else if (field === 'tags') {
          searchableText += ' ' + (product.tags?.map(tag => tag?.name || '').join(' ') || '');
        } else if (field === 'short_description') {
          searchableText += ' ' + (product.short_description?.toLowerCase() || '');
        } else if (field === 'description') {
          searchableText += ' ' + (product.description?.toLowerCase() || '');
        } else if (field === 'categories') {
          searchableText += ' ' + (product.categories?.map(cat => cat?.name || '').join(' ') || '');
        } else if (field === 'attributes') {
          searchableText += ' ' + (product.attributes?.map(attr => 
            Array.isArray(attr.options) ? attr.options.join(' ') : ''
          ).join(' ') || '');
        }
      });

      return searchRegex.test(searchableText);
    });

    const count = filteredProducts.length;

    skinTypeCache.set(cacheKey, {
      count: count,
      timestamp: Date.now()
    });

    return count;
  } catch (error) {
    console.error(`❌ Error counting products for skin type ${skinTypeSlug}:`, error);
    return 0;
  }
}

// Clear cache (useful for development)
export function clearSkinTypeCache() {
  skinTypeCache.clear();
}

// Get skin type category mapping for debugging
export function getSkinTypeCategoryMap() {
  return skinTypeCategoryMap;
}