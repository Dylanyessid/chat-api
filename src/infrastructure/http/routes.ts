import { Router } from "express";
import { UserRouter } from "../../features/Users/infrastructure/http/User.routes";
import { profileRouter } from "../../features/Profiles/infrastructure/http/Profile.routes";



const appRouter = Router()

appRouter.use('/users', UserRouter)
appRouter.use('/profiles', profileRouter)

export { appRouter}

