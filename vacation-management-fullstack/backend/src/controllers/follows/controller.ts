import { NextFunction, Request, Response } from "express";
import User from "../../models/user";
import Follow from "../../models/follow";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";
import socket from "../../io/io";
import SocketMessages from "socket-enums-yoavguterman";


export async function followVacation(req: Request<{ vacationId: string }>, res: Response, next: NextFunction) {
    try {
        const user = req.user
        const userId = req.user.id

        const { vacationId } = req.params

        const newFollowVacation = await Follow.create({
            userId: userId,
            vacationId: vacationId
        })
        res.json(newFollowVacation)

        socket.emit(SocketMessages.FOLLOW_VACATION, {
            from: req.headers['x-client-id'], // req.header(), req.get()
            data: { vacationId: vacationId, user: user }
        })

    } catch (e) {
        if (e.message === "Validation error") return next(
            new AppError(
                StatusCodes.CONFLICT,
                "you already follow this vacation"
            )
        )
        next(e)
    }
}

export async function unfollowVacation(req: Request<{ vacationId: string }>, res: Response, next: NextFunction) {
    try {
        const user = req.user
        const userId = req.user.id

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

        socket.emit(SocketMessages.UNFOLLOW_VACATION, {
            from: req.headers['x-client-id'], // req.header(), req.get()
            data: { vacationId: vacationId, user: user }
        })

    } catch (e) {
        next(e)
    }
}