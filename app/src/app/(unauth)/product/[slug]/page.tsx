import ProductModel, { IProducts } from "@/db/models/ProductModel";
import { Metadata } from "next";
import { formatRupiah } from "@/db/helpers/formatRupiah";
import Image from "next/image";

interface IProps {
   params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
   const { slug } = await params;
   const resp = await fetch(`http://localhost:3000/api/products/${slug}`);
   const product: IProducts = await resp.json();

   return {
      title: product.name,
      description: product.description,
      openGraph: {
         images: [
            {
               url: product.thumbnail,
               width: 800,
               height: 600,
            },
         ],
      },
   };
}

export default async function ProductDetail(props: IProps) {
   const { slug } = await props.params;

   const resp = await fetch(`http://localhost:3000/api/products/${slug}`);
   const product: IProducts = await resp.json();
   return (
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto py-10 px-4">
         {/* Images */}
         <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
               {product.images && product.images.length > 0 ? (
                  product.images.map((img, idx) => (
                     <Image
                        key={img}
                        src={img}
                        alt={product.name + " image " + (idx + 1)}
                        width={300}
                        height={200}
                        className="rounded-lg object-cover border w-full h-40"
                     />
                  ))
               ) : (
                  <Image
                     src={
                        product.thumbnail || "https://placehold.co/300x200/png"
                     }
                     alt={product.name}
                     width={300}
                     height={200}
                     className="rounded-lg object-cover border w-full h-40"
                  />
               )}
            </div>
         </div>
         {/* Product Info */}
         <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="text-gray-500 mb-2">{product.description}</div>
            <div className="flex items-center gap-2 mb-2">
               <span className="text-xl font-bold text-black-600">
                  {formatRupiah(product.price)}
               </span>
            </div>
            <button className="bg-black text-white py-3 rounded-lg font-semibold text-lg mt-4 hover:bg-gray-800 transition">
               Add To Wishlist
            </button>
            <div className="text-sm text-gray-500 mt-2">
               Estimated delivery
               <br />
               Jun 20 - Jun 27
            </div>
         </div>
      </div>
   );
}
