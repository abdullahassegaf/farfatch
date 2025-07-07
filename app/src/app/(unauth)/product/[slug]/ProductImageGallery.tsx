"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
   images: string[];
   productName: string;
   thumbnail?: string;
}

export default function ProductImageGallery({
   images,
   productName,
   thumbnail,
}: ProductImageGalleryProps) {
   // Prepare the image list - use images if available, otherwise use thumbnail
   const imageList =
      images && images.length > 0
         ? images
         : thumbnail
         ? [thumbnail]
         : ["https://placehold.co/600x400/png"];

   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
   const [isLoading, setIsLoading] = useState(true);

   return (
      <div className="space-y-4">
         {/* Main Image Display */}
         <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-lg">
            <Image
               src={imageList[selectedImageIndex]}
               alt={`${productName} - Image ${selectedImageIndex + 1}`}
               fill
               className={`object-cover transition-all duration-300 ${
                  isLoading ? "blur-sm" : "blur-0"
               }`}
               priority
               onLoad={() => setIsLoading(false)}
               onError={() => setIsLoading(false)}
            />

            {/* Loading overlay */}
            {isLoading && (
               <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                  <div className="text-gray-400">Loading...</div>
               </div>
            )}

            {/* Image counter */}
            <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
               {selectedImageIndex + 1} / {imageList.length}
            </div>

            {/* Navigation arrows for multiple images */}
            {imageList.length > 1 && (
               <>
                  <button
                     onClick={() =>
                        setSelectedImageIndex(
                           selectedImageIndex === 0
                              ? imageList.length - 1
                              : selectedImageIndex - 1
                        )
                     }
                     className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  >
                     <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M15 19l-7-7 7-7"
                        />
                     </svg>
                  </button>
                  <button
                     onClick={() =>
                        setSelectedImageIndex(
                           selectedImageIndex === imageList.length - 1
                              ? 0
                              : selectedImageIndex + 1
                        )
                     }
                     className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  >
                     <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M9 5l7 7-7 7"
                        />
                     </svg>
                  </button>
               </>
            )}
         </div>

         {/* Thumbnail Navigation */}
         {imageList.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
               {imageList.map((image, index) => (
                  <button
                     key={index}
                     onClick={() => {
                        setSelectedImageIndex(index);
                        setIsLoading(true);
                     }}
                     className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === selectedImageIndex
                           ? "border-blue-500 ring-2 ring-blue-200 scale-105"
                           : "border-gray-200 hover:border-gray-300 hover:scale-102"
                     }`}
                  >
                     <Image
                        src={image}
                        alt={`${productName} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                     />
                     {index === selectedImageIndex && (
                        <div className="absolute inset-0 bg-blue-500/20"></div>
                     )}
                  </button>
               ))}
            </div>
         )}

         {/* Zoom hint */}
         <div className="text-center text-sm text-gray-500">
            <span className="inline-flex items-center gap-1">
               <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
               </svg>
               Click image to view full size
            </span>
         </div>
      </div>
   );
}
