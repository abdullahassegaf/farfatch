"use client";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import Swal from "sweetalert2";

interface AddToWishlistButtonProps {
   productId: string;
}

export default function AddToWishlistButton({
   productId,
}: AddToWishlistButtonProps) {
   const { token } = useContext(AuthContext);
   const { refreshWishlist } = useWishlist();
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const [isAdded, setIsAdded] = useState(false);

   // Check if item is already in wishlist when component mounts
   useEffect(() => {
      if (token) {
         checkIfInWishlist();
      }
   }, [token, productId]);
   const checkIfInWishlist = async () => {
      try {
         const response = await fetch("/api/wishlist", {
            headers: {
               ...(token ? { "x-user-id": token } : {}),
            },
         });
         if (response.ok) {
            const wishlist = await response.json();
            const isInWishlist = wishlist.some(
               (item: any) => item.productId.toString() === productId.toString()
            );
            setIsAdded(isInWishlist);
         }
      } catch (error) {
         // Silently fail - not critical, but log for debugging
         console.error("Failed to check wishlist status:", error);
         setIsAdded(false);

         // Only show error if it's a network issue or server error
         if (error instanceof Error && error.message.includes("fetch")) {
            console.warn("Network error while checking wishlist status");
         }
      }
   };
   const handleToggleWishlist = async () => {
      if (!token) {
         Swal.fire({
            title: "🔐 Login Required",
            text: "Please login to add items to your wishlist and save your favorite products",
            icon: "warning",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
         });
         return;
      }

      // If already in wishlist, remove it
      if (isAdded) {
         await handleRemove();
         return;
      }

      // If not in wishlist, add it
      await handleAdd();
   };

   const handleAdd = async () => {
      setLoading(true);
      try {
         const res = await fetch("/api/wishlist", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "x-user-id": token,
            },
            body: JSON.stringify({ productId }),
         });
         const data = await res.json();
         if (!res.ok) {
            if (res.status === 409) {
               // Item already in wishlist - backend validation
               Swal.fire({
                  title: "⚠️ Duplicate Item Detected",
                  text: "This item is already in your wishlist. Our system has prevented adding it again.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "View My Wishlist",
                  cancelButtonText: "OK",
                  confirmButtonColor: "#3085d6",
               }).then((result) => {
                  if (result.isConfirmed) {
                     router.push("/wishlist");
                  }
               });
               setIsAdded(true);
               refreshWishlist(); // Refresh to sync the state
               return;
            } else {
               throw new Error(data.message || "Failed to add to wishlist");
            }
         } // Show success notification
         Swal.fire({
            title: "🎉 Added to Wishlist!",
            text: "Item has been successfully added to your wishlist",
            icon: "success",
            timer: 2500,
            showConfirmButton: false,
            timerProgressBar: true,
         });

         setIsAdded(true);
         refreshWishlist(); // Trigger wishlist refresh
      } catch (err: any) {
         Swal.fire({
            title: "Error",
            text: err.message || "Failed to add to wishlist",
            icon: "error",
            confirmButtonText: "OK",
         });
      } finally {
         setLoading(false);
      }
   };

   const handleRemove = async () => {
      setLoading(true);
      try {
         const res = await fetch("/api/wishlist", {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               "x-user-id": token,
            },
            body: JSON.stringify({ productId }),
         });
         const data = await res.json();

         if (!res.ok) {
            throw new Error(data.message || "Failed to remove from wishlist");
         } // Show success notification
         Swal.fire({
            title: "🗑️ Removed from Wishlist",
            text: "Item has been successfully removed from your wishlist",
            icon: "success",
            timer: 2500,
            showConfirmButton: false,
            timerProgressBar: true,
         });

         setIsAdded(false);
         refreshWishlist(); // Trigger wishlist refresh
      } catch (err: any) {
         Swal.fire({
            title: "Error",
            text: err.message || "Failed to remove from wishlist",
            icon: "error",
            confirmButtonText: "OK",
         });
      } finally {
         setLoading(false);
      }
   };
   return (
      <div>
         {" "}
         <button
            onClick={handleToggleWishlist}
            disabled={loading}
            className={`py-3 rounded-lg font-semibold text-lg mt-4 transition w-full ${
               isAdded
                  ? "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                  : loading
                  ? "bg-gray-600 text-white cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
            }`}
         >
            {loading
               ? "Processing..."
               : isAdded
               ? "❤️ Remove from Wishlist"
               : "🤍 Add to Wishlist"}
         </button>
      </div>
   );
}
