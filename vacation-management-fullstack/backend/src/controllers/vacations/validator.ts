import Joi from "joi";

export const newVacationValidator = Joi.object({
    destination: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(10).required(),
    startDate: Joi.date().min('now').required()
        .messages({
            'date.min': 'Cannot select dates in the past',
            'any.required': 'Start date is required'
        }),
    endDate: Joi.date().min(Joi.ref('startDate')).required()
        .messages({
            'date.min': 'End date must be after start date',
            'any.required': 'End date is required'
        }),
    price: Joi.number().min(0).max(10000).required()
})

export const UpdateVacationValidator = Joi.object({
    destination: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(10).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().min(Joi.ref('startDate')).required()
        .messages({
            'date.min': 'End date must be after start date',
        }),
    price: Joi.number().min(0).max(10000).required(),
    // vacationImage: Joi.any().optional()
});

export const newVacationFilesValidator = Joi.object({
    vacationImage: Joi.object({
        mimetype: Joi.string().valid('image/png', 'image/jpg', 'image/jpeg', 'image/webp')
    }).unknown(true).required()
})

export const updateVacationFilesValidator = Joi.object({
    vacationImage: Joi.object({
        mimetype: Joi.string().valid('image/png', 'image/jpg', 'image/jpeg', 'image/webp')
    }).unknown(true).optional()
})

export const vacationIdValidator = Joi.object({
    id: Joi.string().uuid().required()
})



