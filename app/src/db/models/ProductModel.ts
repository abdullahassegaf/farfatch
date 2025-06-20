import { getDb } from "../config/mongodb";
import { ObjectId } from "mongodb";

export interface IProducts {
   _id?: ObjectId;
   id?: number;
   name: string;
   slug: string;
   description: string;
   excerpt: string;
   price: number;
   tags: string[];
   thumbnail: string;
   images: string[];
   createdAt: Date;
   updatedAt: Date;
}

export default class ProductModel {
   static getCollection() {
      return getDb().collection<IProducts>("products");
   }
   static async findAll() {
      const collection = this.getCollection();
      const products = await collection.find().toArray();
      return products;
   }
   static async findBySlug(slug: string) {
      const collection = this.getCollection();
      const product = await collection.findOne({ slug });
      if (!product) throw new Error("Product not found");
      return product;
   }
   static async search(query: string) {
      const collection = this.getCollection();
      const pattern = new RegExp(query, "i");
      const products = await collection
         .find({
            $or: [
               { name: { $regex: pattern } },
               { description: { $regex: pattern } },
               { excerpt: { $regex: pattern } },
               { tags: { $elemMatch: { $regex: pattern } } },
            ],
         })
         .toArray();

      return products;
   }
   static async getPaginatedProducts(page: number, limit: number) {
      const collection = this.getCollection();
      const skip = (page - 1) * limit;
      const products = await collection
         .find()
         .skip(skip)
         .limit(limit)
         .toArray();

      const totalCount = await collection.countDocuments();
      const totalPages = Math.ceil(totalCount / limit);

      return {
         products,
         totalCount,
         totalPages,
         currentPage: page,
      };
   }
   static async searchPaginated(query: string, page: number, limit: number) {
      const collection = this.getCollection();
      const pattern = new RegExp(query, "i");
      const skip = (page - 1) * limit;

      const searchQuery = {
         $or: [
            { name: { $regex: pattern } },
            { description: { $regex: pattern } },
            { excerpt: { $regex: pattern } },
            { tags: { $elemMatch: { $regex: pattern } } },
         ],
      };

      const products = await collection
         .find(searchQuery)
         .skip(skip)
         .limit(limit)
         .toArray();

      const totalCount = await collection.countDocuments(searchQuery);
      const totalPages = Math.ceil(totalCount / limit);

      return {
         products,
         totalCount,
         totalPages,
         currentPage: page,
      };
   }
}
