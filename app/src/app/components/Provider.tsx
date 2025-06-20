"use client";
import AuthContext from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "./actions";

export default function Provider({ children }: { children: React.ReactNode }) {
   const router = useRouter();

   const [token, setToken] = useState<string | null>(null);

   useEffect(() => {
      fetchToken();
   }, []);

   const fetchToken = async () => {
      const cookie = await getCookie("access_token");
      setToken(cookie?.value || null);
   };

   const handleLogout = async () => {
      await deleteCookie("access_token");
      setToken(null);
      router.push("/login");
   };
   return (
      <AuthContext.Provider value={{ token, setToken }}>
         <WishlistProvider>{children}</WishlistProvider>
      </AuthContext.Provider>
   );
}
