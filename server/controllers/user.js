import {User} from '../models/users.js'
import express,{Router} from 'express';
import { cookieoption, emitEvent, SendToken } from '../utils/features.js';
import { compare,hash } from 'bcrypt';
import { Chat } from '../models/chat.js';
import { Request } from '../models/request.js';
import { New_request } from '../constants/events.js';
import { getOtherMemeber } from '../helpers/helper.js';
const router=express.Router();
router.use(express.json());
const Newuser=async(req,res)=>
    {
        //console.log("into new user controller");
        const {name,password,username}=req.body;
        //console.log(req.body);
        try{
            //i want to hash the password
            const hashedPassword=await hash(password,10)
           // console.log(password);
       const user= await User.create({name,password:hashedPassword,username});
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
        //console.log("accessed login controller");
       const {username,password}=req.body;
        //console.log(username,password);
        try
        {
            const user=await User.findOne({username:username}).select("+password");
            if(!user)
            {
                return res.status(400).json(
                    {
                        msg:"Enter valid username"
                    }
                )
            };
           // console.log(user);
            const isMatch=await compare(password,user.password);
            if(!isMatch)
            {
                return res.status(404).json(
                    {
                        msg:"Invalid password"
                    }
                )
            }
            SendToken(res,user,200,user);
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
        const {name=""}=req.query;
        const members=await User.find({
            name:{$regex:name,$options:"i"}
        });
        const expectMe=members.filter((member)=>member._id!=req.user)
        const Tobefriends=await Promise.all(
            expectMe.map(async (person)=>
        {
            const chat =await Chat.find({ Members: { $all: [req.user, person._id] },groupChat:false});
            if(chat.length===0)
                return person;
            else return null;
        }))
        const onlyfriends=Tobefriends.filter(Boolean);
         const user = onlyfriends.map((friends) => ({
            _id: friends._id,
            name: friends.name
        }));                
        return res.status(201).json(
            {
                message:"success",
                user
            }
        )
    }
    catch(err)
    {
        console.log(err);
        return res.status(405).json(
            {
                message:err
            }
        )
    }
};
const sendRequest=async (req,res)=>
{
    try{
    const {userId}=req.body;
    const request=await Request.findOne({
        $or:[
            {sender:userId,recevier:req.user},
            {
                sender:req.user,recevier:userId
            }
        ],
    });
    if(request)
        return res.status(400).json(
    {
        message:"Request already has been send"
    });
    await Request.create(
        {
            sender:req.user,
            recevier:userId
        }
    );
    emitEvent(req,New_request,[userId],"request")
    return res.status(200).json(
        {
            //success,
            message:"request send successfully"
        }
    );
}catch(err)
{
    return res.status(420).json(
        {
            //console.log(err),
            message:err
            
        }
    )
}
};
const acceptRequest=async (req,res)=>
{
    try
    {
        const {requestId,accept}=req.body;
        const request=await Request.findById(requestId);
        const sender=await User.findById({_id:request.sender});
        const myname=await User.findById({_id:req.user})
        if(!request)
        {
            return res.status(404).json(
                {
                    message:"Request doesn't exisit"
                }
            )
        }
        if(request.recevier.toString()!==req.user)
        {
            return res.status(401).json(
                {
                    message:"You are ont authorized to access"
                }
            )
        };
        if(!accept)
        {
            await Request.deleteOne({_id:requestId});
            return res.status(201).json(
                {
                    message:`Friend request not accpected`
                }
            )
        }
        const Members=[request.recevier,request.sender];
        await Promise.all([
            Chat.create({
                Members,
                name:`${sender.name}-${myname.name}`
            }),
            Request.deleteOne()
        ]);
        return res.status(200).json(
            {
                Members,
                message:"Now both are friends"
            }
        )
    }
    catch(err)
    {
        console.log(err)
        return res.status(400).json(
            {
                message:err
            }
        )
    }
};
const getallNotification=async(req,res)=>
{
    try{
    const requests=await Request.find({recevier:req.user}).populate("sender","name");
    if(!requests)
    {
        return res.status(404).json(
            {
                message:"NO notification to show"
            }
        )
    };
    const AllNotifications = requests.map(request => ({
        requestId: request._id,
        senderId: request.sender._id,
        senderName: request.sender.name
    }));
    return res.status(200).json(
        {
            message:"Success",
            AllNotifications
        }
    )
    }
    catch(err)
    {
        return res.status(404).json(
        {
            message:err
        }
        )
    }
}
const All_user=async (req,res)=>
    {
        try{
            const {name=""}=req.query;
            const members=await User.find({
                name:{$regex:name,$options:"i"}
            });
            const expectMe=members.filter((person)=>person._id.toString()!=req.user)   
            const user=expectMe.map((people)=>
            ({
                _id:people._id,
                person:people.name
            }))           
            return res.status(201).json(
                {
                    message:"success",
                    user
                }
            )
        }
        catch(err)
        {
            console.log(err);
            return res.status(405).json(
                {
                    message:err
                }
            )
        }
    };
const getFriends=async(req,res)=>
{
    try{
    const chatId=req.query.chatId;
    const chats=await Chat.find({
        Members:req.user,
        groupChat:false
    }).populate("Members","name");
    const friends=chats.map(({Members})=>
    {
        const otheruser=getOtherMemeber(Members,req.user);
        return {
            _id:otheruser._id,
            name:otheruser.name
        }
    });
    if(chatId)
    {
        const chat=await Chat.find({_id:chatId});
        const avaiableFriends=friends.filter(
            (friend)=>!chat[0].Members.includes(friend._id)
        );
        return res.status(200).json(
            {
                data:avaiableFriends
            }
        )
    }
    else
    {
        return res.status(200).json(
            {
                data:friends
            }
        )
    }
}
catch(err)
{
    return res.status(404).json(
        {
            msg:err
        }
    )
}
}
export {Login,Newuser,getMyProfile,
    getFriends,Logout,Search_user,sendRequest,acceptRequest,getallNotification,All_user}; 