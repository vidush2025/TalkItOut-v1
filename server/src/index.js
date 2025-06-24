import mongoose from "mongoose"
import { DB_NAME } from "./constants.js"
import dotenv from "dotenv"

import connectDB from "./db/index.js"
import dotenv from "dotenv"
import { app } from "./app.js"

dotenv.config({
    path: "./env"
})

connectDB()
.then(() => {
    const currPort = process.env.PORT || 8000
    app.listen(currPort, () => {
        console.log("Server is running at PORT:", currPort);
        
    })
})
.catch((err) => {
    console.log("MONGO DB connection failed!!! Error: ", err);
    
})