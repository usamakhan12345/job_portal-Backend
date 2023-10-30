import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name : {
        type :String,
        required : true
    },
    email : {
        type :String,
        unique : true,
        required : true
    },
    phone : {
        type :String,
        required : true
    },
    password : {
        type :String,
        required : true
    }
    
})

const user = mongoose.model('Users',userSchema)

export default user ;