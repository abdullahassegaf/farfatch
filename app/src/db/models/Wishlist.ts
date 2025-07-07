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
         .aggregate([
            { $match: { userId: new ObjectId(userId) } },
            {
               $lookup: {
                  from: "products",
                  localField: "productId",
                  foreignField: "_id",
                  as: "product",
               },
            },
            { $unwind: "$product" },
         ])
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
      const result = await collection.insertOne({
         productId: new ObjectId(data.productId),
         userId: new ObjectId(data.userId),
         createdAt: new Date(),
         updatedAt: new Date(),
      });
      return result;
   }

   static async isInWishlist(data: IWishlistPost): Promise<boolean> {
      const collection = this.getCollection();
      const existingItem = await collection.findOne({
         productId: new ObjectId(data.productId),
         userId: new ObjectId(data.userId),
      });
      return !!existingItem;
   }

   static async removeFromWishlist(data: IWishlistDelete) {
      const collection = this.getCollection();
      const result = await collection.deleteOne({
         productId: new ObjectId(data.productId),
         userId: new ObjectId(data.userId),
      });
      return result;
   }
}
