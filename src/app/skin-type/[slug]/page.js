// app/skin-type/[slug]/page.js
import { getAllProducts } from '@/app/lib/api/products';
import { skinTypes } from '@/app/lib/utils/skinTypes';
import ProductCard from '@/app/components/ui/ProductCard';

export async function generateStaticParams() {
  return skinTypes.map(skinType => ({
    slug: skinType.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const skinType = skinTypes.find(st => st.slug === slug);
  
  return {
    title: `${skinType?.name} - Glow by Yana`,
    description: skinType?.description || `Products for ${skinType?.name}`,
  };
}

export default async function SkinTypePage({ params }) {
  const { slug } = await params;
  const skinType = skinTypes.find(st => st.slug === slug);

  if (!skinType) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Skin Type Not Found</h1>
        <p className="text-gray-600">The skin type you re looking for doesnt exist.</p>
      </div>
    );
  }

  try {
    // Fetch ALL products and filter on the server (no API call needed)
    const allProducts = await getAllProducts();
    
    // Filter products for this skin type
    const filteredProducts = allProducts.filter(product => {
      const searchSlug = slug.replace('-skin', '').replace('-', ' ');
      
      // Search in product tags
      const hasSkinTypeTag = product.tags?.some(tag => {
        const tagName = tag.name.toLowerCase();
        const tagSlug = tag.slug.toLowerCase();
        return tagName.includes(searchSlug) || tagSlug.includes(slug);
      });
      
      // Search in product categories
      const hasSkinTypeCategory = product.categories?.some(category => {
        const categoryName = category.name.toLowerCase();
        const categorySlug = category.slug.toLowerCase();
        return categoryName.includes(searchSlug) || categorySlug.includes(slug);
      });
      
      // Search in product attributes
      const hasSkinTypeAttribute = product.attributes?.some(attribute => {
        const isSkinAttribute = 
          attribute.name?.toLowerCase().includes('skin') ||
          attribute.name === 'pa_skin-type';
        
        if (isSkinAttribute) {
          return attribute.options?.some(option => 
            option.toLowerCase().includes(searchSlug)
          );
        }
        return false;
      });
      
      // Search in product name
      const hasSkinTypeInName = product.name.toLowerCase().includes(searchSlug);
      
      return hasSkinTypeTag || hasSkinTypeCategory || hasSkinTypeAttribute || hasSkinTypeInName;
    });

    console.log(`✅ Skin type "${skinType.name}": Found ${filteredProducts.length} products`);

    return (
      <div className="w-full md:w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{skinType.icon}</div>
          <h1 className="text-4xl font-bold mb-4">{skinType.name}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {skinType.description}
          </p>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold mb-2">No products found</h2>
            <p className="text-gray-600 mb-4">
              We're working on adding more products for {skinType.name}.
            </p>
            <a href="/categories" className="btn btn-primary">
              Browse All Categories
            </a>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredProducts.length} products found for {skinType.name}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    );
  } catch (error) {
    console.error('Skin type page error:', error);
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-gray-600">Failed to load products for this skin type: {error.message}</p>
      </div>
    );
  }
}