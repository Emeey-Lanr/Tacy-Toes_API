import { Request, Response } from "express"
import { UserS } from "../services/user"
import { errorResponse, succesResponse } from "../utils/response"

export const signupC = async (req: Request, res: Response) => {
    try {
        
        const registerUser = await UserS.signup(req.body)
        if (registerUser instanceof Error) {
            return errorResponse(res, 400, registerUser.message)
        }
        return succesResponse(res, 201, {token:registerUser},'Registartion Sucessfull')
    } catch (error:any) {
         return errorResponse(res, 400, error.message);
    }
    
}