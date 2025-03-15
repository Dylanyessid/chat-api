import { Server } from "socket.io";
import  http  from 'http';
import { chatHandler } from "./handlers/chatHandler";

// Define socket.io server config
export const socketConfig = (server:http.Server) => {
    const io = new Server(server, {
        cors:{
            origin:"*",
          
        }
    })
    
    //Using the socket.io handlers
    chatHandler(io)

    return io
}

