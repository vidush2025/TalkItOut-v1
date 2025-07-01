import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {Server} from "socket.io";
import {createServer} from "http";
import { app } from "./app.js";

dotenv.config({
    path: "./env"
})

const server = createServer(app); 

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true
  }
});

app.set("io", io);


connectDB()
.then(() => {
    const PORT = process.env.PORT || 8000;

    server.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error("MongoDB could not be connected.\nError: ", err);
    process.exit(1);
});

io.on("connection", (socket) => {
    console.log("New socket connected: ", socket.id);

    socket.on("join-room", (channelId) => {
        socket.join(channelId);
        console.log(`Socket ${socket.id} joined room ${channelId}`);
    });

    socket.on("disconnect", () =>{
        console.log("Socket disconnected: ", socket.id);
    });
});

