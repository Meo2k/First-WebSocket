import { Server } from "socket.io";
import http from "http";


const server = http.createServer();
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log(`New user connect: ${socket.id}`)

    socket.emit("welcome", `You have connected with socket - ${socket.id}`)

    socket.on("send-message", ({username, message})=>{
        socket.broadcast.emit("receive-message", {
            username, 
            message
        })
    })

    socket.on("disconnect", () => {
        console.log(`User disconnect: ${socket.id}`)
    })
})

server.listen(3000, () => {
    console.log("Server is running on port 3000")
})