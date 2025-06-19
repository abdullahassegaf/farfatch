import ProductModel from "@/db/models/ProductModel";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
   const searchParams = request.nextUrl.searchParams;
   const query = searchParams.get("q");

   let products;

   if (query) {
      // Search products by name, excerpt, description, or tags
      products = await ProductModel.search(query);
   } else {
      // Get all products if no search query
      products = await ProductModel.findAll();
   }

   return Response.json(products, { status: 200 });
}
