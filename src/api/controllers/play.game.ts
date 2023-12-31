import { Console } from "console"
import {Request, Response} from "express"
import { PlayGameS } from "../services/play.game"
import { errorResponse, succesResponse } from "../utils/response"
export class PlayGameC {
    static async verifyUser(req:Request, res:Response) {
        try {
            
            const verificationDetails = req.headers.authorization?.split(" ")[1]
            const detailsSplit = verificationDetails?.split("/") as string[]
      
            const jwt = detailsSplit[0]
            const ownerUsername = detailsSplit[1]
            const playerUsername = detailsSplit[2]
            const gameId = detailsSplit[3]
            const verifyUserF = await PlayGameS.verifyUserS(jwt, ownerUsername,playerUsername, gameId)
            if (verifyUserF instanceof Error) {
              if (verifyUserF.message === "Invalid Token") {
                 return errorResponse(res, 404, "Redirect-To-Login")
             }
             return errorResponse(res, 404, verifyUserF.message) 
            }

            return succesResponse(res, 200, verifyUserF, "Verification Successful")
        } catch (error:any) {
            return errorResponse(res, 400, "An error occcured")
        }
        
    }
}