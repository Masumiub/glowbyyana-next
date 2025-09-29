// app/page.js
import { getLatestProducts } from '@/app/lib/api/products';
import { getAllCategories } from '@/app/lib/api/categories';
import LatestProducts from '@/app/components/home/LatestProducts';
import HeroSecrion from '@/app/components/home/HeroSection';
import BestSellers from './components/home/BestSellers';
import CategoryGrid from '@/app/components/home/CategoryGrid';
import SkinTypeGrid from '@/app/components/home/SkinTypeGrid';
import Testimonials from '@/app/components/home/Testimonials';
import FAQs from '@/app/components/home/FAQs';

export default async function HomePage() {
  // Fetch data on the server
  const [latestProducts, bestSellers, categories] = await Promise.all([
    getLatestProducts(8),
    getAllCategories()
  ]);

  return (
    <div>
      {/* Hero Banner */}
      <HeroSecrion></HeroSecrion>

      <CategoryGrid />

      <SkinTypeGrid />

      {/* Latest Products Section */}
      <LatestProducts products={latestProducts} />

      <Testimonials></Testimonials>

      <FAQs></FAQs>
    </div>
  );
}