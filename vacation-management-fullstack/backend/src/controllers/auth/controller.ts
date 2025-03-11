import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createHmac } from "crypto";
import config from 'config'
import { sign } from "jsonwebtoken";
import AppError from "../../errors/app-error";
import User from "../../models/user";

function hashPassword(password: string): string {
    return createHmac('sha256', config.get<string>('app.secret'))
        .update(password)
        .digest('hex')
}

export async function login(req: Request<{}, {}, { email: string, password: string }>, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body
        const user = await User.findOne({
            where: {
                email,
                password: hashPassword(password)
            },
        })

        if (!user) return next(
            new AppError(
                StatusCodes.UNAUTHORIZED,
                'wrong credentials'
            ))

        const jwt = sign(user.get({ plain: true }), config.get<string>('app.jwtSecret'), { expiresIn: '24h' })
        res.json({ jwt })
    } catch (e) {
        next(e)
    }
}

export async function signUp(req: Request<{}, {}, { firstName: string, email: string, lastName: string, password: string }>, res: Response, next: NextFunction) {

    const { firstName, lastName, password, email } = req.body

    try {
        const user = await User.create({
            firstName,
            lastName,
            password: hashPassword(password),
            email
        })

        const jwt = sign(user.get({ plain: true }), config.get<string>('app.jwtSecret'), { expiresIn: '24h' })
        res.json({ jwt })

    } catch (e) {
        // if (e.name === 'SequelizeUniqueConstraintError') return next({
        //     status: 409,
        //     message: `username ${username} already exists. please try different username`
        // })
        if (e.email === 'SequelizeUniqueConstraintError') return next(
            new AppError(
                StatusCodes.CONFLICT,
                `email ${email} already exists. please choose another email.`
            ))
        next(e)
    }
}