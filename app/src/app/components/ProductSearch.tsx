"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductSearch() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
   const [isSearching, setIsSearching] = useState(false);

   // Update the search term when typing
   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setIsSearching(true);
   };

   // Clear search
   const handleClearSearch = () => {
      setSearchTerm("");
      setIsSearching(false);
      router.push("/product");
   };

   // Debounce logic
   useEffect(() => {
      const timer = setTimeout(() => {
         setDebouncedSearchTerm(searchTerm);
         setIsSearching(false);
      }, 500); // 500ms delay

      return () => {
         clearTimeout(timer);
      };
   }, [searchTerm]);

   // Update URL with search term
   useEffect(() => {
      if (debouncedSearchTerm) {
         router.push(`/product?q=${encodeURIComponent(debouncedSearchTerm)}`);
      } else if (debouncedSearchTerm === "") {
         router.push("/product");
      }
   }, [debouncedSearchTerm, router]);

   return (
      <div className="w-full max-w-2xl mx-auto mb-8">
         <div className="relative">
            <input
               type="text"
               value={searchTerm}
               onChange={handleSearchChange}
               placeholder="Search products..."
               className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute left-3 top-3 text-gray-400">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
               </svg>
            </div>

            {searchTerm && (
               <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="w-6 h-6"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                     />
                  </svg>
               </button>
            )}

            {isSearching && (
               <div className="absolute top-14 left-0 w-full bg-white shadow-md rounded-lg p-4 text-center text-gray-500">
                  Searching...
               </div>
            )}
         </div>
      </div>
   );
}
