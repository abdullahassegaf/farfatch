"use client";

import { formatRupiah } from "@/db/helpers/formatRupiah";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { Metadata } from "next";
import ProductSearch from "@/app/components/ProductSearch";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export interface IProducts {
   _id: ObjectId;
   name: string;
   slug: string;
   description: string;
   excerpt: string;
   price: number;
   tags: string[];
   thumbnail: string;
   image: string[];
   createdAt: Date;
   updatedAt: Date;
}

export default function ProductPage() {
   const searchParams = useSearchParams();
   const searchQuery = searchParams.get("q") || "";
   const [products, setProducts] = useState<IProducts[]>([]);

   // Use the search parameter in the API call

   const fetchData = async () => {
      try {
         const apiUrl = searchQuery
            ? `http://localhost:3000/api/products?q=${encodeURIComponent(
                 searchQuery
              )}`
            : "http://localhost:3000/api/products";
         const response = await fetch(apiUrl);
         if (!response.ok) {
            throw new Error("Failed to fetch products");
         }
         const data: IProducts[] = await response.json();
         setProducts((prev) => [...prev, ...data]);
      } catch (error) {
         console.error("Error fetching products:", error);
      }
   };
   useEffect(() => {
      fetchData();
   }, [searchQuery]);

   return (
      <div className="min-h-screen bg-gray-100 p-8">
         <h1 className="text-4xl font-bold mb-8 text-center">All Products</h1>

         {/* Search Component */}
         <ProductSearch />

         <InfiniteScroll
            dataLength={products.length} //This is important field to render the next data
            next={fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
               <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
               </p>
            }
            // below props only if you need pull down functionality
            refreshFunction={fetchData}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
               <h3 style={{ textAlign: "center" }}>
                  &#8595; Pull down to refresh
               </h3>
            }
            releaseToRefreshContent={
               <h3 style={{ textAlign: "center" }}>
                  &#8593; Release to refresh
               </h3>
            }
         >
            <div className="flex items-center justify-center bg-gray-200 py-8">
               {products.length === 0 ? (
                  <div className="text-center py-8">
                     <h2 className="text-xl font-semibold">
                        No products found
                     </h2>
                     <p className="text-gray-500 mt-2">
                        Try a different search term
                     </p>
                  </div>
               ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
                     {products.map((product) => (
                        <Link
                           href={`/product/${product.slug}`}
                           key={product._id.toString()}
                           className="block"
                        >
                           <div className="bg-white rounded-lg shadow p-4 flex flex-col relative cursor-pointer hover:shadow-lg transition-shadow">
                              <button className="absolute top-3 right-3 p-1 rounded-full transition-colors text-gray-400 hover:text-black focus:outline-none">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    stroke="none"
                                    className="w-6 h-6"
                                 >
                                    <path d="M12.1 8.64l-.1.1-.11-.11C10.14 6.6 7.1 7.24 5.6 9.28c-1.5 2.04-.44 5.12 2.54 7.05l.01.01.01.01 3.36 2.35c.38.27.9.27 1.28 0l3.36-2.35.01-.01.01-.01c2.98-1.93 4.04-5.01 2.54-7.05-1.5-2.04-4.54-2.68-6.5-.64z" />
                                 </svg>
                              </button>
                              <img
                                 src={
                                    product.thumbnail ||
                                    "https://placehold.co/300x200/png"
                                 }
                                 alt={product.name}
                                 className="w-full h-48 object-contain mb-4 rounded"
                              />
                              <div className="font-semibold text-lg mb-1">
                                 {product.name}
                              </div>
                              <div className="text-gray-500 text-sm mb-2">
                                 {product.excerpt}
                              </div>
                              <div className="flex items-center gap-2 mb-1">
                                 <span className="font-bold text-lg">
                                    {formatRupiah(product.price)}
                                 </span>
                              </div>
                           </div>
                        </Link>
                     ))}
                  </div>
               )}
            </div>
         </InfiniteScroll>
      </div>
   );
}
