"use client";

import { ObjectId } from "mongodb";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import RemoveFromWishlistIconButton from "@/app/components/RemoveFromWishlistIconButton";
import { formatRupiah } from "@/db/helpers/formatRupiah";
import Image from "next/image";

export interface IWishlist {
   _id: ObjectId;
   productId: ObjectId;
   userId: ObjectId;
   product?: {
      _id: ObjectId;
      name: string;
      slug: string;
      description: string;
      excerpt: string;
      price: number;
      tags: string[];
      thumbnail: string;
      images: string[];
   };
}
export interface ErrorResponse {
   success: false;
   error: {
      code: string;
      message: string;
      details?: string;
   };
   timestamp?: string;
}

export default function WishlistPage() {
   const [wishlist, setWishlist] = useState<IWishlist[]>([]);
   const { token } = useAuth();
   const { wishlistVersion } = useWishlist();
   const router = useRouter();
   const fetchWishlist = useCallback(async () => {
      try {
         const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist` ||
               "http://localhost:3000/api/wishlist",
            {
               headers: {
                  ...(token ? { "x-user-id": token } : {}),
               },
            }
         );
         const data = await response.json();
         if (!response.ok) {
            Swal.fire({
               title: "Error",
               text: data.message || "Failed to fetch wishlist",
               icon: "error",
            });
            return;
         }
         setWishlist(data);
      } catch (error) {
         Swal.fire({
            title: "Error",
            text:
               error instanceof Error
                  ? error.message
                  : "Failed to fetch wishlist",
            icon: "error",
         });
      }
   }, [token]);

   useEffect(() => {
      if (!token) {
         router.push("/login");
         return;
      }
      fetchWishlist();
   }, [token, wishlistVersion, fetchWishlist, router]);

   return (
      <div className="min-h-screen bg-gray-100 p-8">
         <h1 className="text-4xl font-bold mb-8 text-center">Wishlist</h1>
         {wishlist.length === 0 ? (
            <div className="flex items-center justify-center bg-gray-200 py-8">
               <p className="text-lg">Your wishlist is empty.</p>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {wishlist.map((item: IWishlist) => (
                  <div
                     key={item._id.toString()}
                     className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center relative hover:shadow-lg transition-shadow"
                  >
                     {/* Remove Button - positioned at top right */}
                     <div className="absolute top-3 right-3">
                        <RemoveFromWishlistIconButton
                           productId={item.productId.toString()}
                           productName={item.product?.name}
                           size="md"
                           onRemove={() => fetchWishlist()}
                        />
                     </div>

                     {/* Clickable area for product link */}
                     <Link
                        href={`/product/${item.product?.slug}`}
                        className="flex flex-col items-center w-full"
                     >
                        <Image
                           src={item.product?.thumbnail || "/no-image.png"}
                           alt={item.product?.name || "Product image"}
                           className="w-32 h-32 object-cover mb-4 rounded"
                           width={128}
                           height={128}
                        />
                        <h2 className="text-xl font-semibold mb-2 text-center">
                           {item.product?.name}
                        </h2>
                        <p className="text-gray-600 mb-2 text-center text-sm">
                           {item.product?.excerpt}
                        </p>
                        <span className="text-green-600 font-bold mb-4">
                           {formatRupiah(item.product?.price || 0)}
                        </span>
                     </Link>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}
