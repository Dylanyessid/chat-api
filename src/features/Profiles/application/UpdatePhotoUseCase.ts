
import { uploadImageToCloudinary } from '../../../infrastructure/cloudinary/uploader';
import { IProfileRepository } from '../domain/IProfileRepository';


export class UpdatePhotoUseCase {
    constructor(private profileRepository: IProfileRepository) {}

    async execute(id:string, image:Express.Multer.File){
     
        try {
            const url = await uploadImageToCloudinary(image.buffer)
            if(!url) return null
            await this.profileRepository.updatePartialy(id, {photo:url})
            return {image:url}
        } catch (error) {
            return null
        }
    }
}