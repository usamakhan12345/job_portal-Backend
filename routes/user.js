import express from "express"
import joi from 'joi'
import User from "../Models/user.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
const router = express.Router()


const userSchema = joi.object({
       name : joi.string().required(),
       email : joi.string().email().required(),
       phone : joi.string().required(),
       password : joi.string().min(8).required(),
       
       
})


router.post("/signup",async(req,res)=>{
    try{
            // console.log(req.body)
        // const {email,name,password} = req.body
        const hashpassword = await bcrypt.hash(req.body.password, 10);

        console.log("password------>",hashpassword)
        await userSchema.validateAsync(req.body)
        const user = new User ({...req.body,hashpassword})
        await user.save()
        const token = await jwt.sign({_id : user.id , email : user.email},'USAMA')
        res.status(200).send({"status" : "200 ok" ,"usermessage" :'user save successfuly', user ,token })
    }catch(err){
        console.log(err)
        res.status(400).send({"status" : "400", err :  err.message})

    }

})

router.post("/login",async(req,res)=>{
    try{
            // console.log(req.body)
        const {email,password} = req.body
        const user = await User.findOne({email})

        const Userpassowrd = await bcrypt.compare(password, user.password)
     
        if(!user){
                res.status(400).send({"message": "user not registered!"})
        }
        if(Userpassowrd){
            const token = await jwt.sign({_id : user.id , email : user.email},'USAMA')
            res.status(200).send({"status" : "200 ok" ,"user" :'user login successfuly' ,token })
        }

        if(!Userpassowrd){
            res.status(400).send({"status" : "400" ,"user" :'Wrong Password' })

        }
        
     
       
    }catch(err){
        console.log(err)
        res.status(400).send({"status" : "400", err :  err.message})

    }

})

export default router ;