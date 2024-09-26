import { ALERT, NEW_ATTACHMENT, NEW_MESSAGE, REFETCH_CHATS } from '../constants/events.js';
import { getOtherMemeber } from '../helpers/helper.js';
import {Chat} from '../models/chat.js'
import { Message } from '../models/message.js';
import { User } from '../models/users.js';
import { deleteFilesfromCloudinary, emitEvent } from '../utils/features.js';
const newGroupChat=async(req,res)=>
{
    try
    {
        const {name,Members}=req.body;
        if(Members.length<2)
        {
            return res.status(404).json(
                {
                    msg:"Memebers should alteast 2 members"
                }
            )
        };
        const allmembers=[...Members,req.user];
        await Chat.create({
            name,
            groupChat:true,
            creater:req.user,
            Members:allmembers
        });
    emitEvent(req,ALERT,allmembers,`Welcome to ${name} group`);
    emitEvent(req,REFETCH_CHATS,Members);
    return res.status(201).json(
        {
            success:true,
            MessageChat:"Group Created"
        }
    )
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
const getMychat=async(req,res)=>
{
    try
    {
        const chats=await Chat.find({Members:req.user}).populate("Members","name");
        const transfromedChats=chats.map((chat)=>
        {
            const othermember=getOtherMemeber(chat.Members,req.user);
            return{
                _id:chat._id,
                name:chat.groupChat?chat.name:othermember.name,
                groupChat:chat.groupChat,
                Members:chat.Members.reduce((prev,curr)=>
                {
                    if(curr._id.toString()!==req.user.toString())
                    {
                        prev.push(curr._id)
                    }
                    return prev;
                },[]),
            }
        });
        return res.status(200).json(
            {
                success:true,
                msg:transfromedChats
            }
        )
    }
    catch(err)
    {
        //console.log(err);
        return res.status(404).json(
            {
                msg:err
            }
        )
    }
};
const getmyGroup=async(req,res)=>
{
    try{
    const chats=await Chat.find({creater:req.user}).populate("Members","name");
    const groups=chats.map(({Members,_id,groupChat,name})=>
    (
        {
        _id,
        groupChat,
        name
       }
    ));
    return res.status(200).json(
        {
            success:true,
            groups,
        }
    );
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
const addnewMem=async(req,res)=>
{
    try{

          const {chatId,Members}=req.body
          const chat=await Chat.findById(chatId);
          if(!chat)
          {
            return res.status(400).json(
                {
                    msg:"chat not found"
                }
            )
          };
          if(!Members||Members.length<1)
          {
            return res.status(404).json(
                {
                    msg:"Please add members to add"
                }
            )
          }
          if(!chat.groupChat)
            {
              return res.status(400).json(
                  {
                      msg:"This is not a groupchat"
                  }
              )
            };
            if(chat.creater.toString()!==req.user.toString())
                {
                  return res.status(403).json(
                      {
                          msg:"you are not allowed to add"
                      }
                  )
                };
          const allnewMemberspromise=Members.map(i=>User.findById(i,"name"));
          const allnewMembers=await Promise.all(allnewMemberspromise);
          const members=allnewMembers.filter(i=>!chat.Members.includes(i._id.toString())).map(i=>i._id);
          chat.Members.push(...members);
          if(chat.Members.length>100)
          {
            return res.status(400).json(
                {
                    msg:"Limit reached"
                }
            )
          };
          await chat.save();
          const allusersName=allnewMembers.map(i=>i.name).join(",");
          emitEvent(req,ALERT,chat.Members,
            `${allusersName} has been added in group`);
          return res.status(200).json(
            {
                success:true,
                allnewMembers
            }
          )
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
const removeMembers=async (req,res)=>
{
    try{
    const {userId,chatId}=req.body;
    const chat=await Chat.findById(chatId);
    const userThatWillBeRemoved=await User.findById({_id:userId},"name");
    if(!chat)
        {
          return res.status(400).json(
              {
                  msg:"chat not found"
              }
          )
        };
        if(!chat.groupChat)
            {
              return res.status(400).json(
                  {
                      msg:"This is not a groupchat"
                  }
              )
            };
         if(chat.creater.toString()!==req.user.toString())
                {
                  return res.status(403).json(
                      {
                          msg:"you are not allowed to add"
                      }
                  )
                };
        if(!userThatWillBeRemoved)
            {
                  return res.status(404).json(
                      {
                          msg:"Please provide valid user"
                      }
                  )
            }
        chat.Members=chat.Members.filter(i=>i.toString()!==userId.toString());
        await chat.save();
        emitEvent(req,ALERT,chat.Members,`${userThatWillBeRemoved.name} has been removed form group`);
        emitEvent(req,REFETCH_CHATS,chat.Members);
        return res.status(200).json(
            {
                msg:"Member remved succeessfully"
            }
        )
    }catch(err)
    {
        return res.status(404).json(
            {
                msg:err
            }
        )
    }
};
const leaveGroup=async (req,res)=>
{
    try{
    const chatId=req.params.id;
    const chat=await Chat.findById(chatId);
    if(!chat)
        {
          return res.status(400).json(
              {
                  msg:"chat not found"
              }
          )
        };
    if(!chat.groupChat)
        {
              return res.status(400).json(
                  {
                      msg:"This is not a groupchat"
                  }
              )
        };
        const remainingMembers=chat.Members.filter(i=>i._id.toString()!==req.user.toString());
        if(remainingMembers==0)
        {
            await Chat.findOneAndDelete(chatId);
            return res.status(200).json(
                {
                    msg:"Chat group has been deleted"
                }
            )
        }
        if(chat.creater.toString()===req.user.toString())
        {
            const newCreator=remainingMembers[0];
            chat.creater=newCreator;
        };
        chat.Members=remainingMembers;
        const user=await User.findById(req.user,"name");
        await chat.save();
        emitEvent(
            req,
            ALERT,
            chat.Members,
            `${user} left the group and ${chat.creater} is your admin now`
        );
        emitEvent(req,REFETCH_CHATS,chat.Members);
        return res.status(200).json(
            {
                msg:"left succesfully"
            }
        )
    }catch(err)
    {
        console.log(err)
        return res.status(404).json(
            {
                msg:err
            }
        )
    }
};
const sendAttachments=async(req,res)=>
{
    try
    {
        const {chatId}=req.body;
        const [chat,me]=await Promise.all([
            Chat.find({_id:chatId.toString()}),
            User.findById(req.user,"name")
        ]);
        if(!chat)
        {
            return res.status(404).json(
                {
                    msg:"chat not found"
                }
            )
        };
            const Members = chat[0].Members.map(i => i._id.toString());
            if (!Members.includes(me._id.toString())) {
                return res.status(403).json({
                    msg: "You are not a member of the group"
                });
            }
        const files=req.files||[];
        if(files.length<1)
        {
            return res.status(400).json(
                {
                    msg:"please send attchments"
                }
            )
        };
    //upload files
    const attachments=[];
    const messageforRealtime={
        content:"",
        attachments,
        sender:
        {
            _id:me._id,
            name:me.name
        },
        chatId,

    };
    const messageforDB={content:"",attachments,sender:me._id,chatId};
    const message=await Message.create(messageforDB);
    emitEvent(req,
        NEW_ATTACHMENT,
        chat.Members,
        {
            Message:messageforRealtime,
            chatId,
        }
    );
    emitEvent(req,NEW_MESSAGE,chat.Members,{chatId});
    return res.status(200).json(
        {
            success:true,
            message
        }
    )
    }
    catch(err)
    {
        console.log(err);
        return res.status(404).json(
            {
                msg:err
            }
        )
    }
};
const getChatDetails=async(req,res)=>
{
    try
    {
        if(req.query.populate)
        {
            const chat=await Chat.findById(req.params.id).populate("Members","name");
            if(!chat)
            {
                return res.status(404).json(
                    {
                        msg:"chatnot found"
                    }
                )
            }
          return res.status(200).json(
            {
                success:true,
                chat
            }
          )
        }
        else
        {
            const chat=await Chat.findById(req.params.id);
            if(!chat)
            {
                return res.status(404).json(
                    {
                        msg:"chatnot found"
                    }
                )
            }
          return res.status(200).json(
            {
                success:true,
                chat
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
};
const renameGroup=async(req,res)=>
{
    try
    {
        const chatId=req.params.id;
        const {name}=req.body;
        const chat=await Chat.findById(chatId);
        if(!chat)
        {
            return res.status(404).json(
                {
                    msg:"No chat exists"
                }
            )
        }
        if(chat.creater.toString()!==req.user.toString())
        {
            return res.status(404).json(
                {
                    msg:"you don't have access to it"
                }
            )
        }
        chat.name=name;
        await chat.save();
        return res.status(200).json(
            {
                success:true,
                msg:"name Changed sucessfully"
            }
        )
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
const deleteChat=async(req,res)=>
{
    try
    {
        const chatId=req.params.id;
        const chat=await Chat.findById(chatId);
        if(!chat)
        {
            return res.status(404).json(
                {
                    msg:"No chat exists"
                }
            )
        }
        const members=chat.Members;
        if(chat.groupChat&&chat.creater.toString()!==req.user.toString())
        {
            return res.status(403).json(
                {
                    msg:"you are not admin"
                }
            );
        };
        if(!chat.groupChat && !members.includes(req.user.toString()))
        {
            return res.status(403).json(
                {
                    msg:"you are not allowed not to delete"
                }
            );
        }
        const messagewithAttachmenst=await Message.find({chatId,attachments:{$exists:true,$ne:[]}});
        const public_ids=[];
        messagewithAttachmenst.forEach(({attachment})=>
        {
            attachment.forEach(({public_id})=>
            {
                public_ids.push(public_id)
            })
        }
        );
        await Promise.all([
            //delete files form cloudinary
            deleteFilesfromCloudinary(public_ids),
            chat.deleteOne(),
            Message.deleteMany({chatId:chatId})
        ]);
        return res.status(200).json(
            {
                success:true,
                message:"Attachments sent successfully"
            }
        );
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
const getMessages=async(req,res)=>
{
    try
    {
        const chatId=req.params.id;
        const {page=1}=req.query;
        const resultperpage=20;
        const skip=(page-1)*resultperpage;
        const [messages,totalMessageCount]=await Promise.all([
            Message.find({chatId:chatId})
            .sort({createdAt:-1})
            .skip(skip)
            .limit(resultperpage)
            .populate("sender","name")
            .lean(),Message.countDocuments({chatId:chatId}),
        ]);
        const totalpages=Math.ceil(totalMessageCount/limit);
        return res.status(200).json(
            {
                success:true,
                message:messages.reverse(),
                totalpages,
            }
        );
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
export {
renameGroup,
getChatDetails,newGroupChat,getMychat,getmyGroup,addnewMem,removeMembers,leaveGroup,sendAttachments,
deleteChat,getMessages};