"use client";

import { useState, useEffect } from "react";

const BannerCarousel = () => {
   const banners = ["/1.png", "/2.png", "/3.png"];
   const [currentBanner, setCurrentBanner] = useState(0);
   const [imgError, setImgError] = useState(false);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentBanner((prev) => (prev + 1) % banners.length);
         setImgError(false);
      }, 5000);
      return () => clearInterval(interval);
   }, []);

   const goToNextBanner = () => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
      setImgError(false);
   };
   const goToPrevBanner = () => {
      setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
      setImgError(false);
   };

   return (
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px] rounded-xl overflow-hidden shadow-lg bg-gray-200">
         {/* Banner images */}
         {banners.map((banner, index) => (
            <img
               key={index}
               src={banner}
               alt={`Banner ${index + 1}`}
               onError={() => setImgError(true)}
               className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
                  index === currentBanner && !imgError
                     ? "opacity-100 z-10"
                     : "opacity-0 z-0"
               }`}
               style={{ objectPosition: "center" }}
            />
         ))}
         {imgError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-red-500 z-20">
               Gambar tidak ditemukan
            </div>
         )}

         <button
            onClick={goToPrevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow z-30"
            aria-label="Previous banner"
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
               className="w-7 h-7"
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
            onClick={goToNextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow z-30"
            aria-label="Next banner"
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
               className="w-7 h-7"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
               />
            </svg>
         </button>
         {/* Dots navigation */}
         <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
            {banners.map((_, index) => (
               <button
                  key={index}
                  onClick={() => {
                     setCurrentBanner(index);
                     setImgError(false);
                  }}
                  className={`w-3 h-3 rounded-full border border-white shadow ${
                     index === currentBanner ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to banner ${index + 1}`}
               />
            ))}
         </div>
      </div>
   );
};

export default BannerCarousel;
