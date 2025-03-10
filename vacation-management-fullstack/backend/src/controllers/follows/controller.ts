import { NextFunction, Request, Response } from "express";
import User from "../../models/user";
import Follow from "../../models/follow";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";


export async function followVacation(req: Request<{ vacationId: string }>, res: Response, next: NextFunction) {
    try {
        const userId = req.userId

        const { vacationId } = req.params

        const newFollowVacation = await Follow.create({
            userId: userId,
            vacationId: vacationId
        })
        res.json(newFollowVacation)

    } catch (e) {
        if (e.message === "Validation error") return next(
            new AppError(
                StatusCodes.CONFLICT,
                "you already follow this vacation"
            )
        )
        next(e)
        // check later the situation when someone is trying 
        // to add wrong uuid vacation
    }
}

export async function unfollowVacation(req: Request<{ vacationId: string }>, res: Response, next: NextFunction) {
    try {
        const userId = req.userId

        const { vacationId } = req.params

        const unfollowVacation = await Follow.destroy({
            where: {
                userId: userId,
                vacationId: vacationId
            }
        })

        if (!unfollowVacation) return next(new AppError(
            StatusCodes.NOT_FOUND,
            'tried to delete unexisting record'
        ))

        res.json({ success: true })

    } catch (e) {
        next(e)
    }
}