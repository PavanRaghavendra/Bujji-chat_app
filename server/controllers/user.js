import {User} from '../models/users.js';
import express,{Router} from 'express';
import { cookieoption, SendToken } from '../utils/features.js';
import { compare, compareSync } from 'bcrypt';
const router=express.Router();
router.use(express.json());
const Newuser=async(req,res)=>
    {
        const {name,password,username}=req.body;
        try{
       const user= await User.create({name,password,username});
       //console.log("into sendToken");
        SendToken(res,user,201,"User Created Succesfully");
        }
        catch(err)
        {
            return res.status(404).json(
                {
                    msg:err
                }
            )
        }
    };
const Login=async (req,res)=>
    {
        const {username,password}=req.body;
        try
        {
            const user=await User.findOne({username}).select("+password");
            if(!user)
            {
                return res.status(400).json(
                    {
                        msg:"Enter valid username"
                    }
                )
            };
            const isMatch=await compare(password,user.password);
            if(isMatch)
            {
                return res.status(404).json(
                    {
                        msg:"Invalid password"
                    }
                )
            }
            SendToken(res,user,200,`welcome back ${user.name}`);
        }
        catch(err)
        {
            return res.status(404).json(
                {
                    msg:"error in code"
                }
            )
        }
    };
const getMyProfile=async (req,res)=>
{
    try{
    const user=await User.findById(req.user);
    return res.status(200).json(
        {
            msg:user
        }
    )
}catch(err)
{
    return res.status(401).json(
        {
            msg:err
        }
    )
}
    
};
const Logout=(req,res)=>
{
    
        return res.status(200).cookie("Bujji-token", "", {...cookieoption,maxAge:0}).json(
            {
                success:true,
                message:"Logout successfully"
            }
        )
    };
const Search_user=async (req,res)=>
{
    try{
        const {name}=req.query;
        
    }
    catch(err)
    {

    }
};
export {Login,Newuser,getMyProfile,Logout,Search_user}; 