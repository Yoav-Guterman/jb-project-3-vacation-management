import { Router } from "express";
import { createVacation, getAllVacations, removeVacation, updateVacation } from "../controllers/vacations/controller";
import paramsValidation from "../middlewares/params-validation";
import { newVacationFilesValidator, newVacationValidator, updateVacationFilesValidator, UpdateVacationValidator, vacationIdValidator, } from "../controllers/vacations/validator";
import validation from "../middlewares/validation";
import enforceAuth from "../middlewares/enforce-auth";
import filesValidation from "../middlewares/files-validation";
import fileUploader from "../middlewares/file-uploader";

const vacationsRouter = Router()

vacationsRouter.use(enforceAuth)

vacationsRouter.get('/', getAllVacations)
vacationsRouter.post('/', validation(newVacationValidator), filesValidation(newVacationFilesValidator), fileUploader, createVacation)
vacationsRouter.delete('/:id', paramsValidation(vacationIdValidator), removeVacation)
vacationsRouter.patch('/:id', paramsValidation(vacationIdValidator), validation(UpdateVacationValidator), filesValidation(updateVacationFilesValidator), fileUploader, updateVacation)
// maybe add the file validator to patch

export default vacationsRouter 
