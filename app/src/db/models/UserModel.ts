import { z } from "zod";
import { getDb } from "../config/mongodb";
import bcrypt from "bcryptjs";
import CustomError from "../helpers/CustomError";

export interface IUser {
   name: string;
   email: string;
   password: string;
   username: string;
}

const userSchema = z.object({
   name: z.string().min(1, "Name is required"),
   email: z.string().email("Invalid email address"),
   password: z.string().min(5, "Password must be at least 5 characters"),
   username: z.string().min(3, "Username must be at least 3 characters"),
});

export default class USerModel {
   static getCollection() {
      return getDb().collection<IUser>("users");
   }
   static async register(payload: IUser) {
      userSchema.parse(payload);

      const collection = this.getCollection();
      const user = await collection.findOne({ email: payload.email });
      if (user) throw new CustomError("User already exists");
      payload.password = await bcrypt.hash(payload.password, 10);
      await collection.insertOne(payload);
   }
}
