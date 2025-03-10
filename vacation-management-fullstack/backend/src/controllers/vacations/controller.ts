import { NextFunction, Request, Response } from "express";
import Vacation from "../../models/vacation";
import Follow from "../../models/follow";
import User from "../../models/user";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";

export async function getAllVacations(req: Request, res: Response, next: NextFunction) {
    try {
        const vacations = await Vacation.findAll({
            include: [User], // Just include User model
            order: [['startDate', 'ASC']]
        });
        res.json(vacations);
    } catch (e) {
        next(e);
    }
}

export async function createVacation(req: Request<{}, {}, { destination: string, description: string, startDate: Date, endDate: Date, price: number }>, res: Response, next: NextFunction) {
    try {

        const { destination, description, startDate, endDate, price } = req.body

        const newVacation = await Vacation.create({
            destination,
            description,
            startDate,
            endDate,
            price
        })
        res.json(newVacation);

    } catch (e) {
        next(e);
    }
}

export async function removeVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {

        const { id } = req.params

        const deletedRows = await Vacation.destroy({
            where: { id }
        })

        if (deletedRows === 0) return next(new AppError(StatusCodes.NOT_FOUND, 'the vacation you were trying to delete does not exist'))

        res.json({
            success: true
        })
    } catch (e) {
        next(e);
    }
}

export async function updateVacation(req: Request<{ id: string }, {}, {
    destination: string,
    description: string,
    startDate: Date,
    endDate: Date,
    price: number
}>, res: Response, next: NextFunction) {
    try {
        const vacation = await Vacation.findByPk(req.params.id)

        if (!vacation) return next(new AppError(StatusCodes.NOT_FOUND, 'the vacation you were trying to update does not exist'))

        const { price, endDate, startDate, description, destination } = req.body

        vacation.price = price
        vacation.endDate = endDate
        vacation.startDate = startDate
        vacation.description = description
        vacation.destination = destination

        await vacation.save() // <= this command generates the actual SQL UPDATE
        res.json(vacation)

    } catch (e) {
        next(e)
    }
}