// app/products/[slug]/page.js
import ProductDetails from '@/app/components/products/ProductDetails';
import { getProductBySlug, getAllProducts } from '@/app/lib/api/products';

export async function generateStaticParams() {
  const products = await getAllProducts({ per_page: 100 });
  
  return products.map(product => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params; // Await params
  const product = await getProductBySlug(slug);
  
  return {
    title: `${product?.name} - Glow by Yana`,
    description: product?.short_description || product?.description,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params; // Await params
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600">The product youre looking for doesnt exist.</p>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}