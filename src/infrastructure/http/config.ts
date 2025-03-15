import morgan from "morgan"
import { appRouter } from "./routes"
import express from "express"
import http from 'http';
import cors from "cors"

const app = express()
const server = http.createServer(app)

// Middleware for logging HTTP requests
app.use(morgan('dev'))

// Middleware to parse JSON
app.use(express.json())


app.use(cors())

// Use the main application router
app.use('/api/v1', appRouter)

export { app, server }