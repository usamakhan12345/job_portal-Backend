import express from "express"
const router = express.Router()
import fs from "fs-extra"

import multer from "multer"
import cloudinary from 'cloudinary';
          
          
cloudinary.config({ 
  cloud_name: 'dnzgzlxxy', 
  api_key: '731957682875596', 
  api_secret: 'DqETxXSmCfkIwd23LBmfAaR-hhw' 
});

// const upload = multer({ dest: 'Images/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Images/')
    },
    filename: function (req, file, cb) {
        // console.log(file)
      cb(null, file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })



router.post('/',upload.single('file'),(req,res)=>{
        try{

            fs.readdirSync("Images/").forEach(file => {
                // console.log(file)
                cloudinary.v2.uploader.upload(`Images/${file}`, {}, (error, result)=>{
                    console.log("linew no 35",result, error);
                    if(error){
                        return res.status(404).send({'message': "invalid data"})
                    }
                    fs.remove(`Images/${file}`, err => {
                        if (err) return console.error(err)
                        console.log('success!')
                    res.status(200).send({"message" : "file uploaded","url" :result.url})
                })
            });
            
        });
    }catch(err){
        res.status(200).send({"message" : "file not uploaded" , err })
    }
})

export default router