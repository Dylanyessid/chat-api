import { Server, Socket } from "socket.io";
import CreateMessageUseCase from "../../../features/Messages/application/CreateMessageUseCase";
import { container } from "../../di/container";

// Resolve the CreateMessageUseCase from the dependency injection container
const createMessageUseCase = container.resolve<CreateMessageUseCase>('CreateMessageUseCase')

// Define the chatHandler function to handle socket connections
export const chatHandler = (io:Server) =>{
    io.on("connection", (socket:Socket)=>{
        console.log("User connected " + socket.id)
    
        // Listen for sendChatMessage event and handle it
        socket.on("sendChatMessage", async (data) => {
            const { chat, content, type, sender} = data
            console.log(data)
            const message = await createMessageUseCase.execute({chat, type, sender, content})
            io.emit("receiveMessage", message);
        });
    })
}