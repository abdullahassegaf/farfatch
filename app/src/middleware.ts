import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import errorHandler from "./db/helpers/errorHandler";

export async function middleware(req: NextRequest) {
   try {
      const { pathname } = req.nextUrl;
      if (pathname.includes("api")) {
         if (pathname.includes("api/wishlist")) {
            const cookieStore = await cookies();
            const token = cookieStore.get("access_token");
            if (!token)
               return Response.json(
                  { message: "Unauthorized" },
                  { status: 401 }
               );
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            console.log("<<<<<<< payload in middleware");
            const { payload } = await jose.jwtVerify<{
               _id: string;
               username: string;
            }>(token.value, secret);
            console.log("payload", payload);

            const requestHeaders = new Headers(req.headers);
            const response = NextResponse.next({
               request: {
                  headers: requestHeaders,
               },
            });
            response.headers.set("X-User-Id", payload._id);
            response.headers.set("X-Username", payload.username);

            return response;
         }
      }
   } catch (error) {
      // console.log(error, "<<<<<<< error in middleware");

      const { message, status } = errorHandler(error);
      return Response.json({ message }, { status });
   }
}
