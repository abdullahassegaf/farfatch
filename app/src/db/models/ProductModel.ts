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
   image: string[];
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
}
