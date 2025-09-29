// lib/utils/skinTypes.js
import { 
  Smile, 
  Sparkles, 
  CloudRain, 
  Scale, 
  Leaf, 
  Heart,
  Zap
} from 'lucide-react';

export const skinTypes = [
  {
    id: 'normal-skin',
    name: 'NORMAL SKIN',
    slug: 'normal-skin',
    icon: '😊',
    description: 'Well-balanced skin with even texture',
    wooCommerceSlug: 'normal-skin',
    component: Smile,
    color: 'from-green-50 to-green-100'
  },
  {
    id: 'oily-skin',
    name: 'OILY SKIN',
    slug: 'oily-skin',
    icon: '✨',
    description: 'Excess sebum production with shiny appearance',
    wooCommerceSlug: 'oily-skin',
    component: Sparkles,
    color: 'from-blue-50 to-blue-100'
  },
  {
    id: 'dry-skin',
    name: 'DRY SKIN',
    slug: 'dry-skin',
    icon: '🏜️',
    description: 'Lacking moisture with flaky or tight feeling',
    wooCommerceSlug: 'dry-skin',
    component: CloudRain,
    color: 'from-orange-50 to-orange-100'
  },
  {
    id: 'combination',
    name: 'COMBINATION',
    slug: 'combination-skin',
    icon: '⚖️',
    description: 'Both oily and dry areas on the face',
    wooCommerceSlug: 'combination-skin',
    component: Scale,
    color: 'from-purple-50 to-purple-100'
  },
  {
    id: 'sensitive',
    name: 'SENSITIVE',
    slug: 'sensitive-skin',
    icon: '🌿',
    description: 'Easily irritated skin that needs gentle care',
    wooCommerceSlug: 'sensitive-skin',
    component: Leaf,
    color: 'from-pink-50 to-pink-100'
  },
  {
    id: 'damaged',
    name: 'DAMAGED',
    slug: 'damaged-skin',
    icon: '❤️‍🩹',
    description: 'Skin needing repair and restoration',
    wooCommerceSlug: 'damaged-skin',
    component: Heart,
    color: 'from-red-50 to-red-100'
  }
];


// Helper function to get skin type by WooCommerce category
export function getSkinTypeByWooCommerceSlug(wooCommerceSlug) {
  return skinTypes.find(skinType => skinType.wooCommerceSlug === wooCommerceSlug);
}

// Helper function to get all WooCommerce category slugs for skin types
export function getAllSkinTypeWooCommerceSlugs() {
  return skinTypes.map(skinType => skinType.wooCommerceSlug);
}