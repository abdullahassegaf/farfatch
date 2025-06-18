import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
   const id = req.headers.get("x-wishlist-id");
   const username = req.headers.get("x-wishlist-username");

   // const product = await
}
