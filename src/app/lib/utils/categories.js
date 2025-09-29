// lib/utils/categories.js
import { 
  Sparkles, 
  Droplets, 
  Cloud, 
  Sun, 
  Leaf, 
  Gem, 
  Package, 
  Heart,
  Smile,
  Baby,
  Sparkle,
  Bath,
  Eye,
  Zap
} from 'lucide-react';

export const categories = [
  {
    id: 'cleanser',
    name: 'CLEANSER',
    slug: 'cleansers-and-face-washes',
    icon: '🧼',
    description: 'Gentle cleansers for all skin types',
    component: Sparkles
  },
  {
    id: 'toner',
    name: 'TONER',
    slug: 'toner',
    icon: '💧',
    description: 'Balance and refresh your skin',
    component: Droplets
  },
  {
    id: 'essence',
    name: 'ESSENCE',
    slug: 'essence',
    icon: '🌟',
    description: 'Lightweight hydration boosters',
    component: Gem
  },
  {
    id: 'moisturizer',
    name: 'MOISTURIZER',
    slug: 'moisturizer',
    icon: '💦',
    description: 'Daily hydration solutions',
    component: Cloud
  },
  {
    id: 'serum',
    name: 'SERUM',
    slug: 'serum-ampoule',
    icon: '⚗️',
    description: 'Targeted treatment serums',
    component: Droplets
  },
  {
    id: 'sunscreen',
    name: 'SUNSCREEN',
    slug: 'sunscreen',
    icon: '☀️',
    description: 'UV protection for healthy skin',
    component: Sun
  },
  {
    id: 'soothing-gel',
    name: 'SOOTHING GEL',
    slug: 'soothing-gel',
    icon: '🌿',
    description: 'Calm and soothe irritated skin',
    component: Leaf
  },
  {
    id: 'mask',
    name: 'MASK',
    slug: 'mask',
    icon: '🎭',
    description: 'Weekly treatment masks',
    component: Sparkle
  },
  {
    id: 'trial-kit',
    name: 'TRIAL KIT',
    slug: 'trial-kit',
    icon: '📦',
    description: 'Discover our best sellers',
    component: Package
  },
  {
    id: 'hair-care',
    name: 'HAIR CARE',
    slug: 'hair-care',
    icon: '💇',
    description: 'Hair care essentials',
    component: Heart
  },
  {
    id: 'lip-care',
    name: 'LIP CARE',
    slug: 'lip-care',
    icon: '👄',
    description: 'Lip treatments and balms',
    component: Smile
  },
  {
    id: '2-in-1',
    name: '2 IN 1',
    slug: '2-in-1',
    icon: '🔄',
    description: 'Multi-purpose products',
    component: Zap
  },
  {
    id: 'baby-care',
    name: 'BABY CARE',
    slug: 'baby-care',
    icon: '👶',
    description: 'Gentle products for babies',
    component: Baby
  },
  {
    id: 'exfoliator',
    name: 'EXFOLIATOR',
    slug: 'exfoliator',
    icon: '✨',
    description: 'Gentle exfoliation solutions',
    component: Sparkle
  },
  {
    id: 'bath-body',
    name: 'BATH & BODY',
    slug: 'bath-body',
    icon: '🛁',
    description: 'Body care essentials',
    component: Bath
  },
  {
    id: 'eye-care',
    name: 'EYE CARE',
    slug: 'eye-care',
    icon: '👁️',
    description: 'Specialized eye treatments',
    component: Eye
  }
];