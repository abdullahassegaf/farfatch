import { z } from "zod";
import { getDb } from "../config/mongodb";
import bcrypt from "bcryptjs";
import CustomError from "../helpers/CustomError";
import jwt from "jsonwebtoken";

export interface IUser {
   name: string;
   email: string;
   password: string;
   username: string;
}

export interface ILogin {
   username: string;
   password: string;
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
      const userEmail = await collection.findOne({
         email: payload.email,
      });
      const userUsername = await collection.findOne({
         username: payload.username,
      });
      if (userEmail) throw new CustomError("Email already exists", 400);
      if (userUsername) throw new CustomError("Username already exists", 400);
      payload.password = await bcrypt.hash(payload.password, 10);
      await collection.insertOne(payload);

      return "User registered successfully";
   }
   static async login(payload: ILogin): Promise<string> {
      const collection = this.getCollection();
      const { username, password } = payload;
      if (!username) throw new CustomError("Username is required", 400);
      if (!password) throw new CustomError("Password is required", 400);
      const user = await collection.findOne({ username });
      if (!user) throw new CustomError("Invalid username or password", 401);
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword)
         throw new CustomError("Invalid username or password", 401);

      const token = jwt.sign(
         { _id: user._id, username: user.username },
         process.env.JWT_SECRET as string,
         {
            expiresIn: "1d",
         }
      );

      return token;
   }
}
