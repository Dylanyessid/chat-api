import mongoose from 'mongoose'
import envs from './envs'
import { IMongoConnection } from '../../application/config/IMongoConnection'

// Class to handle MongoDB connection
export class MongoConnection implements IMongoConnection {

    // Connect to MongoDB
    async connect() {
        try {
            await mongoose.connect(envs.mongoUri)
            console.log('MongoDB connected')
        } catch (error) {
            console.log('MongoDB connection error')
        }
    }
}