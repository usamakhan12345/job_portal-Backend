import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

const connectDb = () =>{
    try{
        mongoose.connect(process.env.DATABASEURL,{
            useNewUrlParser : true
        })
        console.log("Database connected successfuly !")
    }catch(err){
        console.log(err)

    }
}

export default connectDb