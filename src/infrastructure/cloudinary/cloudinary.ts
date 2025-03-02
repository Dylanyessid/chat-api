import {v2 as cloudinary}  from "cloudinary"
import envs from "../config/envs"


cloudinary.config(
    {
        cloud_name:envs.cloudName,
        api_key:envs.cloudApiKey,
        api_secret:envs.cloudApiSecret,
    }
)

export default cloudinary