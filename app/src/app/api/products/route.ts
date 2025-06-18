import ProductModel from "@/db/models/ProductModel";

export async function GET() {
   const product = await ProductModel.findAll();
   return Response.json(product, { status: 200 });
}
