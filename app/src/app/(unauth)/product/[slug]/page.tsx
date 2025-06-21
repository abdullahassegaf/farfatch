import { IProducts } from "@/db/models/ProductModel";
import { Metadata } from "next";
import { formatRupiah } from "@/db/helpers/formatRupiah";
import AddToWishlistButton from "@/app/components/AddToWishlistButton";
import ProductImageGallery from "./ProductImageGallery";

interface IProps {
   params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
   const { slug } = await params;
   const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}` ||
         `http://localhost:3000/api/products/${slug}`
   );
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
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
         {/* Images */}
         <div className="lg:w-1/2">
            <ProductImageGallery
               images={product.images || []}
               productName={product.name}
               thumbnail={product.thumbnail}
            />
         </div>
         {/* Product Info */}
         <div className="lg:w-1/2 flex flex-col gap-6">
            <div className="space-y-4">
               <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  {product.name}
               </h1>
               <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
               </p>
            </div>

            <div className="border-t border-gray-200 pt-4">
               <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                     {formatRupiah(product.price)}
                  </span>
                  <span className="text-sm text-gray-500">
                     Inclusive of all taxes
                  </span>
               </div>
            </div>

            <div className="space-y-4">
               <AddToWishlistButton
                  productId={(product._id || product.id)?.toString() || ""}
               />

               <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                     📦 Delivery Information
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                     <p>
                        🚚 <strong>Estimated delivery:</strong> Jun 20 - Jun 27
                     </p>
                     <p>🏪 Free pickup available at our store</p>
                     <p>🔄 30-day return policy</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
