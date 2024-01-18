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
        const loginUser = await UserS.signin(req.body) 
        if (loginUser instanceof Error) {
             return errorResponse(res, 400, loginUser.message);
        }
         return succesResponse(res, 201, loginUser, 'Valid Crendetials')
    } catch (error:any) {
           return errorResponse(res, 400, error.message);
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

export const getUserDetails = async (req:Request, res:Response) => {
    try {
        const userDetails = await UserS.getUserDetails(
          req.params.id,
          `${req.headers.authorization?.split(" ")[1]}`
        );
        if (userDetails instanceof Error) {
             return errorResponse(res, 404, userDetails.message);
        }
     return succesResponse(res, 200, userDetails, 'Verification Succesfull')
        
    } catch (error) {
           return errorResponse(res, 404, "An error occured fetching user's data");
    }
}

export const changePassword = async (req: Request, res: Response) => {
    const {old_password, new_password, email} = req.body
    try {
        const changeUserPassword = await UserS.changePassword(old_password, new_password, email)
        if (changeUserPassword instanceof Error) {
            return  errorResponse(res, 404, changeUserPassword.message)
        }
        return succesResponse(res, 200, "", "Password Updated Successfully")
    } catch (error) {
      
     return errorResponse(res, 404, "An error occured updating user's password");
 }   
}
export const verifyResetForgotPasssord = async (req: Request, res:Response) => {
    try {
     
        const verificationToReset = await UserS.verifyResetForgotPasssord(`${req.body.emailOrUsernameData}`)
        if (verificationToReset instanceof Error) {
            return errorResponse(res, 404, `${verificationToReset.message}`)
        }
        return succesResponse(res, 200, verificationToReset, "Email sent successfully")
    } catch (error) {
     return errorResponse(res, 400, "An error occured")    
    }
}
export const verifyForgotPasswordToken = async (req:Request, res:Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        const verifyToken = await UserS.verifyForgotPasswordToken(`${token}`)
        if (verifyToken instanceof Error) {
            return errorResponse(res, 404, verifyToken.message)
        }
        return succesResponse(res, 200, verifyToken, "Verification Succesfull")
    } catch (error:any) {
        return  errorResponse(res, 400, "An error occured")
    }
}
export const  newForgotPassword = async (req:Request, res:Response) => {
    try {
        const reset = await UserS.newForgotPassword(`${req.body.userDetails.email}`, `${req.body.userDetails.username}`, `${req.body.password}`);
        if (reset instanceof Error) {
          return  errorResponse(res, 404, "An error occured")
        }
        return succesResponse(res, 200, "Password updated", "Password updated successfully")
    } catch (error) {
        return errorResponse(res, 400, "An error occured")
    }
}
export const updateViewedNotification = async (req:Request, res:Response) => {
    try {
        const update = await UserS.updateNotificationViewed(`${req.body.username}`)
        if (update instanceof Error) {
            return errorResponse(res, 404, "An error occured")
        }
        return succesResponse(res, 200, update.updated, "Updated successfully")
    } catch (error) {
        errorResponse(res, 4000, "An error occured")
    }
}
