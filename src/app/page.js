// app/page.js
import { getLatestProducts } from './lib/api/products';
import { getAllCategories } from './lib/api/categories';
import LatestProducts from './components/home/LatestProducts';
import HeroSecrion from './components/home/HeroSection';
import BestSellers from './components/home/BestSellers';
import CategoryGrid from './components/home/CategoryGrid';
import SkinTypeGrid from './components/home/SkinTypeGrid';
import Testimonials from './components/home/Testimonials';
import FAQs from './components/home/FAQs';

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