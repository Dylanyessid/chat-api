import { Router } from "express";
import upload from "../../../../infrastructure/multer/multer";
import { validateDTO } from "../../../../infrastructure/middlewares/validateDTO";
import { CreateProfileDTO } from "../dto/CreateProfileDTO";
import { container } from "../../../../infrastructure/di/container";
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";
import { ProfileController } from "./Profile.controller";
import { UpdateProfileDataDTO } from "../dto/UpdateProfileDataDTO";


const profileRouter = Router()
const formatter = container.resolve<IApiResponseFormatter>('ApiResponseFormatter')
const profileController = container.resolve<ProfileController>("ProfileController")

profileRouter.post('/', 
    validateDTO(CreateProfileDTO, "body", formatter),
    profileController.createProfile.bind(profileController)
)

profileRouter.patch('/photo/:id', 
    upload.single('photo'),
    profileController.updatePhoto.bind(profileController)
)

profileRouter.patch('/:id', 
    validateDTO(UpdateProfileDataDTO, "body", formatter),
    profileController.updateProfileData.bind(profileController)
)
export {profileRouter}