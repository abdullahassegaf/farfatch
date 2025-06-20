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
   const [page, setPage] = useState(1);
   const [hasMore, setHasMore] = useState(true);
   const [loading, setLoading] = useState(false);
   const fetchData = async (
      pageNum: number = 1,
      isNewSearch: boolean = false
   ) => {
      if (loading) return;

      setLoading(true);
      try {
         const apiUrl = `/api/products?page=${pageNum}&limit=8${
            searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""
         }`;

         const response = await fetch(apiUrl);
         if (!response.ok) {
            throw new Error("Failed to fetch products");
         }
         const data = await response.json();

         if (isNewSearch) {
            setProducts(data.products);
            setPage(1);
         } else {
            setProducts((prev) => [...prev, ...data.products]);
         }

         setHasMore(data.hasMore);
      } catch (error) {
         console.error("Error fetching products:", error);
      } finally {
         setLoading(false);
      }
   };

   const fetchMoreData = () => {
      if (hasMore && !loading) {
         const nextPage = page + 1;
         setPage(nextPage);
         fetchData(nextPage, false);
      }
   };

   useEffect(() => {
      setProducts([]);
      setPage(1);
      setHasMore(true);
      fetchData(1, true);
   }, [searchQuery]);

   return (
      <div className="min-h-screen bg-gray-100 p-8">
         <h1 className="text-4xl font-bold mb-8 text-center">All Products</h1>
         {/* Search Component */}
         <ProductSearch />{" "}
         <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
               <div className="text-center py-4">
                  <h4>Loading more products...</h4>
               </div>
            }
            endMessage={
               <p className="text-center py-4">
                  <b>You have seen all products!</b>
               </p>
            }
            refreshFunction={() => {
               setProducts([]);
               setPage(1);
               setHasMore(true);
               fetchData(1, true);
            }}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
               <h3 className="text-center">&#8595; Pull down to refresh</h3>
            }
            releaseToRefreshContent={
               <h3 className="text-center">&#8593; Release to refresh</h3>
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
