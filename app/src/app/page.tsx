import { formatRupiah } from "@/db/helpers/formatRupiah";
import { ObjectId } from "mongodb";
import Link from "next/link";
import BannerCarousel from "./components/BannerCarousel";
import Image from "next/image";

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
interface IProductsResponse {
   products: IProducts[];
   hasMore: boolean;
   totalCount: number;
   currentPage: number;
   totalPages: number;
}
export default async function Home() {
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
   const resp = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store", // Ensure fresh data
   });

   if (!resp.ok) {
      return new Error(`Failed to fetch products: ${resp.status}`);
   }

   const products: IProductsResponse = await resp.json();
   const response = products.products.slice(0, 8);

   return (
      <div className="min-h-screen bg-gray-100 p-8">
         <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl font-bold text-center mb-2">
               Everydays FARFATCH Flash Sale
               <span role="img" aria-label="lightning">
                  ⚡
               </span>
            </h2>
            <div className="w-full max-w-5xl rounded-xl overflow-hidden shadow-lg bg-white">
               <BannerCarousel />
            </div>
         </div>

         <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
               {response.map((product) => (
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
                        <Image
                           height={200}
                           width={300}
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
         </div>
         <div className="flex justify-center mt-8">
            <Link href="/product">
               <button className="px-8 py-3 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition-all duration-200">
                  See All
               </button>
            </Link>
         </div>
      </div>
   );
}
