import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstName : {
        type :String,
        required : true
    },
    lastName : {
        type :String,
        required : true
    },
    course : {
        type :String,
        required : true
    },
    password : {
        type :String,
        required : true
    },
    email : {
        type :String,
        required : true,
        unique : true,
        
    },
    phoneNumber : {
        type :String,
        required : true
    },
    Image : {
        type : String,
        required : true

    }
    
    
})

const student = mongoose.model('Students',userSchema)

export default student ;