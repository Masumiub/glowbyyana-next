// components/ui/SearchBar.jsx
// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// export default function SearchBar() {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const searchRef = useRef(null);
//   const router = useRouter();

//   // Close suggestions when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowSuggestions(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Debounced search
//   useEffect(() => {
//     if (query.length < 2) {
//       setResults(null);
//       setShowSuggestions(false);
//       return;
//     }

//     const timer = setTimeout(async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
//         const data = await response.json();
        
//         if (response.ok) {
//           setResults(data);
//           setShowSuggestions(true);
//         } else {
//           setResults(null);
//         }
//       } catch (error) {
//         console.error('Search error:', error);
//         setResults(null);
//       } finally {
//         setLoading(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [query]);

// const handleSearch = (e) => {
//   e.preventDefault();
//   if (query.trim()) {
//     router.push(`/search?q=${encodeURIComponent(query)}`);
//     setShowSuggestions(false);
//     setQuery(''); // Clear the search input after navigation
//   }
// };

//   const handleSuggestionClick = () => {
//     setShowSuggestions(false);
//     setQuery('');
//   };

//   const totalResults = (results?.products?.length || 0) + 
//                       (results?.categories?.length || 0) + 
//                       (results?.tags?.length || 0);

//   return (
//     <div className="relative" ref={searchRef}>
//       <form onSubmit={handleSearch} className="join">
//         <input
//           type="text"
//           placeholder="Search products, categories, tags..."
//           className="input input-bordered join-item w-64 md:w-80 text-black"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onFocus={() => query.length >= 2 && setShowSuggestions(true)}
//         />
//         <button 
//           type="submit" 
//           className="btn bg-[#F6DFC4] join-item border-0 shadow-none"
//           //disabled={!query.trim()}
//         >
//           {loading ? (
//             <span className="loading loading-spinner loading-sm"></span>
//           ) : (
//             'Search'
//           )}
//         </button>
//       </form>

//       {/* Search Suggestions */}
//       {showSuggestions && results && (
//         <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-100 max-h-96 overflow-y-auto">
//           {/* Products */}
//           {results.products && results.products.length > 0 && (
//             <div className="p-2">
//               <h3 className="font-semibold text-sm text-gray-500 mb-2">Products</h3>
//               {results.products.map(product => (
//                 <Link
//                   key={product.id}
//                   href={`/products/${product.slug}`}
//                   onClick={handleSuggestionClick}
//                   className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <img
//                     src={product.images?.[0]?.src || '/placeholder-image.jpg'}
//                     alt={product.name}
//                     className="w-10 h-10 object-cover rounded"
//                   />
//                   <div className="flex-1">
//                     <p className="font-medium text-sm">{product.name}</p>
//                     <p className="text-xs text-gray-500">${product.price}</p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}

//           {/* Categories */}
//           {results.categories && results.categories.length > 0 && (
//             <div className="p-2 border-t">
//               <h3 className="font-semibold text-sm text-gray-500 mb-2">Categories</h3>
//               {results.categories.map(category => (
//                 <Link
//                   key={category.id}
//                   href={`/categories/${category.slug}`}
//                   onClick={handleSuggestionClick}
//                   className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
//                     <span className="text-lg">📁</span>
//                   </div>
//                   <div>
//                     <p className="font-medium text-sm">{category.name}</p>
//                     <p className="text-xs text-gray-500">Category</p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}

//           {/* Tags */}
//           {/* {results.tags && results.tags.length > 0 && (
//             <div className="p-2 border-t">
//               <h3 className="font-semibold text-sm text-gray-500 mb-2">Tags</h3>
//               <div className="flex flex-wrap gap-1">
//                 {results.tags.map(tag => (
//                   <Link
//                     key={tag.id}
//                     href={`/search?tag=${encodeURIComponent(tag.slug)}`}
//                     onClick={handleSuggestionClick}
//                     className="badge badge-outline hover:badge-primary cursor-pointer"
//                   >
//                     {tag.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )} */}

//           {/* No Results */}
//           {totalResults === 0 && (
//             <div className="p-4 text-center text-gray-500">
//               No results found for "{query}"
//             </div>
//           )}

//           {/* View All Results */}
//           {totalResults > 0 && (
//             <div className="p-2 border-t">
//               <button
//                 onClick={handleSearch}
//                 className="w-full text-center text-primary hover:bg-gray-100 py-2 rounded-lg font-medium"
//               >
//                 View all results ({totalResults})
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// components/ui/SearchBar.jsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults(null);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        console.log('🔍 Searching for:', query);
        const response = await fetch(`/lib/api/search?q=${encodeURIComponent(query)}`);
        console.log('📡 Search response status:', response.status);
        
        const data = await response.json();
        console.log('📦 Search results:', data);
        
        if (response.ok) {
          setResults(data);
          setShowSuggestions(true);
        } else {
          console.error('Search API error:', data);
          setResults(null);
        }
      } catch (error) {
        console.error('Search fetch error:', error);
        setResults(null);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
      setQuery('');
    }
  };

  const handleSuggestionClick = () => {
    setShowSuggestions(false);
    setQuery('');
  };

  const totalResults = (results?.products?.length || 0) + 
                      (results?.categories?.length || 0);

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearch} className="join">
        <input
          type="text"
          placeholder="Search products, categories..."
          className="input input-bordered join-item w-64 md:w-80 text-black bg-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowSuggestions(true)}
        />
        <button 
          type="submit" 
          className="btn bg-[#F6DFC4] join-item border-0 shadow-none text-black hover:bg-[#e8d0b0]"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            'Search'
          )}
        </button>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-xl mt-1 z-50 max-h-96 overflow-y-auto">
          
          {/* Debug info - remove in production */}
          {/* {process.env.NODE_ENV === 'development' && (
            <div className="p-2 bg-yellow-100 text-xs text-gray-700 border-b">
              Debug: Query: "{query}", Results: {totalResults}, Loading: {loading.toString()}
            </div>
          )} */}

          {/* Loading State */}
          {loading && (
            <div className="p-4 text-center">
              <span className="loading loading-spinner loading-sm"></span>
              <span className="ml-2 text-sm">Searching...</span>
            </div>
          )}

          {/* Results */}
          {!loading && results && (
            <>
              {/* Products */}
              {results.products && results.products.length > 0 && (
                <div className="p-2">
                  <h3 className="font-semibold text-sm text-gray-500 mb-2">Products</h3>
                  {results.products.map(product => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={handleSuggestionClick}
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                    >
                      <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={product.images?.[0]?.src || '/placeholder-image.jpg'}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">{product.name}</p>
                        <p className="text-xs text-gray-500">${product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Categories */}
              {results.categories && results.categories.length > 0 && (
                <div className="p-2 border-t border-gray-200">
                  <h3 className="font-semibold text-sm text-gray-500 mb-2">Categories</h3>
                  {results.categories.map(category => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      onClick={handleSuggestionClick}
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                        <span className="text-lg">📁</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900">{category.name}</p>
                        <p className="text-xs text-gray-500">Category</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* No Results */}
              {totalResults === 0 && (
                <div className="p-4 text-center text-gray-500">
                  <div className="text-lg mb-1">🔍</div>
                  <p>No results found for "{query}"</p>
                  <p className="text-xs mt-1">Try different keywords</p>
                </div>
              )}

              {/* View All Results */}
              {totalResults > 0 && (
                <div className="p-2 border-t border-gray-200">
                  <button
                    onClick={handleSearch}
                    className="w-full text-center text-blue-600 hover:bg-blue-50 py-2 rounded-lg font-medium text-sm transition-colors"
                  >
                    View all results ({totalResults})
                  </button>
                </div>
              )}
            </>
          )}

          {/* Error State */}
          {!loading && !results && query.length >= 2 && (
            <div className="p-4 text-center text-red-500">
              <p>Search unavailable</p>
              <p className="text-xs">Please try again later</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}