// app/api/skin-type/[slug]/products/route.js
import { getAllProducts } from '@/app/lib/api/products';

export async function GET(request, { params }) {
  try {
    const { slug } = params; // Remove await, params is already available
    
    console.log('🔍 Fetching products for skin type:', slug);
    
    const products = await getAllProducts();
    console.log(`📦 Total products available: ${products.length}`);
    
    // Filter products by skin type
    const filteredProducts = products.filter(product => {
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

    console.log('✅ Found products for skin type:', {
      skinType: slug,
      products: filteredProducts.length,
      searchSlug: slug.replace('-skin', '').replace('-', ' ')
    });

    // Debug: Log some matching products
    if (filteredProducts.length > 0) {
      console.log('📝 Sample matching products:');
      filteredProducts.slice(0, 3).forEach(product => {
        console.log(`   - ${product.name}`);
        console.log(`     Tags: ${product.tags?.map(t => t.name).join(', ') || 'None'}`);
        console.log(`     Categories: ${product.categories?.map(c => c.name).join(', ') || 'None'}`);
      });
    }

    return new Response(JSON.stringify(filteredProducts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Skin type products API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch skin type products: ' + error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}