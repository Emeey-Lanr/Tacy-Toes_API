import { Response } from "express"
export const errorResponse = (res: Response, statusCode: number, message:string) => {
    res.status(statusCode).json({message, status:false})
    
}
export const succesResponse = (res: Response, statusCode: number, info: any, message: string) => {
    res.status(statusCode).json({ info, message, status: true })
}