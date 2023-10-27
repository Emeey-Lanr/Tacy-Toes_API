import Joi from "joi";
export const signupValidationSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_number:Joi.number().min(10).required(),
    password: Joi.string().min(6).required()
})