import mongoose from "mongoose";
import moment from "moment";
const AttendanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },

    checkInTime: [
        {
            type: String, // Change the type to String
            default: moment(Date.now()).format('h:mm:ss a, MMMM Do YYYY')
        }
    ],
    checkOutTime: [{
        type: String,
        default: moment(Date.now()).format(' h:mm:ss a , MMMM Do YYYY')

    }
    ],
    location: {
        type: String,
        required: true

    },

    status: {
        type: String,
        // enum: ['present', 'absent'],
        // default: 'absent',
    },
    checktype: {
        type: String,
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },


}

);

const StudentAttendance = mongoose.model('Attendance', AttendanceSchema);

export default StudentAttendance