// app/api/orders/route.js
import api from '@/app/lib/api/woocommerce';

export async function POST(request) {
  try {
    const orderData = await request.json();
    
    console.log('📦 Creating order in WordPress...');
    console.log('Order items:', orderData.line_items?.length || 0, 'items');

    // Validate required fields
    if (!orderData.billing?.first_name || !orderData.billing?.email || !orderData.line_items?.length) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields: first name, email, or products' 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Create the order in WooCommerce
    const response = await api.post("orders", orderData);

    console.log('✅ Order created successfully!', {
      orderId: response.data.id,
      orderNumber: response.data.number,
      total: response.data.total,
      status: response.data.status
    });
    
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Order creation failed:', error);
    
    let errorMessage = 'Failed to create order';
    let errorDetails = error.message;

    if (error.response) {
      // WooCommerce API error
      console.error('WooCommerce API Error:', {
        status: error.response.status,
        data: error.response.data
      });
      
      errorMessage = `WooCommerce Error: ${error.response.status}`;
      errorDetails = error.response.data?.message || JSON.stringify(error.response.data);
    } else if (error.request) {
      // Network error
      console.error('Network Error - No response received');
      errorMessage = 'Network error - cannot reach WooCommerce';
      errorDetails = 'Check your WooCommerce URL and internet connection';
    }

    return new Response(
      JSON.stringify({ 
        success: false,
        error: errorMessage,
        details: errorDetails 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// Add GET method to test the route
export async function GET() {
  return new Response(
    JSON.stringify({ 
      message: 'Orders API is working. Use POST to create orders.',
      methods: ['POST']
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}