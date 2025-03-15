import 'dotenv/config'
import { IEnvs } from '../../application/config/IEnvs'

// Load environment variables
const envs: IEnvs = {
    bcryptSaltRounds: +process.env.BCRYPT_SALT_ROUNDS!,
    port: +process.env.PORT! || 3000,
    mongoUri: process.env.MONGO_URI || '',
    jwtSecret: process.env.JWT_SECRET || '',
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudApiKey: process.env.CLOUDINARY_API_KEY,
    cloudApiSecret: process.env.CLOUDINARY_API_SECRET
}


export default envs