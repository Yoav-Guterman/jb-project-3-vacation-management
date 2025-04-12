import { Router } from "express";
import { createVacation, exportFollowersCSV, getAllVacations, removeVacation, updateVacation } from "../controllers/vacations/controller";
import paramsValidation from "../middlewares/params-validation";
import { newVacationFilesValidator, newVacationValidator, updateVacationFilesValidator, UpdateVacationValidator, vacationIdValidator, } from "../controllers/vacations/validator";
import validation from "../middlewares/validation";
import enforceAuth from "../middlewares/enforce-auth";
import filesValidation from "../middlewares/files-validation";
import fileUploader from "../middlewares/file-uploader";
import { adminValidator } from "../middlewares/role-validation";

const vacationsRouter = Router()

vacationsRouter.use(enforceAuth)

vacationsRouter.get('/', getAllVacations)
vacationsRouter.post('/', adminValidator, validation(newVacationValidator), filesValidation(newVacationFilesValidator), fileUploader, createVacation)
vacationsRouter.delete('/:id', adminValidator, paramsValidation(vacationIdValidator), removeVacation)
vacationsRouter.patch('/:id', adminValidator, paramsValidation(vacationIdValidator), validation(UpdateVacationValidator), filesValidation(updateVacationFilesValidator), fileUploader, updateVacation)
vacationsRouter.get('/reports/followers', adminValidator, exportFollowersCSV);

export default vacationsRouter 
