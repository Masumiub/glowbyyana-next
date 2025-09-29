// app/api/categories/products/route.js
import { getCategoryBySlug } from '../../../../lib/api/categories';
import { getProductsByCategory } from '../../../../lib/api/products';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    console.log('🔍 API Route: Fetching products for category slug:', slug);
    
    if (!slug) {
      return new Response(
        JSON.stringify({ error: 'Category slug is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Get the category by slug to get its ID
    console.log('📦 Getting category by slug:', slug);
    const category = await getCategoryBySlug(slug);
    
    if (!category) {
      console.log('❌ Category not found for slug:', slug);
      return new Response(
        JSON.stringify({ error: `Category "${slug}" not found` }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('✅ Found category:', category.name, 'ID:', category.id);
    
    // Get products by category ID
    console.log('📦 Fetching products for category ID:', category.id);
    const products = await getProductsByCategory(category.id);
    console.log('✅ Found products:', products.length);
    
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ API Route Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch category products: ' + error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}