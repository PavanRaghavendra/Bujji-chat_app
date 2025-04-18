import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
import {v4 as uuid} from "uuid"
import { getBase64, getSockets } from '../helpers/helper.js';
import dotenv from 'dotenv'
dotenv.config({
    path: "./.env"
});
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
const cookieoption={
    maxAge:15*24*60*60*1000,
    samesite:"none",
    httpsOnly:true,
    secure:true,
}
const ConnectDB=async (url)=>
{
    if(url === " ")
        console.log("The url string was empty");
    try
    {
      const res= await mongoose.connect("mongodb://localhost:27017/Bujji");
      //console.log(res);
    }
    catch(err)
    {
        console.log(err);
    }
}
const SendToken=(res,user,code,message)=>
    {
        try
        {
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
        return res.status(code).cookie("Bujji-token",token,cookieoption).send(
            {
                success:true,
                message,
            }
        );
    }
    catch(err)
    {
        return res.status(401).josn(
            {
                msg:err
            }
        )
    }
};
const emitEvent=(req,event,users,data)=>
{
    try
    {
        const io=req.app.get("io");
        const userSocket=getSockets(users);
        io.to(userSocket).emit(event,data)
    }
    catch(err)
    {
        console.log(err)
    }
};
const uploadCloudinary = async (files = []) => {
    const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
            console.log("Processing file:", file.name || "unknown"); // Log file being processed
            
            // Log the base64 result (first 50 chars)
            const base64Result = getBase64(file);
            console.log("Base64 result (preview):", base64Result.substring(0, 50) + "...");
            
            cloudinary.uploader.upload(
                base64Result,
                {
                    resource_type: "auto",
                    public_id: uuid()
                },
                (error, result) => {
                    if(error) {
                        console.error("Cloudinary upload error for file:", file.name, error);
                        return reject(error);
                    }
                    console.log("Successfully uploaded:", result.public_id);
                    resolve(result);
                }
            )
        })
    })
    try {
        const results = await Promise.all(uploadPromises);
        const formattedResults = results.map((result) => ({
            public_id: result.public_id,
            url: result.secure_url
        }));
        return formattedResults;
    }
    catch(err) {
        console.error("Error in uploadCloudinary:", err);
        throw new Error("Error uploading files to cloudinary");
    }
}
const deleteFilesfromCloudinary=async (public_ids)=>
{
    
}
export {ConnectDB,SendToken,cookieoption,emitEvent
    ,deleteFilesfromCloudinary,uploadCloudinary
};