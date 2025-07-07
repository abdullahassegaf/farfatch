import errorHandler from "@/db/helpers/errorHandler";
import USerModel from "@/db/models/UserModel";

export async function POST(req: Request) {
   try {
      const body = await req.json();
      const token = await USerModel.login(body);
      return Response.json({ token }, { status: 200 });
   } catch (error) {
      const { message, status } = errorHandler(error);
      return Response.json({ message }, { status });
   }
}
