import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
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
    console.log("Emit event");
};
const deleteFilesfromCloudinary=async (public_ids)=>
{
    
}
export {ConnectDB,SendToken,cookieoption,emitEvent
    ,deleteFilesfromCloudinary
};