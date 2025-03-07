import { Server, Socket } from "socket.io";
import CreateMessageUseCase from "../../../features/Messages/application/CreateMessageUseCase";
import { container } from "../../di/container";


const createMessageUseCase = container.resolve<CreateMessageUseCase>('CreateMessageUseCase')

export const chatHandler = (io:Server) =>{
    io.on("connection", (socket:Socket)=>{
        console.log("User connected " + socket.id)
    
        socket.on("sendChatMessage", async (data) => {
            const { user, message} = data
            //await createMessageUseCase.execute()
            //io.emit("receiveMessage", data);
        });
    })
}