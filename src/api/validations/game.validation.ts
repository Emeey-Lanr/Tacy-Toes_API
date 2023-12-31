import { createGame } from "../utils/game.schema";
import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response";
export class GameValidation {
  static async validateBeforeCreation  (req:Request, res:Response, next:NextFunction)  {
    const { error } = createGame.validate(req.body,{abortEarly:false})
    if (error) {
        return errorResponse(res, 422, `${error.message}`)
    }
    return next()
}

}
