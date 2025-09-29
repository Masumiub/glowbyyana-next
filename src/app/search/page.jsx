// app/search/page.js
import { getAllProducts } from '@/app/lib/api/products';
import { getAllCategories } from '@/app/lib/api/categories';
import ProductCard from '@/app/components/ui/ProductCard';

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams;
  const query = q?.toLowerCase().trim();

  if (!query) {
    return (
      <div className="w-full md:max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Search</h1>
        <p className="text-gray-600">Enter a search term to find products.</p>
      </div>
    );
  }

  try {
    const [allProducts, allCategories] = await Promise.all([
      getAllProducts({ per_page: 100 }),
      getAllCategories()
    ]);

    // Search by query (ONLY name, categories, and SKU)
    const filteredProducts = allProducts.filter(product => {
      const searchableText = `
        ${product.name?.toLowerCase() || ''}
        ${product.categories?.map(cat => cat.name).join(' ')?.toLowerCase() || ''}
        ${product.sku?.toLowerCase() || ''}
      `;
      return searchableText.includes(query);
    });

    return (
      <div className="w-full md:max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          <p className="text-gray-600">
            {filteredProducts.length} products found for "{query}"
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold mb-2">No products found</h2>
            <p className="text-gray-600 mb-4">
              Try different keywords or browse our categories
            </p>
            <a href="/categories" className="btn btn-primary">
              Browse Categories
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Search page error:', error);
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-gray-600">Failed to load search results.</p>
      </div>
    );
  }
}