import { v2 as cloudinary } from "cloudinary"
import envs from "../config/envs"

// Configure Cloudinary 
cloudinary.config({
    cloud_name: envs.cloudName,
    api_key: envs.cloudApiKey,
    api_secret: envs.cloudApiSecret,
})

// Export configured Cloudinary instance
export default cloudinary