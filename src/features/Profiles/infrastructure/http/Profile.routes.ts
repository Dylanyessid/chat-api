import { Router } from "express";
import upload from "../../../../infrastructure/multer/multer";
import { validateDTO } from "../../../../infrastructure/middlewares/validateDTO";
import { CreateProfileDTO } from "../dto/CreateProfileDTO";
import { container } from "../../../../infrastructure/di/container";
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";
import { ProfileController } from "./Profile.controller";


const profileRouter = Router()
const formatter = container.resolve<IApiResponseFormatter>('ApiResponseFormatter')
const profileController = container.resolve<ProfileController>("ProfileController")

profileRouter.post('/', 
    validateDTO(CreateProfileDTO, "body", formatter),
    profileController.createProfile.bind(profileController)
)

profileRouter.patch('/photo/:id', 
    upload.single('photo'),
    //validateDTO(CreateProfileDTO, "body", formatter),
    profileController.updatePhoto.bind(profileController)
)

export {profileRouter}