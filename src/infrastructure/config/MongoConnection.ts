import mongoose from 'mongoose'
import envs from './envs'
import { IMongoConnection } from '../../application/config/IMongoConnection'

export class MongoConnection implements IMongoConnection {

    async connect() {
        try {
            await mongoose.connect(envs.mongoUri)
            console.log('MongoDB connected')
        } catch (error) {
            console.log('MongoDB connection error')
        }
         
    }

}