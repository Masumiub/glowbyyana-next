// components/home/SkinTypeGrid.jsx
import Link from 'next/link';
import { skinTypes } from '../../lib/utils/skinTypes';
import { 
  Smile, 
  Sparkles, 
  CloudRain, 
  Scale, 
  Leaf, 
  Heart 
} from 'lucide-react';

// Map emoji icons to Lucid React icons
const skinTypeIcons = {
  '😊': Smile,        // Normal Skin
  '✨': Sparkles,      // Oily Skin
  '🏜️': CloudRain,    // Dry Skin (using CloudRain as placeholder)
  '⚖️': Scale,        // Combination
  '🌿': Leaf,         // Sensitive
  '❤️‍🩹': Heart        // Damaged
};

export default function SkinTypeGrid() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Shop by Skin Type
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find products specifically formulated for your unique skin needs and concerns
          </p>
        </div>
        
        {/* Skin Types Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {skinTypes.map((skinType) => {
            const IconComponent = skinTypeIcons[skinType.icon];
            
            return (
              <Link
                key={skinType.id}
                href={`/skin-type/${skinType.slug}`}
                className="group block"
              >
                <div className="relative bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#F6DFC4] transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105 h-full flex flex-col items-center text-center">
                  
                  {/* Background Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Icon Container */}
                  <div className="relative mb-4 p-4 bg-gradient-to-br from-[#F6DFC4] to-[#f0d2b0] rounded-2xl group-hover:from-black group-hover:to-gray-800 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    {IconComponent ? (
                      <IconComponent 
                        size={32} 
                        className="text-black group-hover:text-[#F6DFC4] transition-colors duration-500" 
                      />
                    ) : (
                      <span className="text-2xl">{skinType.icon}</span>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="relative flex-1 flex flex-col justify-center">
                    <h3 className="font-bold text-black text-sm mb-2  transition-colors duration-300 leading-tight">
                      {skinType.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {skinType.description}
                    </p>
                  </div>
                  
                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#F6DFC4] transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-transparent group-hover:from-[#F6DFC4]/5 group-hover:to-transparent transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link 
            href="/skin-type-guide" 
            className="inline-flex items-center gap-2 bg-black text-white hover:bg-gray-800 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>Find Your Skin Type</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}