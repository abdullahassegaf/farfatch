import USerModel from "@/db/models/UserModel";

interface IParams {
   params: Promise<{ id: string }>;
}

export async function GET(req: Request, options: IParams) {
   const { id } = await options.params;
   const user = await USerModel.findById(id);
   return Response.json(user, { status: 200 });
}
