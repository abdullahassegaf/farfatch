import ProductModel from "@/db/models/ProductModel";

interface IParams {
   params: Promise<{ slug: string }>;
}
export async function GET(req: Request, options: IParams) {
   const { slug } = await options.params;
   const product = await ProductModel.findBySlug(slug);
   return Response.json(product, { status: 200 });
}
