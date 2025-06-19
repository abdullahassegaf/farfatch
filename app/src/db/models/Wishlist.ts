import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb";

export interface IWishlistGet {
   productId: ObjectId;
   userId: ObjectId;
   createdAt?: Date;
   updatedAt?: Date;
}

export interface IWishlistPost {
   productId: string;
   userId: string;
}
export interface IWishlistDelete {
   productId: string;
   userId: string;
}
export default class WishlistModel {
   static getCollection() {
      return getDb().collection<IWishlistGet>("wishlist");
   }
   static async findAll(userId: string) {
      const collection = this.getCollection();
      const wishlist = await collection
         .find({ userId: new ObjectId(userId) })
         .toArray();
      return wishlist;
   }
   static async addToWishlist(data: IWishlistPost) {
      const collection = this.getCollection();
      const existingItem = await collection.findOne({
         productId: new ObjectId(data.productId),
         userId: new ObjectId(data.userId),
      });
      if (existingItem) {
         throw new Error("Item already exists in wishlist");
      }
      await collection.insertOne({
         productId: new ObjectId(data.productId),
         userId: new ObjectId(data.userId),
         createdAt: new Date(),
         updatedAt: new Date(),
      });
   }
}
