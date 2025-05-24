import express from "express";
import multer from "multer";
import FormData from "form-data";
import axios from "axios"
const storage=multer.memoryStorage();
const upload=multer({storage:storage})
const detection=express.Router()


detection.post("/detectDisease",upload.single("image"),async(req,res)=>{
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      //if multer storage then req.file.buffer willc ontain all teh required files; if multer upload then request.file.path will contain patyh to image
      console.log("Received file:", req.file);
      try{
        const formdata=new FormData();
        formdata.append("image",req.file.buffer,{filename:req.file.originalname,contentType:req.file.mimetype})
        const response=await axios.post('http://127.0.0.1:5002/detectCropDiseaseHF',formdata,{
            headers:{
                ...formdata.getHeaders()
            }
          })
          
          var arr=[]
          response.data.prediction.forEach(element => {
            if(element.score>0.2){
                arr.push([element.label,element.score]);
            }

          });
          res.send(arr);
          console.log(arr)
      }
      catch(error){
        console.log(error);
      }
      
      
})
export default detection;