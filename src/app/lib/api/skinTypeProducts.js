// lib/api/skinTypeProducts.js
import { getAllCategories } from './categories';
import { getAllProducts } from './products';

// Cache for skin type products
const skinTypeCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

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
      return [];
    }

    // Get all categories to find the matching category
    const allCategories = await getAllCategories();
    const skinTypeCategory = allCategories.find(cat => 
      cat.slug === wooCommerceSlug || cat.slug === skinTypeSlug
    );

    if (!skinTypeCategory) {
      console.warn(`No WooCommerce category found for skin type: ${skinTypeSlug} (slug: ${wooCommerceSlug})`);
      
      // Fallback to text-based search if category not found
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
    
    // Fallback to text search if category approach fails
    return await fallbackTextSearch(skinTypeSlug, limit);
  }
}

// Fallback to text-based search if category approach fails
async function fallbackTextSearch(skinTypeSlug, limit = 100) {
  console.log(`🔄 Using fallback text search for ${skinTypeSlug}`);
  
  const searchConfig = {
    'normal-skin': {
      terms: ['normal', 'balanced', 'all skin', 'every skin', 'universal', 'all type'],
    },
    'oily-skin': {
      terms: ['oily', 'oil', 'shine', 'sebum', 'matte', 'oil control'],
    },
    'dry-skin': {
      terms: ['dry', 'hydration', 'moisture', 'dehydrated', 'moisturizing'],
    },
    'combination-skin': {
      terms: ['combination', 'combo', 't-zone', 'mixed', 'normal to oily', 'normal to dry'],
    },
    'sensitive-skin': {
      terms: ['sensitive', 'gentle', 'calming', 'soothing', 'irritated', 'redness', 'fragrance free', 'hypoallergenic'],
    },
    'damaged-skin': {
      terms: ['damaged'],
    }
  };

  const config = searchConfig[skinTypeSlug];
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

// Clear cache (useful for development)
export function clearSkinTypeCache() {
  skinTypeCache.clear();
}

// Get skin type category mapping for debugging
export function getSkinTypeCategoryMap() {
  return skinTypeCategoryMap;
}