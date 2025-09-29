// app/checkout/page.js
'use client';
import React, { useState } from 'react';
import { useCart } from '../lib/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart, getCartItemsCount } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const router = useRouter();

  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Bangladesh', // Default country
    zipCode: ''
  });

  // Method 1: Redirect to WordPress Checkout
// In your checkout page, update the redirectToWordPressCheckout function:
const redirectToWordPressCheckout = async () => {
  setLoading(true);
  try {
    // Validate cart has items
    if (items.length === 0) {
      alert('Your cart is empty');
      setLoading(false);
      return;
    }

    // Create order data
    const orderData = {
      payment_method: "cod",
      payment_method_title: "Cash on Delivery",
      set_paid: false,
      status: "pending",
      customer_id: 0, // Guest checkout
      billing: {
        first_name: customerInfo.firstName,
        last_name: customerInfo.lastName,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address_1: customerInfo.address,
        city: customerInfo.city,
        country: customerInfo.country,
        postcode: customerInfo.zipCode,
        state: ""
      },
      shipping: {
        first_name: customerInfo.firstName,
        last_name: customerInfo.lastName,
        address_1: customerInfo.address,
        city: customerInfo.city,
        country: customerInfo.country,
        postcode: customerInfo.zipCode,
        state: ""
      },
      line_items: items.map(item => ({
        product_id: item.id,
        quantity: item.quantity
        // Don't include price - WooCommerce will get it from the product
      })),
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Free Shipping",
          total: "0"
        }
      ]
    };

    console.log('🔄 Sending order to API...');

    const response = await fetch('/lib/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    const result = await response.json();

    if (response.ok) {
      // Success!
      setOrderDetails(result);
      setOrderPlaced(true);
      clearCart();
      console.log('🎉 Order placed successfully!', result);
    } else {
      // API returned error
      console.error('❌ API Error Response:', result);
      alert(`Order failed: ${result.error}\n${result.details || ''}`);
    }

  } catch (error) {
    // Network error (fetch failed)
    console.error('❌ Network Error:', error);
    alert('Network error. Please check your connection and try again.');
  } finally {
    setLoading(false);
  }
};
//   // Method 2: Simple Form Submission to WordPress
//   const submitToWordPressForm = () => {
//     // This method creates a form and submits it to WordPress
//     const form = document.createElement('form');
//     form.method = 'POST';
//     form.action = `${process.env.NEXT_PUBLIC_WOOCOMMERCE_URL}/checkout/`;
    
//     // Add all cart items as form data
//     items.forEach((item, index) => {
//       const quantityInput = document.createElement('input');
//       quantityInput.type = 'hidden';
//       quantityInput.name = `quantity[${item.id}]`;
//       quantityInput.value = item.quantity;
//       form.appendChild(quantityInput);
//     });

//     // Add customer info
//     Object.entries(customerInfo).forEach(([key, value]) => {
//       const input = document.createElement('input');
//       input.type = 'hidden';
//       input.name = `billing_${key}`;
//       input.value = value;
//       form.appendChild(input);
//     });

//     document.body.appendChild(form);
//     form.submit();
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || 
        !customerInfo.phone || !customerInfo.address || !customerInfo.city || !customerInfo.zipCode) {
      alert('Please fill in all required fields.');
      return;
    }

    await redirectToWordPressCheckout();
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="w-full md:max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some products to checkout</p>
        <Link href="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="w-full md:max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your order has been received.
          </p>
          {orderDetails && (
            <div className="bg-base-200 p-6 rounded-lg mb-6">
              <p><strong>Order ID:</strong> #{orderDetails.id}</p>
              <p><strong>Total:</strong> ${orderDetails.total}</p>
              <p><strong>Payment Method:</strong> Cash on Delivery</p>
            </div>
          )}
          <div className="flex gap-4 justify-center">
            <Link href="/" className="btn btn-primary">
              Continue Shopping
            </Link>
            {/* <Link href="/orders" className="btn btn-outline">
              View Orders
            </Link> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="card bg-base-100 shadow-sm border border-base-200">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Customer Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text">First Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="input input-bordered w-full"
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text">Last Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="input input-bordered w-full"
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="label">
                    <span className="label-text">Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="input input-bordered w-full"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="label">
                    <span className="label-text">Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    className="input input-bordered w-full"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm border border-base-200">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Shipping Address</h2>
                
                <div>
                  <label className="label">
                    <span className="label-text">Address *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Street address"
                    className="input input-bordered w-full"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text">City *</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="input input-bordered w-full"
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text">ZIP Code *</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="input input-bordered w-full"
                      value={customerInfo.zipCode}
                      onChange={(e) => setCustomerInfo({...customerInfo, zipCode: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="label">
                    <span className="label-text">Country</span>
                  </label>
                  <select 
                    className="select select-bordered w-full"
                    value={customerInfo.country}
                    onChange={(e) => setCustomerInfo({...customerInfo, country: e.target.value})}
                  >
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm border border-base-200">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      defaultChecked
                      className="radio radio-primary"
                    />
                    <div>
                      <span className="font-medium">Cash on Delivery</span>
                      <div className="text-sm text-gray-500">Pay when you receive your order</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-lg w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Processing Order...
                </>
              ) : (
                `Place Order - $${getCartTotal().toFixed(2)}`
              )}
            </button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="card bg-base-100 shadow-sm border border-base-200 sticky top-4">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-base-200 rounded overflow-hidden">
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal ({getCartItemsCount()} items)</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-success">Free</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span className="text-primary">
                    ${(getCartTotal() * 1.1).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}