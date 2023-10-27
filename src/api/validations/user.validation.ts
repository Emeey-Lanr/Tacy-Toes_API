import { Request, Response, NextFunction } from "express";
import { signupValidationSchema } from "../utils/user.schema";
import { errorResponse } from "../utils/response";
export class userValidation {
    static async signup(req:Request, res:Response, next:NextFunction) {       
  const { error } = signupValidationSchema.validate(req.body, { abortEarly: false })
            if (error) {
                return errorResponse(res, 422, `${error.message}`)
            }
            return next()
       
    }
}