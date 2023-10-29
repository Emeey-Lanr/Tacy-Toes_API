import { Request, Response } from "express"
import { UserS } from "../services/user"
import { errorResponse, succesResponse } from "../utils/response"

export const signupC = async (req: Request, res: Response) => {
    try {
        
        const registerUser = await UserS.signup(req.body)
        if (registerUser instanceof Error) {
            return errorResponse(res, 400, registerUser.message)
        }
        return succesResponse(res, 201, registerUser,'Registartion Sucessfull')
    } catch (error:any) {
         return errorResponse(res, 400, error.message);
    }
    
}

export const signinC = async (req: Request, res:Response) => {
    try {
        
    } catch (error) {
        
    }
}

export const verifyEmail = async (req: Request, res: Response) => {
    try {
    
        const verification = await UserS.verifyEmail(`${req.params.id}`, req.body.token)
        if (verification instanceof Error) {
            return errorResponse(res, 404, verification.message)
        }
        return succesResponse(res, 200, verification, 'Verification Successful' )
    } catch (error) {
         return errorResponse(res, 404, "An error during verification");
    }
    
}
