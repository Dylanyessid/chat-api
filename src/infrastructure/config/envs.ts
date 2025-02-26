import 'dotenv/config'
import { IEnvs } from '../../application/config/IEnvs'




const envs:IEnvs = {
    bcryptSaltRounds:+process.env.BCRYPT_SALT_ROUNDS!,
    port: +process.env.PORT! || 3000,
    mongoUri: process.env.MONGO_URI || '',
    jwtSecret: process.env.JWT_SECRET || '',

}

export default envs