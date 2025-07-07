import { ZodError } from "zod";
import CustomError from "./CustomError";
import { JWSInvalid } from "jose/errors";

export default function errorHandler(err: unknown): {
   message: string;
   status: number;
} {
   const result = { message: "Internal Server Error", status: 500 };
   if (err instanceof ZodError) {
      const error = err.errors[0];
      result.message = `${error.path[0]} - ${error.message}`;
      result.status = 400;
   } else if (err instanceof CustomError) {
      result.message = err.message;
      result.status = err.status;
   } else if (err instanceof JWSInvalid) {
      result.message = "Invalid Token";
      result.status = 403;
   } else if (err instanceof Error) {
      result.message = err.message;
      if (err.message === "Item already exists in wishlist") {
         result.status = 409; // Conflict status code
      } else {
         result.status = 500;
      }
   }
   return result;
}
