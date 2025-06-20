"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import Swal from "sweetalert2";

interface RemoveFromWishlistIconButtonProps {
   productId: string;
   productName?: string;
   onRemove?: () => void;
   size?: "sm" | "md" | "lg";
}

export default function RemoveFromWishlistIconButton({
   productId,
   productName = "item",
   onRemove,
   size = "md",
}: RemoveFromWishlistIconButtonProps) {
   const { token } = useAuth();
   const { refreshWishlist } = useWishlist();
   const [loading, setLoading] = useState(false);

   const sizeClasses = {
      sm: "w-6 h-6 p-1",
      md: "w-8 h-8 p-1.5",
      lg: "w-10 h-10 p-2",
   };

   const handleRemove = async () => {
      if (!token) {
         Swal.fire({
            title: "🔐 Login Required",
            text: "Please login to manage your wishlist",
            icon: "warning",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
         });
         return;
      }

      // Show confirmation dialog
      const result = await Swal.fire({
         title: "🗑️ Remove from Wishlist?",
         text: `Are you sure you want to remove "${productName}" from your wishlist?`,
         icon: "question",
         showCancelButton: true,
         confirmButtonText: "Yes, Remove",
         cancelButtonText: "Cancel",
         confirmButtonColor: "#d33",
         cancelButtonColor: "#6c757d",
      });

      if (!result.isConfirmed) {
         return;
      }
      setLoading(true);
      try {
         const res = await fetch("/api/wishlist", {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               ...(token && { "x-user-id": token }),
            },
            body: JSON.stringify({ productId }),
         });
         const data = await res.json();

         if (!res.ok) {
            throw new Error(data.message || "Failed to remove from wishlist");
         }

         // Show success notification
         Swal.fire({
            title: "✅ Removed Successfully!",
            text: `"${productName}" has been removed from your wishlist`,
            icon: "success",
            timer: 2500,
            showConfirmButton: false,
            timerProgressBar: true,
         });

         // Trigger callbacks
         refreshWishlist();
         if (onRemove) {
            onRemove();
         }
      } catch (error: unknown) {
         const errorMessage =
            error instanceof Error
               ? error.message
               : "Failed to remove from wishlist";
         Swal.fire({
            title: "❌ Error",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#d33",
         });
      } finally {
         setLoading(false);
      }
   };

   return (
      <button
         onClick={handleRemove}
         disabled={loading}
         className={`${
            sizeClasses[size]
         } rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 transition-colors duration-200 flex items-center justify-center ${
            loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
         }`}
         title={`Remove ${productName} from wishlist`}
      >
         {loading ? (
            <svg
               className="animate-spin h-4 w-4"
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
            >
               <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
               ></circle>
               <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
               ></path>
            </svg>
         ) : (
            <svg
               className="w-4 h-4"
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
               />
            </svg>
         )}
      </button>
   );
}
