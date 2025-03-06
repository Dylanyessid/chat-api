import { Server, Socket } from "socket.io";

export const chatHandler = (io:Server) =>{
    io.on("connection", (socket:Socket)=>{
        console.log("User connected " + socket.id)
    
        socket.on("sendChatMessage", (data) => {
            console.log(data)
            //io.emit("receiveMessage", data);
        });
    })
}