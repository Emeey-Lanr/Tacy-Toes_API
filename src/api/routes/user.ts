import express from "express"
export const userRoute = express.Router()
import { userValidation } from "../validations/user.validation"
import { userC } from "../controllers/index.user"

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
userRoute.post("/signin", userC.signinC)
userRoute.put("/verify/email/:id", userC.verifyEmail)