import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        
        console.log(`\nMONGO DB CONNECTED SUCCESSFULLY!!\nDB HOST: ${connectionInstance.connection.host}\n`);
        
    } catch (error) {
        console.log("MONGO DB CONNECTION FAILED: ", error);
        process.exit(1);
    }
}

export default connectDB