import { NextFunction, Request, Response } from "express";
import Vacation from "../../models/vacation";
import User from "../../models/user";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";
import socket from "../../io/io";
import SocketMessages from "socket-enums-yoavguterman";

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

export async function getVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {

        const id = req.params.id
        const vacation = await Vacation.findByPk(id, {
            include: [User], // Just include User model
        });

        if (!vacation) return next(new AppError(StatusCodes.NOT_FOUND, 'the vacation you were trying to update does not exist'))

        res.json(vacation);
    } catch (e) {
        next(e);
    }
}

export async function createVacation(req: Request<{}, {}, { destination: string, description: string, startDate: Date, endDate: Date, price: number, imageUrl?: string }>, res: Response, next: NextFunction) {
    try {

        let createParams = { ...req.body }

        if (req.imageUrl) {
            const { imageUrl } = req
            createParams = { ...createParams, imageUrl }
        }

        const newVacation = await Vacation.create(createParams)
        res.json(newVacation);

        socket.emit(SocketMessages.ADD_VACATION, {
            from: req.headers['x-client-id'], // req.header(), req.get()
            data: newVacation
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
    price: number,
    imageUrl?: string
}>, res: Response, next: NextFunction) {
    try {
        let createParams = { ...req.body }

        if (req.imageUrl) {
            const { imageUrl } = req
            createParams = { ...createParams, imageUrl }
        }

        const updatedVacation = await Vacation.findByPk(req.params.id)

        if (!updatedVacation) return next(new AppError(StatusCodes.NOT_FOUND, 'the vacation you were trying to update does not exist'))

        const { price, endDate, startDate, description, destination, imageUrl } = createParams

        updatedVacation.price = price
        updatedVacation.endDate = endDate
        updatedVacation.startDate = startDate
        updatedVacation.description = description
        updatedVacation.destination = destination

        if (imageUrl) {
            updatedVacation.imageUrl = imageUrl
        }

        await updatedVacation.save() // <= this command generates the actual SQL UPDATE
        await updatedVacation.reload({ include: [User] })
        res.json(updatedVacation)

        socket.emit(SocketMessages.UPDATE_VACATION, {
            from: req.headers['x-client-id'], // req.header(), req.get()
            data: updatedVacation
        })

    } catch (e) {
        next(e)
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

        socket.emit(SocketMessages.REMOVE_VACATION, {
            from: req.headers['x-client-id'], // req.header(), req.get()
            data: { id: id }
        })
    } catch (e) {
        next(e);
    }
}

// In your vacations controller.ts
export async function exportFollowersCSV(req: Request, res: Response, next: NextFunction) {
    try {
        // Fetch all vacations with their followers
        const vacations = await Vacation.findAll({
            include: [{
                model: User,
                as: 'followers',
                attributes: ['id'] // We only need the IDs for counting
            }],
            order: [['destination', 'ASC']] // Sort by destination
        });

        // Set headers for CSV download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=vacation_followers.csv');

        // Write CSV header
        res.write('Destination,Followers\n');

        // Write data rows
        vacations.forEach(vacation => {
            // Properly escape any commas in the destination name
            const safeDestination = vacation.destination.includes(',')
                ? `"${vacation.destination}"`
                : vacation.destination;

            res.write(`${safeDestination},${vacation.followers.length}\n`);
        });

        // End the response
        res.end();

    } catch (e) {
        next(e);
    }
}