import errorHandler from "@/db/helpers/errorHandler";
import USerModel, { IUser } from "@/db/models/UserModel";

export async function POST(req: Request) {
   try {
      const body: IUser = await req.json();
      const message = await USerModel.register(body);

      return Response.json({ message }, { status: 201 });
   } catch (error) {
      const result = errorHandler(error);

      return Response.json(
         { message: result.message },
         { status: result.status }
      );
   }
}
