import { Router } from "express";
import enforceAuth from "../middlewares/enforce-auth";
import { followVacation, unfollowVacation } from "../controllers/follows/controller";
import paramsValidation from "../middlewares/params-validation";
import { followsVacationIdValidator } from "../controllers/follows/validation";

const followsRouter = Router()

followsRouter.use(enforceAuth)

followsRouter.post('/follow/:vacationId', paramsValidation(followsVacationIdValidator), followVacation)
followsRouter.delete('/unfollow/:vacationId', paramsValidation(followsVacationIdValidator), unfollowVacation)
// might need to add all vacation follows into csv file

export default followsRouter