"use client";

import { getCookie } from "@/app/components/actions";
import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { set } from "zod/v4";

export interface IWishlist {
   _id: ObjectId;
   productId: ObjectId;
   userId: ObjectId;
}
export default function WishlistPage() {
   const [wishlist, setWishlist] = useState<IWishlist[]>([]);

   useEffect(() => {
      fetchWishlist();
   }, []);

   const fetchWishlist = async () => {
      //   const cookie = await getCookie("access_token");
      const response = await fetch("http://localhost:3000/api/wishlist");
      const data = await response.json();
      if (!response.ok) {
         Swal.fire({
            title: "Error",
            text: "Failed to fetch wishlist",
            icon: "error",
         });
         return;
      }
      console.log(data, "<<<< wishlist data");

      setWishlist(data);
   };
   return (
      <div className="min-h-screen bg-gray-100 p-8">
         <h1 className="text-4xl font-bold mb-8 text-center">Wishlist</h1>
         <div className="flex items-center justify-center bg-gray-200 py-8">
            <p className="text-lg">Your wishlist is empty.</p>
         </div>
      </div>
   );
}
