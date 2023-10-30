import express from 'express'
import user from "./user.js"
import jobs from "./postjob.js"



const router = express.Router()



router.use('/user',user)
router.use('/job',jobs)


export default router