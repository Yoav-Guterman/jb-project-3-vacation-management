import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import AppError from "../errors/app-error";
import { StatusCodes } from "http-status-codes";

export default function filesValidation(validator: ObjectSchema) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            // if there is not file, pass to the next middleware
            if (!req.files) return next() // add this to files validation?? 
            //                               or create new optional file validation.

            req.files = await validator.validateAsync(req.files)
            next()
        } catch (e) {
            next(new AppError(StatusCodes.UNPROCESSABLE_ENTITY, e.message))
        }
    }
}
