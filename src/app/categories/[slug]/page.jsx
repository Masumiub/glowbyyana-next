// app/categories/[slug]/page.js
import ProductCard from '@/app/components/ui/ProductCard';
import { getCategoryBySlug, getAllCategories } from '@/app/lib/api/categories';
import { getProductsByCategory } from '@/app/lib/api/products';


export async function generateStaticParams() {
  const categories = await getAllCategories();
  
  return categories.map(category => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  return {
    title: `${category?.name} - Glow by Yana`,
    description: category?.description || `Browse our ${category?.name} collection`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  
  try {
    const category = await getCategoryBySlug(slug);
    
    if (!category) {
      return (
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-600">The category "{slug}" doesnt exist.</p>
        </div>
      );
    }

    console.log('📦 Fetching products for category:', category.name, 'ID:', category.id);
    const products = await getProductsByCategory(category.id);
    console.log('✅ Found products:', products.length);

    return (
      <div className="w-full md:max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
          )}
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('❌ Category page error:', error);
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-gray-600">Failed to load category: {error.message}</p>
      </div>
    );
  }
}