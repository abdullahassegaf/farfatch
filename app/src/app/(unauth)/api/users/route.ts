import CustomError from "@/db/helpers/CustomError";
import USerModel, { IUser } from "@/db/models/UserModel";
import { ZodError } from "zod";

export async function POST(req: Request) {
   try {
      const body: IUser = await req.json();
      const message = await USerModel.register(body);

      return Response.json({ message }, { status: 201 });
   } catch (error) {
      if (error instanceof ZodError) {
         const err = error.errors[0];
         return Response.json(
            { message: `${err.path[0]} - ${err.message}` },
            { status: 400 }
         );
      } else if (error instanceof CustomError) {
         return Response.json(
            { message: error.message },
            { status: error.status }
         );
      }
      return Response.json(
         { message: "Internal Server Error" },
         { status: 500 }
      );
   }
}
