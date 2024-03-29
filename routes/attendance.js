import express from "express";
import joi from "joi";
import User from "../Models/user.js";
import Attendance from "../Models/attendance.js"
import jwt from "jsonwebtoken";
import moment from 'moment'



const router = express.Router();

const attendanceSchema = joi.object({
    student: joi.string().required(),
    checkOutTime: joi.string(),
    checkInTime: joi.string(),
    status: joi.string(),
    location: joi.string(),
    checktype : joi.string(),

});

router.post("/checkedIn", async (req, res) => {
    try {
        const stdId = req.body.student
        const {checktype} = req.body
        await attendanceSchema.validateAsync(req.body)
        // await stdAttendance.save()

        const student = await Attendance.findOne({ student: stdId })


        if (student && checktype=== 'checkin' ) {
            const stdCheckedIN = moment(Date.now()).format(' h:mm:ss a , MMM Do YY')
            console.log(student)
            console.log(stdCheckedIN)

            student.checkInTime.push(stdCheckedIN)
            await student.save()
           return  res.status(200).send({ "message": "user check in successfuly" })


        }else if (student && checktype=== 'checkout' ) {
            const stdCheckedIN = moment(Date.now()).format(' h:mm:ss a , MMM Do YY')
            console.log(student)
            console.log(stdCheckedIN)

            student.checkOutTime.push(stdCheckedIN)
            await student.save()
           return  res.status(200).send({ "message": "user check out  successfuly"})


        }else {
            const stdAttendance = new Attendance({ ...req.body })
            const stdCheckedIN = moment(Date.now()).format(' h:mm:ss a , MMM Do YY')
            stdAttendance.checkInTime.push(stdCheckedIN)

            await stdAttendance.save()
           return res.status(200).send({ "message": "attendance done" })

        }

        // res.status(200).send({ "message": "attendance done" })
    } catch (err) {
        console.log(err.message)
       return res.status(404).send({ "message": err.message })
    }
})

router.put("/checkedIn", async (req, res) => {
    try {
        const stdId = req.body.student
        await attendanceSchema.validateAsync(req.body)
        const filterStudent = { student: stdId }
        const checkoutStd = await Attendance.findOneAndUpdate(filterStudent, req.body, {
            new: true
        })
        if (!checkoutStd) {
            res.status(404).send({ "message": "student not found", checkoutStd })

        }
        res.status(200).send({ "message": "student Checked Out Done", checkoutStd })
    } catch (err) {
        res.status(404).send({ "message": err.message })
    }
})

router.get("/getStudentAttendance/:id", async(req, res)=>{
            try{

                const stdId = req.params.id
                const stdAttendance = await Attendance.findOne({student : stdId}).populate("student")
                if(stdAttendance){
                    res.status(200).send({"status" : "200" , "message" : "user attendance fetch successfuly" , stdAttendance})
                }else{
                    res.status(404).send({"status" : "404" , "message" : "not record any attendance"})
                }
            }catch(error){
                console.log(error)
            }
})

export default router;
