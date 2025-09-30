// components/ui/Header.jsx
'use client';
import Link from 'next/link';
import { useCart } from '@/app/lib/context/CartContext';
import SearchBar from './SearchBar';
import { categories } from '@/app/lib/utils/categories';
import { House, Mails } from 'lucide-react';

export default function Header() {
    const { getCartItemsCount } = useCart();

    return (
        <>
            <header className="bg-white text-black shadow-sm border-b-1 border-gray-300">

                <div className="w-full md:max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between py-4">

                        <div className='hidden md:block'>

                            <Link href="/" className="text-xl">
                                <div className='flex flex-col justify-center items-center'>
                                    <h1>GLOW</h1>
                                    <h1>BY YANA</h1>
                                </div>
                            </Link>
                        </div>

                        <div>

                            <div className="flex-1 max-w-4xl">
                                <SearchBar />
                            </div>
                        </div>

                        <div>
                            
                            <div className="flex items-center gap-4">
                                <Link href="/cart" className="btn btn-ghost btn-circle relative">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21" />
                                    </svg>
                                    {getCartItemsCount() > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                            {getCartItemsCount()}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>


            </header>
            <div className='border-1 border-gray-300'>
                <div className="navbar bg-base-100 shadow-b-sm w-full md:max-w-7xl mx-auto ">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li><a>Sunscreen</a></li>
                                <li>
                                    <a>Toner</a>
                                </li>
                                <li><a>Essence</a></li>
                            </ul>
                        </div>
                        <Link className="btn btn-ghost" href='/'><House /></Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {categories.slice(0, 10).map((category) =>
                            (
                                <Link
                                    key={category.id}
                                    href={`/categories/${category.slug}`}
                                    className="group block"
                                >
                                    <li className="px-2 text-xs">
                                        {category.name}
                                    </li>
                                </Link>
                            ))
                            }
                        </ul>
                    </div>
                    <div className="navbar-end pr-4">
                        <Mails />
                    </div>
                </div>
            </div>

        </>
    );
}