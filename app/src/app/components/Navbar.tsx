"use client";
import Link from "next/link";
import { deleteCookie } from "./actions";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

export default function Navbar() {
   const router = useRouter();
   const { token, setToken } = useContext(AuthContext);

   const handleLogout = async () => {
      await deleteCookie("access_token");
      setToken(null);
      router.push("/login");
   };
   return (
      <nav className="bg-white border-b border-gray-200 w-full">
         <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-8">
            {/* Left menu - Search Input */}
            <div className="flex items-center w-[350px]"></div>

            {/* Center logo */}
            <div className="flex-1 flex justify-center">
               <Link
                  href="/"
                  className="text-4xl font-extrabold tracking-widest text-black select-none"
               >
                  FARFATCH
               </Link>
            </div>

            {/* Right menu */}
            <div className="flex items-center gap-6 min-w-[350px] justify-end">
               {/* User icon */}

               <Link href="/profile" className="inline-flex items-center">
                  <svg
                     width="24"
                     height="24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     viewBox="0 0 24 24"
                     className="text-gray-700"
                  >
                     <circle cx="12" cy="8" r="4" />
                     <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                  </svg>
               </Link>

               <Link href="/wishlist" className="inline-flex items-center">
                  <svg
                     width="24"
                     height="24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     viewBox="0 0 24 24"
                     className="text-gray-700"
                  >
                     <path d="M12 21s-6.5-4.35-9-7.5C-1.5 8.5 3.5 3 8.5 7.5c2.5 2.25 3.5 2.25 6 0C20.5 3 25.5 8.5 21 13.5c-2.5 3.15-9 7.5-9 7.5z" />
                  </svg>
               </Link>

               {/* {login / logout} */}
               {token ? (
                  <button
                     onClick={handleLogout}
                     className="text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                     Logout
                  </button>
               ) : (
                  <>
                     <Link
                        href="/login"
                        className="text-gray-700 hover:text-gray-900"
                     >
                        Login
                     </Link>

                     <Link
                        href="/register"
                        className="text-gray-700 hover:text-gray-900"
                     >
                        Register
                     </Link>
                  </>
               )}
            </div>
         </div>
      </nav>
   );
}
