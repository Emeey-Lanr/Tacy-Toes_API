import express from "express"
export const userRoute = express.Router()
import { userValidation } from "../validations/user.validation"
import { userC } from "../controllers"

/**
 * @tacky
 *  /signup:
 *   post:
 *     description:register user
 *       responses:
 *        200:
 *          description:success
 */
userRoute.post("/signup", userValidation.signup, userC.signupC)
