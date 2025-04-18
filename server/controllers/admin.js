import { Chat } from "../models/chat.js";
import { User } from "../models/users.js";
import { Message } from "../models/message.js";
import jwt from "jsonwebtoken";
const adminLogin = async (req, res) => {
    try {
        const {secretKey} = req.body;
        const originalKey = process.env.Admin_key; // Make sure this matches your .env variable name exactly
        if (!secretKey) {
            return res.status(400).json({
                success: false,
                msg: "Please enter secret key"
            });
        }
        if (secretKey!==originalKey) {
            return res.status(401).json({
                success: false,
                msg: "Invalid secret key"
            });
        }
        
        const token = jwt.sign({secretKey}, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).cookie("admintoken", token, {
            maxAge: 1000 * 60 * 30,
        }).json({
            success: true,
            msg: "Admin login successful"
        });
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        });
    }
};
const logOut=async(req,res)=>{
    try
    {
        if(!req.cookies.admintoken)
        {
            return res.status(400).json({
                success:false,
                msg:"Admin not logged in"
            })
        }
    return res.status(200).clearCookie("admintoken").json({
        success:true,
        msg:"Admin logout successful"
    })
}
catch(err)
{
    return res.status(400).json({
        success:false,
        message:err.message
    })
}
};
const allUsers = async (req, res) => {
    try {
        // Get all users from database
        const users = await User.find({});
        const transformedUsers=await Promise.all(
            users.map(async (user)=>{
                const [groups,friends]= await Promise.all([
                    Chat.countDocuments({groupChat:true,Members:user._id}),
                    Chat.countDocuments({groupChat:false,Members:user._id})]);
                return{
                    name:user.name,
                    username:user.username,
                    id:user._id,
                    groups,
                    friends
                }
            })
        )
        return res.status(200).json({
            success: true,
            transformedUsers // renamed from user to users for clarity
        });
    }
    catch(err) {
        return res.status(400).json({
            success: false,
            msg: err.message
        });
    }
};
const allChats = async (req, res) => {
    try {
      const chats = await Chat.find({}); 
      const transformedChats = await Promise.all(
        chats.map(async (chat) => {
          const totalMessages = await Message.countDocuments({ chatId: chat._id });
          const Membersname = await Promise.all(
            chat.Members.map(async (member) => {
              const user = await User.findById(member);
              return user.name;
            })
          );
          const creator = await User.findById(chat.creater);
          return {
            name: chat.name,
            id: chat._id,
            groupChat:chat.groupChat,
            members: Membersname,
            creator: creator ? creator.name : "Unknown", // Add null check here
            totalMembers: chat.Members.length,
            totalMessages: totalMessages
          };
        })
      );
      
      return res.status(200).json({
        success: true,
        transformedChats
      });
    } catch (err) {
      return res.status(404).json({
        success: false,
        msg: err.message
      });
    }
  };
const alldashboard=async(req,res)=>
{
    try{
        const [groupChat,totalUsers,totalMessages,totalChats]=await Promise.all([
            Chat.countDocuments({groupChat:true}),
            User.countDocuments(),
            Message.countDocuments(),
            Chat.countDocuments()
        ])
        const today=new Date();
        const last7days=new Date();
        last7days.setDate(last7days.getDate()-7);
        const last7daysMessages=await Message.find(
            {
                createdAt:{
                    $gte:last7days,
                    $lte:today
                }
            }
        );
        const days=new Array(7).fill(0);
        const dayInMilli=1000*60*60*24;
        last7daysMessages.forEach((message)=>{
            const index=Math.floor((today.getTime()-message.createdAt.getTime())/dayInMilli);
            days[6-index]++;
        })

        const status={
            groupChat,
            totalUsers,
            totalMessages,
            totalChats,
            days
        }
        return res.status(200).json({
            success:true,
            status
        })
    }
    catch(err)
    {
        return res.status(404).json({
            success: false,
          message: err.message
        });
    }
}
const getAdmin=async(req,res)=>{
    return res.status(200).json({
        success:true,
        msg:"Admin verified"
    })
}
const allMessages=async(req,res)=>
{
    try
    {
        const Messages=await Message.find({})
        const transformedMessages=await Promise.all(
            Messages.map(async (message)=>
            {
                const sender=await User.findById(message.sender)
                const chat=await Chat.findById(message.chatId)
                let attachments=message.attachments.length===0?"No attchments":message.attachments
                return {
                    id:message._id,
                    sendername:sender.name||"",
                    chatname:chat?.name||"",
                    groupchat:chat?.groupChat||"false",
                    attachments:attachments,
                    content:message.content||"No content",
                    createdAt:message.createdAt
                } 
            }
            )
        )
        return res.status(200).json(
            {
                success:true,
                transformedMessages
            }
        )
    }catch(err)
    {
        return res.status(404).json(
            {
                success:false,
                msg:err.message
            }
        )
    }
}
export { allUsers ,allChats,alldashboard,adminLogin,logOut,getAdmin,allMessages}