import mongoose from 'mongoose'
import envs from './envs'

export class MongoConnection {

    static async connect() {
        try {
            await mongoose.connect(envs.mongoUri)
            console.log('MongoDB connected')
        } catch (error) {
            console.log('MongoDB connection error')
        }
         
    }

}