import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from './lib/context/CartContext';
import Header from '@/app/components/ui/Header';
import Footer from '@/app/components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Glow by Yana - Premium Beauty Products',
  description: 'Discover the finest beauty and skincare products at Glow by Yana',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme='light'>
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}