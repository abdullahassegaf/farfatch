import ProductModel from "@/db/models/ProductModel";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
   const searchParams = request.nextUrl.searchParams;
   const query = searchParams.get("q");
   const page = parseInt(searchParams.get("page") || "1");
   const limit = parseInt(searchParams.get("limit") || "8");
   try {
      if (query) {
         // Use pagination for search results too
         const result = await ProductModel.searchPaginated(query, page, limit);
         const hasMore = result.currentPage < result.totalPages;

         return Response.json(
            {
               products: result.products,
               hasMore,
               totalCount: result.totalCount,
               currentPage: result.currentPage,
               totalPages: result.totalPages,
            },
            { status: 200 }
         );
      } else {
         // Use pagination for regular product listing
         const result = await ProductModel.getPaginatedProducts(page, limit);
         const hasMore = result.currentPage < result.totalPages;

         return Response.json(
            {
               products: result.products,
               hasMore,
               totalCount: result.totalCount,
               currentPage: result.currentPage,
               totalPages: result.totalPages,
            },
            { status: 200 }
         );
      }
   } catch (error) {
      console.error("Error fetching products:", error);
      return Response.json(
         { error: "Failed to fetch products" },
         { status: 500 }
      );
   }
}
