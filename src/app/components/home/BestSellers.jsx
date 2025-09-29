// components/home/BestSellers.jsx
// import React from 'react';
// import ProductCard from '../ui/ProductCard';
// import { getBestSellers } from '../../lib/api/products';

// export default async function BestSellers() {
//   try {
//     const products = await getBestSellers(8);
    
//     return (
//       <section className="py-12 bg-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">Best Sellers</h2>
          
//           {products.length === 0 ? (
//             <div className="text-center">
//               <p className="text-lg">No products found.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
//               {products.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//     );
//   } catch (error) {
//     console.error('Error in BestSellers:', error);
    
//     return (
//       <section className="py-12 bg-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">Best Sellers</h2>
//           <div className="text-center text-error">
//             <p>Failed to load products. Please try again later.</p>
//           </div>
//         </div>
//       </section>
//     );
//   }
// }