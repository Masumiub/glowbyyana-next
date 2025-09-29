// lib/api/skinTypeProducts.js
import { getAllProducts } from './products';

// Cache for skin type products
const skinTypeCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function getProductsBySkinType(skinTypeSlug) {
  // Check cache first
  const cached = skinTypeCache.get(skinTypeSlug);
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log(`📦 Returning cached products for ${skinTypeSlug}`);
    return cached.products;
  }

  const allProducts = await getAllProducts();
  
  // Pre-compiled search terms for better performance
  const searchTerms = {
    'normal-skin': ['normal', 'balanced', 'all skin', 'every skin', 'universal'],
    'oily-skin': ['oily', 'oil', 'shine', 'sebum', 'matte', 'oil control'],
    'dry-skin': ['dry', 'hydration', 'moisture', 'dehydrated', 'moisturizing'],
    'combination-skin': ['combination', 'combo', 't-zone', 'mixed'],
    'sensitive-skin': ['sensitive', 'gentle', 'calming', 'soothing', 'fragrance free'],
    'damaged-skin': ['repair', 'restore', 'barrier', 'recovery', 'healing']
  };

  const terms = searchTerms[skinTypeSlug] || [skinTypeSlug.replace('-skin', '')];
  
  // Optimized filtering - only check necessary fields
  const filteredProducts = allProducts.filter(product => {
    if (!product) return false;

    // Only search in most relevant fields for performance
    const searchableText = (
      (product.name?.toLowerCase() || '') + ' ' +
      (product.tags?.map(tag => tag?.name || '').join(' ') || '')
    );

    // Use regex for faster matching
    const searchRegex = new RegExp(terms.join('|'), 'i');
    return searchRegex.test(searchableText);
  });

  // Cache the results
  skinTypeCache.set(skinTypeSlug, {
    products: filteredProducts,
    timestamp: Date.now()
  });

  console.log(`✅ Cached ${filteredProducts.length} products for ${skinTypeSlug}`);
  return filteredProducts;
}

// Clear cache (useful for development)
export function clearSkinTypeCache() {
  skinTypeCache.clear();
}