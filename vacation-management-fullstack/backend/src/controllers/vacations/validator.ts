import Joi from "joi";

export const VacationValidator = Joi.object({
    destination: Joi.string().min(6).max(50).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().min(0).max(10000000).required(),
    description: Joi.string().min(6).required()
})

export const newVacationFilesValidator = Joi.object({
    vacationImage: Joi.object({
        mimetype: Joi.string().valid('image/png', 'image/jpg', 'image/jpeg')
    }).unknown(true).optional()
})

export const vacationIdValidator = Joi.object({
    id: Joi.string().uuid().required()
})



