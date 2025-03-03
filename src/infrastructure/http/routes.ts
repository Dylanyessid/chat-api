import { Router } from "express";
import { UserRouter } from "../../features/Users/infrastructure/http/User.routes";
import { profileRouter } from "../../features/Profiles/infrastructure/http/Profile.routes";
import { chatRouter } from "../../features/Chat/infrastructure/http/Chat.routes";
import { messageRouter } from "../../features/Messages/infrastructure/http/Message.routes";



const appRouter = Router()

appRouter.use('/users', UserRouter)
appRouter.use('/profiles', profileRouter)
appRouter.use('/chats', chatRouter)
appRouter.use('/messages', messageRouter)
export { appRouter}

