import express from "express"
import router from "./routes/index.js"
import connectDb from "./db/index.js"
import bodyParser from "body-parser"
import cors from 'cors'

const app = express()

const PORT =3000
connectDb()

app.use(bodyParser.json());
app.use(express.json())
app.use(cors())




app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use('/api',router)

app.listen(PORT,()=>{
    console.log("server is running on "+ PORT)
}) 


