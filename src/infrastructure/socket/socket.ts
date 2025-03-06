import { Server } from "socket.io";
import  http  from 'http';
import { chatHandler } from "./handlers/chatHandler";


export const socketConfig = (server:http.Server) => {
    const io = new Server(server, {
        cors:{
            origin:"*",
          
        }
    })
    
    chatHandler(io)

    return io
}

