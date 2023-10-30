import express from "express"
import router from "./routes/index.js"
import connectDb from "./db/index.js"
import cors from 'cors'

const app = express()

const PORT =8000
connectDb()


app.use(express.json())
app.use(cors())




app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use('/api',router)

app.listen(PORT,()=>{
    console.log("server is running on "+ PORT)
}) 


