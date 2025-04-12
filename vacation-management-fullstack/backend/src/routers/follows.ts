import { Router } from "express";
import enforceAuth from "../middlewares/enforce-auth";
import { followVacation, unfollowVacation } from "../controllers/follows/controller";
import paramsValidation from "../middlewares/params-validation";
import { followsVacationIdValidator } from "../controllers/follows/validation";
import { regularUserValidator } from "../middlewares/role-validation";

const followsRouter = Router()

followsRouter.use(enforceAuth)

followsRouter.post('/follow/:vacationId', regularUserValidator, paramsValidation(followsVacationIdValidator), followVacation)
followsRouter.delete('/unfollow/:vacationId', regularUserValidator, paramsValidation(followsVacationIdValidator), unfollowVacation)
// might need to add all vacation follows into csv file

export default followsRouter