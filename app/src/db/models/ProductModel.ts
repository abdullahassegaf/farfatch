import { getDb } from "../config/mongodb";

export interface IProducts {
   id: number;
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
}
