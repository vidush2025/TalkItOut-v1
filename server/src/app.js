import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//router imports

import userRoutes from "./routes/user.routes.js";
import channelRoutes from "./routes/channel.routes.js";
import messageRoutes from "./routes/message.routes.js";
import rantRoutes from "./routes/rant.routes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/channels", channelRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/rant", rantRoutes);


export { app }