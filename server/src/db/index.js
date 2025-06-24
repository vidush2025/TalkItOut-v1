import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"


const connectDB = async()=>{
    try{
        const connectionInstance = await 
            mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        // console.log (`\n MONGOD DB connected!! DB Host: ${connectionInstance.connection.host}`)

        console.log("MONGO DB CONNECTED!!!")

    }catch(error) {
        console.log("MONGO DB connection failed: ", error)
        process.exit(1)
    }
}

export default connectDB