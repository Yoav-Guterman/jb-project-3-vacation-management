import { Router } from "express";
import { createVacation, getAllVacations, removeVacation, updateVacation } from "../controllers/vacations/controller";
import paramsValidation from "../middlewares/params-validation";
import { vacationIdValidator, VacationValidator } from "../controllers/vacations/validator";
import validation from "../middlewares/validation";
import enforceAuth from "../middlewares/enforce-auth";

const vacationsRouter = Router()

vacationsRouter.use(enforceAuth)

vacationsRouter.get('/', getAllVacations)
vacationsRouter.post('/', validation(VacationValidator), createVacation)
vacationsRouter.delete('/:id', paramsValidation(vacationIdValidator), removeVacation)
vacationsRouter.patch('/:id', paramsValidation(vacationIdValidator), validation(VacationValidator), updateVacation)

export default vacationsRouter