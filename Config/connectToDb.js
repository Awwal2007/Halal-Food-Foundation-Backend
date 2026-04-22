const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const mongoDbUri = process.env.Mongo_Uri
const connectToDb = async ()=>{
    if (!mongoDbUri) {
        console.error("Error: Mongo_Uri is not defined in .env file");
        return;
    }
    try {
        const connected = await mongoose.connect(mongoDbUri)
        if(connected){
            console.log("mongodb connected");      
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToDb