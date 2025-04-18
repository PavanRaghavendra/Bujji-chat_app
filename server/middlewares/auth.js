import jwt from 'jsonwebtoken'
import {BUJJI_TOKEN} from "./../constants/config.js"
import { User } from '../models/users.js';
const auth=async (req,res,next)=>
{
    try
    {
        const token=req.cookies[BUJJI_TOKEN];
        if(!token)
            return res.status(401).json(
        {
            msg:"please login to get access"
        });
        const decodedData=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decodedData._id;
        //console.log(req.user);
        next();
    }
    catch
    {

    }
};
const SocketAuth=async (err,socket,next)=>
{
    try {
        if(err)
        {
            const error = new Error("Please login to access");
            error.status = 401;
            return next(error)
        }
        const token=socket.request.cookies[BUJJI_TOKEN];
        if(!token)
        {
            const error = new Error("Please login to access");
            error.status = 401;
            return next(error) 
        }
        const decodeId=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decodeId);
        if(!user)
        {
            const error = new Error("Please enter correct deatils");
            error.status = 401;
         return next(error)
        }
        socket.user=user;
        return next();

    } catch (error) {
        console.log(error)
        const err = new Error(error);
        err.status = 401;
        return next(err)
    }
}
export {auth,SocketAuth};