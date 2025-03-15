
import express from 'express'
import cors from 'cors'
import "./infrastructure/di/register"
import envs from './infrastructure/config/envs'
import { MongoConnection } from './infrastructure/config/MongoConnection'
import morgan from 'morgan'
import { appRouter } from './infrastructure/http/routes'
import { Server } from "socket.io"
import http from "http"
import { socketConfig } from './infrastructure/socket/socket'
import { server } from './infrastructure/http/config'

// Configure socket.io
socketConfig(server)

// Start the server and connect to MongoDB
server.listen(envs.port, async() => {
    const mongoConnection = new MongoConnection()
    await mongoConnection.connect()
    console.log(`Server is running on port ${envs.port}`)
})