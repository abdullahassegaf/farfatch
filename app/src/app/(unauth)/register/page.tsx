import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RegisterPage({
   searchParams,
}: {
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
   const { error } = await searchParams;
   const handleRegister = async (param: FormData) => {
      "use server";

      const name = param.get("name");
      const email = param.get("email");
      const username = param.get("username");
      const password = param.get("password");
      if (!name) {
         return redirect("/register?error=Name is required");
      }
      const resp = await fetch(
         `${process.env.NEXT_PUBLIC_BASE_URL}/api/users` ||
            "http://localhost:3000/api/users",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               name,
               email,
               username,
               password,
            }),
         }
      );
      const data = await resp.json();

      if (!resp.ok) {
         redirect(`/register?error=${data.message}`);
      }
      redirect("/login");
   };
   return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
         <form
            className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
            action={handleRegister}
         >
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            {error && (
               <div className="bg-red-100 text-red-700 p-2 rounded text-center mb-2">
                  {error}
               </div>
            )}
            <div>
               <label className="block mb-1 font-medium">Name</label>
               <input
                  type="text"
                  name="name"
                  className="w-full border rounded px-3 py-2"
                  required
               />
            </div>
            <div>
               <label className="block mb-1 font-medium">Email</label>
               <input
                  type="email"
                  name="email"
                  className="w-full border rounded px-3 py-2"
                  required
               />
            </div>
            <div>
               <label className="block mb-1 font-medium">Username</label>
               <input
                  type="text"
                  name="username"
                  className="w-full border rounded px-3 py-2"
                  required
               />
            </div>
            <div>
               <label className="block mb-1 font-medium">Password</label>
               <input
                  type="password"
                  name="password"
                  className="w-full border rounded px-3 py-2"
                  required
               />
            </div>
            <button
               type="submit"
               className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
               Register
            </button>
            <p className="text-center text-sm mt-2">
               Already have an account?
               <Link href="/login" className="text-blue-600 hover:underline">
                  Login
               </Link>
            </p>
         </form>
      </div>
   );
}
