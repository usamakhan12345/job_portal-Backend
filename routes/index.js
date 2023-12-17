import express from 'express'
import Students from "./user.js"
import jobs from "./postjob.js"
import upload from './upload.js'


const router = express.Router()



router.use('/students',Students)
router.use('/job',jobs)
router.use('/upload',upload)
// router.use('/profile')


export default router