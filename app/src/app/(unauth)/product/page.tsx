import { ObjectId } from "mongodb";
import { Metadata } from "next";

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

export const metadata: Metadata = {
   title: "Product Page",
   description:
      "This is the product page where you can find details about our products.",
   openGraph: {
      images: [
         {
            url: "https://placehold.co/600x400/png",
            width: 600,
            height: 400,
         },
      ],
   },
};

// export default async function  (params:type) {

// }
