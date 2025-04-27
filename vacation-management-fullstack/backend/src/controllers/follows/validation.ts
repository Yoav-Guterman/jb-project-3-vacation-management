import Joi from "joi";

export const followsVacationIdValidator = Joi.object({
    vacationId: Joi.string().uuid().required()
})
