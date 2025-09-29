// components/home/CategoryGrid.jsx
import Link from 'next/link';
import { categories } from '../../lib/utils/categories';
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
  Eye
} from 'lucide-react';

// Map emoji icons to Lucid React icons
const iconComponents = {
  '🧼': Sparkles,      // Cleanser
  '💧': Droplets,      // Toner
  '🌟': Gem,           // Essence
  '💦': Cloud,         // Moisturizer
  '⚗️': Droplets,      // Serum
  '☀️': Sun,           // Sunscreen
  '🌿': Leaf,          // Soothing Gel
  '🎭': Sparkle,       // Mask
  '📦': Package,       // Trial Kit
  '💇': Heart,         // Hair Care (using Heart as placeholder)
  '👄': Smile,         // Lip Care
  '🔄': Sparkles,      // 2 in 1
  '👶': Baby,          // Baby Care
  '✨': Sparkle,       // Exfoliator
  '🛁': Bath,          // Bath & Body
  '👁️': Eye            // Eye Care
};

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-white mt-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our carefully curated collection of premium beauty products for every step of your skincare routine
          </p>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mx-auto">
          {categories.map((category) => {
            const IconComponent = iconComponents[category.icon];
            
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group block"
              >
                <div className="relative bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#F6DFC4] transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105 h-full flex flex-col items-center text-center">
                  
                  {/* Background Decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Icon Container */}
                  <div className="relative mb-4 p-4 bg-[#F6DFC4] rounded-2xl group-hover:bg-black group-hover:scale-110 transition-all duration-500">
                    {IconComponent ? (
                      <IconComponent 
                        size={32} 
                        className="text-black group-hover:text-[#F6DFC4] transition-colors duration-500" 
                      />
                    ) : (
                      <span className="text-2xl">{category.icon}</span>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="relative flex-1 flex flex-col justify-center">
                    <h3 className="font-bold text-black text-sm mb-2  transition-colors duration-300 leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                  
                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#F6DFC4] transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link 
            href="/categories" 
            className="inline-flex items-center gap-2 bg-black text-white hover:bg-gray-800 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <span>View All Categories</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}