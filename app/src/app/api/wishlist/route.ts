import errorHandler from "@/db/helpers/errorHandler";
import WishlistModel from "@/db/models/Wishlist";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
   const id = req.headers.get("x-user-id");

   const wishlist = await WishlistModel.findAll(id as string);

   return Response.json(wishlist, { status: 200 });
}

export async function POST(req: NextRequest) {
   try {
      const id = req.headers.get("x-user-id");
      if (!id) {
         return Response.json(
            { message: "User ID is required" },
            { status: 400 }
         );
      }
      const body = await req.json();
      const data = {
         productId: body.productId,
         userId: id,
      };

      // Check if item already exists
      const isAlreadyInWishlist = await WishlistModel.isInWishlist(data);
      if (isAlreadyInWishlist) {
         return Response.json(
            { message: "Item already exists in wishlist" },
            { status: 409 }
         );
      }

      await WishlistModel.addToWishlist(data);
      return Response.json(
         { message: "Item added to wishlist" },
         { status: 201 }
      );
   } catch (error) {
      const { message, status } = errorHandler(error);
      return Response.json({ message }, { status });
   }
}

export async function DELETE(req: NextRequest) {
   try {
      const id = req.headers.get("x-user-id");
      if (!id) {
         return Response.json(
            { message: "User ID is required" },
            { status: 400 }
         );
      }
      const body = await req.json();
      const data = {
         productId: body.productId,
         userId: id,
      };
      await WishlistModel.removeFromWishlist(data);
      return Response.json(
         { message: "Item removed from wishlist" },
         { status: 200 }
      );
   } catch (error) {
      const { message, status } = errorHandler(error);
      return Response.json({ message }, { status });
   }
}
