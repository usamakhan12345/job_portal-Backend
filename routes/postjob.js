import express from "express"
import joi from 'joi'
import bcrypt from 'bcrypt'
import Job from "../Models/postJob.js"
import jwt from 'jsonwebtoken'
const   router = express.Router()


const jobSchema = joi.object({
    company : joi.string().required(),
       salary : joi.string().required(),
       position: joi.string().required(),
       details : joi.string().required(),
       address : joi.string().required(),
       owner : joi.string().optional(),
       jobtype : joi.string().required()


       
       
})


router.post("/post",async(req,res)=>{
    try{

        await jobSchema.validateAsync(req.body)
        const userjob = await new Job({...req.body})
        await userjob.save()
        res.status(200).send({"status" : "200 ok" ,"user" :'JOb POST SUCCESSFULY',  userjob })
    }catch(err){
        console.log(err)
        res.status(400).send({"status" : "400", err :  err.message})

    }

})

router.post("/myjobs", async(req,res)=>{
    try{
        const id  = req.body.userID
        console.log(req.body)
        console.log(id)
        const myjobs = await Job.find({owner : id})
            res.status(200).send({"staus": '200 ok' , myjobs})
    }catch(err){
        res.status(400).send({"message": err.message})
    }
})

router.get("/alljobs", async(req,res)=>{
    try{
        const allJobs = await Job.find({}).select("-password").populate('owner','name email')
            res.status(200).send({"staus": '200 ok' , allJobs})
    }catch(err){
        res.status(400).send({"message": err.message})
    }
})

router.get('/singlejob/:id',async(req,res)=>{
            try{
                
                const jobId = req.params.id
            console.log(jobId)
        const jobforUpdate =  await Job.findById(jobId)
          await res.status(200).send({"staus": '200 ok', "message":"single user given suceessfuly", jobforUpdate    })
    }catch(err){
        res.status(400).send({"message": err.message})
    }
})

router.delete("/deletejob/:id", async(req,res)=>{
    try{
            const jobId = req.params.id

        const deleteUser =  await Job.findByIdAndDelete(jobId)
          await res.status(200).send({"staus": '200 ok', "message":"deleted suceessfuly", deleteUser    })
    }catch(err){
        res.status(400).send({"message": err.message})
    }
})

router.put("/updatejob/:id", async(req,res)=>{
    try{
            const jobId = req.params.id

        const updatejob =  await Job.findByIdAndUpdate(jobId , req.body ,{
            new : true
        })
         await res.status(200).send({"staus": '200 ok', "message":"update job suceessfuly", updatejob    })
    }catch(err){
        res.status(400).send({"message": err.message})
    }
})


export default router ;