import Joi from "joi";

export const loginValidator = Joi.object({
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(4).max(64).required()
})

export const signupValidator = loginValidator.append({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
})