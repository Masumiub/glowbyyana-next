
// app/page.js
import { getLatestProducts } from '@/app/lib/api/products';
import { getAllCategories } from '@/app/lib/api/categories';
import LatestProducts from '@/app/components/home/LatestProducts';
import HeroSection from '@/app/components/home/HeroSection';
import CategoryGrid from '@/app/components/home/CategoryGrid';
import SkinTypeGrid from '@/app/components/home/SkinTypeGrid';
import Testimonials from '@/app/components/home/Testimonials';
import FAQs from '@/app/components/home/FAQs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  try {
    // Fetch all data in parallel with proper error handling
    const results = await Promise.allSettled([
      getLatestProducts(8),
      getAllCategories()
    ]);

    // Safely extract values with defaults
    const [latestProductsResult, , categoriesResult] = results;

    const products = latestProductsResult?.status === 'fulfilled' ? latestProductsResult.value : [];
    const allCategories = categoriesResult?.status === 'fulfilled' ? categoriesResult.value : [];

    console.log('Homepage data loaded:', {
      products: products.length,
      categories: allCategories.length
    });

    return (
      <div>
        <HeroSection />
        <CategoryGrid categories={allCategories} />
        <SkinTypeGrid />
        <LatestProducts products={products} />
        <Testimonials />
        <FAQs />
      </div>
    );
  } catch (error) {
    console.error('Home page error:', error);
    
    // Fallback UI if everything fails
    return (
      <div>
        <HeroSection />
        <CategoryGrid categories={[]} />
        <SkinTypeGrid />
        <LatestProducts products={[]} />
        <Testimonials />
        <FAQs />
      </div>
    );
  }
}

// // app/page.js
// import { getLatestProducts } from '@/app/lib/api/products';
// import { getAllCategories } from '@/app/lib/api/categories';
// import LatestProducts from '@/app/components/home/LatestProducts';
// import HeroSecrion from '@/app/components/home/HeroSection';
// import CategoryGrid from '@/app/components/home/CategoryGrid';
// import SkinTypeGrid from '@/app/components/home/SkinTypeGrid';
// import Testimonials from '@/app/components/home/Testimonials';
// import FAQs from '@/app/components/home/FAQs';


// export const dynamic = 'force-dynamic'; // Add this at the top
// export const revalidate = 0; // Disable caching

// export default async function HomePage() {
//   // Fetch data on the server
//   const [latestProducts, bestSellers, categories] = await Promise.all([
//     getLatestProducts(8),
//     getAllCategories()
//   ]);

//   return (
//     <div>
//       {/* Hero Banner */}
//       <HeroSecrion></HeroSecrion>

//       <CategoryGrid />

//       <SkinTypeGrid />

//       {/* Latest Products Section */}
//       <LatestProducts products={latestProducts} />

//       <Testimonials></Testimonials>

//       <FAQs></FAQs>
//     </div>
//   );
// }