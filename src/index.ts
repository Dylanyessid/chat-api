import express from 'express'
import cors from 'cors'
import "./infrastructure/di/register"
import envs from './infrastructure/config/envs'
import { MongoConnection } from './infrastructure/config/MongoConnection'
import morgan from 'morgan'
import { appRouter } from './infrastructure/http/routes'


const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())


app.use('/api/v1', appRouter)

app.listen(envs.port, async() => {
    const mongoConnection = new MongoConnection()
    await mongoConnection.connect()
    console.log(`Server is running on port ${envs.port}`)
})