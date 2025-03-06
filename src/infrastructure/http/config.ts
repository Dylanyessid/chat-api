import morgan from "morgan"
import { appRouter } from "./routes"
import express from "express"
import  http  from 'http';
import cors from "cors"

const app = express()
const server = http.createServer(app)


app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/api/v1', appRouter)

export {app, server}