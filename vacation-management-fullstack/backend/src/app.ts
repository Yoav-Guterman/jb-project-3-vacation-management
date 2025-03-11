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

const port = config.get<string>('app.port')
const name = config.get<string>('app.name')
const force = config.get<boolean>('sequelize.sync.force')

const app = express();

(async () => {
    await sequelize.sync({ force })

    await createAppBucketIfNotExist();

    // basic middleware
    app.use(cors()) // allow any client to use this server
    // app.use(cors({
    //     origin: 'https//localhost:5173'
    // })) // allow this specific clients

    app.use(json()) // a middleware to extract the post data and save it to the request object in case the content type of the request is application/json
    app.use(fileUpload())

    // Apply token extraction to ALL routes
    // This middleware will try to get the user from JWT if present
    // app.use(extractUserFromToken);

    // public routes (no auth required)
    // if need auth
    // app.use('/auth', authRouter);  // Login/signup don't need authentication


    // protected routes - apply requireAuth
    // here is the place to mount routers on the app

    app.use('/auth', authRouter)
    app.use('/vacations', vacationsRouter)
    app.use('/follows', followsRouter)



    // special notFound middleware
    app.use(notFound)

    // error middlewares
    app.use(errorLogger)
    app.use(errorResponder)


    app.listen(port, () => console.log(`${name} started on port ${port}...`))
})()