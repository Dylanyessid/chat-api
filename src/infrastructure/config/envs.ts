import 'dotenv/config'

const envs = {

    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI || '',
    jwtSecret: process.env.JWT_SECRET || '',

}

export default envs