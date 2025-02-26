import { Router } from "express";
import { UserRouter } from "../../features/Users/infrastructure/User.routes";


const appRouter = Router()

appRouter.use('/users', UserRouter)

export { appRouter}

