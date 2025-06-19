"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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
