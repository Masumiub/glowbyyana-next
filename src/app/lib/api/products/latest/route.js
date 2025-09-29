// app/api/products/latest/route.js
import { getLatestProducts } from '@/app/lib/api/products';

export async function GET() {
  try {
    console.log('API Route: Fetching latest products...');
    console.log('WOOCOMMERCE_URL:', process.env.WOOCOMMERCE_URL);
    
    const products = await getLatestProducts(8);
    console.log('API Route: Products fetched successfully', products.length);
    
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('API Route Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch latest products: ' + error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}