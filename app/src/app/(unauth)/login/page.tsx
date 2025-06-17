import Link from "next/link";

export interface ILogin {
   username: string;
   password: string;
}

export default function Login() {
   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
         <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-2xl font-semibold">Come on in</h2>
               <button className="text-gray-500 hover:text-gray-700">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="w-6 h-6"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                     />
                  </svg>
               </button>
            </div>

            <div className="mb-6">
               <div className="flex border-b">
                  <button className="py-2 px-4 text-sm font-medium text-center text-black border-b-2 border-black">
                     SIGN IN
                  </button>
                  <Link
                     href="/register"
                     className="py-2 px-4 text-sm font-medium text-center text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  >
                     I'M NEW HERE
                  </Link>
               </div>
            </div>

            <form>
               <div className="mb-4">
                  <label
                     htmlFor="email"
                     className="block text-sm font-medium text-gray-700 mb-1"
                  >
                     Email address
                  </label>
                  <input
                     type="email"
                     id="email"
                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                  />
               </div>

               <div className="mb-6">
                  <label
                     htmlFor="password"
                     className="block text-sm font-medium text-gray-700 mb-1"
                  >
                     Password
                  </label>
                  <input
                     type="password"
                     id="password"
                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                  />
               </div>

               <div className="mb-6">
                  <a href="#" className="text-sm text-black hover:underline">
                     Forgot your password?
                  </a>
               </div>

               <button
                  type="submit"
                  className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
               >
                  Sign In
               </button>
            </form>
         </div>
      </div>
   );
}
