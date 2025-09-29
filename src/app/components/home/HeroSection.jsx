// components/home/HeroSection.jsx
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="hero py-20 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 text-left max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black leading-tight">
              Your Trusted Skincare Guide
            </h1>
            <p className="mb-8 text-gray-700 leading-relaxed">
              Discover premium beauty products that enhance your natural radiance. 
              Shop our curated collection of skincare, haircare, and cosmetics.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <Link 
                href="/categories" 
                className="btn bg-black text-white hover:bg-gray-800 border-black px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Shop All Categories
              </Link>
              <Link 
                href="/products" 
                className="btn bg-transparent text-black border-2 border-black hover:bg-black hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                View All Products
              </Link>
            </div> */}
          </div>

          {/* Right Images Grid */}
          <div className="flex-1 relative">
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:max-w-none">
              {/* Image 1 */}
              <div className="relative h-64 w-full transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                  alt="Skincare products"
                  fill sizes={250}
                  className="object-cover rounded-lg shadow-2xl"
                  priority
                />
              </div>
              
              {/* Image 2 */}
              <div className="relative h-64 w-full transform -rotate-2 hover:rotate-0 transition-transform duration-500 mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                  alt="Luxury skincare"
                  fill sizes={250}
                  className="object-cover rounded-lg shadow-2xl"
                />
              </div>
              
              {/* Image 3 */}
              <div className="relative h-64 w-full transform rotate-6 hover:rotate-0 transition-transform duration-500 -mt-4">
                <Image
                  src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                  alt="Beauty products"
                  fill sizes={250}
                  className="object-cover rounded-lg shadow-2xl"
                />
              </div>
              
              {/* Image 4 */}
              <div className="relative h-64 w-full transform -rotate-4 hover:rotate-0 transition-transform duration-500 mt-12">
                <Image
                  src="https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                  alt="Skincare routine"
                  fill sizes={250}
                  className="object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#F6DFC4] rounded-full opacity-80 -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-black rounded-full opacity-5 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}