"use client";

import { getCookie } from "@/app/components/actions";
import { IProducts } from "@/app/page";
import { useState } from "react";

export default async function WishlistPage() {
   const [wishlist, setWishlist] = useState<IProducts | null>(null);

   const cookie = await getCookie("access_token");
   console.log(cookie);
}
