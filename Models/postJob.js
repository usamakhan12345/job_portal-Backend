import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema ({
    company : {
        type  : String,
        required : true 
    },
    salary : {
        type : String,
        required : true 
    },
    position : {
        type  : String,
        required : true 
    },
    details : {
        type : String,
        required : true 
    }, 
     address : {
        type : String,
        required : true 
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'Users'
    }
})
const jobs = mongoose.model("jobs",jobSchema)

export default jobs ;