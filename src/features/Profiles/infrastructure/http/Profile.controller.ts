import { Request, Response } from "express";
import CreateProfileUseCase from "../../application/CreateProfileUseCase";
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";
import { UpdatePhotoUseCase } from "../../application/UpdatePhotoUseCase";

export class ProfileController {
    constructor(private createProfileUseCase:CreateProfileUseCase, private updatePhotoUseCase:UpdatePhotoUseCase, private apiResponseFormatter:IApiResponseFormatter){
        
    }

    async createProfile(req:Request, res:Response){
      
        const result = await this.createProfileUseCase.execute(req.body)
        if(!result) {
            const response = this.apiResponseFormatter.error('Invalid data for create a profile', 400)
            res.status(400).json(response)
            return  
        }
        const response = this.apiResponseFormatter.success(result, 'Profile created successfully', 201)
        res.status(201).json(response)
        return 
    }

    async updatePhoto(req:Request, res:Response){
        const file = req.file
       const result =  await this.updatePhotoUseCase.execute(req.params.id, file)
       if(!result) {
        const response = this.apiResponseFormatter.error('Invalid image', 400)
        res.status(400).json(response)
        return  
    }
    const response = this.apiResponseFormatter.success(result,'Photo updated successfully', 201)
    res.status(201).json(response)
    return 
    }

}