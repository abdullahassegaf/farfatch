"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getCookie(name: string) {
   const cookieStore = await cookies();
   const cookie = cookieStore.get(name);
   return cookie;
}

export async function deleteCookie(name: string) {
   const cookieStore = await cookies();
   const cookie = cookieStore.delete(name);
   console.log("Cookie deleted");
   // redirect("/login"); // Redirect to login page after deleting cookie
   // return cookie;
}

export async function deleteWishlist(id: string) {
   const resp = await fetch(`https://localhost:3000/wishlist/${id}`, {
      method: "DELETE",
   });
   const data = await resp.json();

   revalidatePath("/wishlist");
}
