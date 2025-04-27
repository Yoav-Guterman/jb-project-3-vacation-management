import express, { json } from "express"
import config from 'config'
import sequelize from "./db/sequelize"
import errorLogger from "./middlewares/error/error-logger"
import errorResponder from "./middlewares/error/error-responder"
import notFound from "./middlewares/not-found"
import cors from 'cors'
import vacationsRouter from "./routers/vacations"
import authRouter from "./routers/auth"
import followsRouter from "./routers/follows"
import fileUpload from "express-fileupload"
import { createAppBucketIfNotExist } from "./aws/aws"


const force = config.get<boolean>('sequelize.sync.force')

const app = express();

export async function start() {
    await sequelize.sync({ force })

    await createAppBucketIfNotExist();

    // basic middleware
    app.use(cors()) // allow any client to use this server

    app.use(json()) // a middleware to extract the post data and save it to the request object in case the content type of the request is application/json
    app.use(fileUpload())

    app.use('/auth', authRouter)
    app.use('/vacations', vacationsRouter)
    app.use('/follows', followsRouter)

    // special notFound middleware
    app.use(notFound)

    // error middlewares
    app.use(errorLogger)
    app.use(errorResponder)

}

export default app