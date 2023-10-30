import mongoose from "mongoose";

const connectDb = () =>{
    try{
        mongoose.connect('mongodb+srv://usamakhan:usama123@cluster0.zau8mk3.mongodb.net/JobPortal?retryWrites=true&w=majority',{
            useNewUrlParser : true
        })
        console.log("Database connected successfuly !")
    }catch(err){
        console.log(err)

    }
}

export default connectDb