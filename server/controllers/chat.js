import { ALERT, NEW_ATTACHMENT, NEW_MESSAGE, NEW_MESSAGE_ALRET, REFETCH_CHATS } from '../constants/events.js';
import { getOtherMemeber } from '../helpers/helper.js';
import {Chat} from '../models/chat.js'
import { Message } from '../models/message.js';
import { ErrorResponse } from '../middlewares/errorReponse.js';
import { User } from '../models/users.js';
import { deleteFilesfromCloudinary, emitEvent, uploadCloudinary } from '../utils/features.js';
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
        const admin=[req.user]
        await Chat.create({
            name,
            groupChat:true,
            creater:req.user,
            Members:allmembers,
            admin
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
        const transfromedChats=await Promise.all(chats.map(async (chat)=>
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
        }));
        //console.log(transfromedChats)
        return res.status(200).json(
            {
                success:true,
                msg:transfromedChats,
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
          emitEvent(req,ALERT,chat.Members,{message: `${allusersName} has been added in group`,chatId:chatId});
            emitEvent(req,REFETCH_CHATS,chat.Members);
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
    const {Members,chatId}=req.body;
    const chat=await Chat.findById(chatId);
    const userThatWillBeRemoved=await Promise.all(
        Members.map((_id)=>
        {
            if(_id.toString()===req.user.toString())
                 isadmin=true
           User.findById({_id:_id},"name");
        })
    );
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
            if(chat.Members.length<=3||(chat.Members.length-Members.length<3))
                return res.status(404).json(
            {
                msg:"Group must contain atleast 3 members"
            })
            const allmembers=chat.Members.map((i)=>i.toString());
            let remainingMembers = chat.Members; 
            remainingMembers = remainingMembers.filter(id => !Members.some(m => m.toString() === id.toString()));
            chat.Members = remainingMembers;
            let admins=chat.admin
            admins=admins.filter(i=>!Members.some(m=>m.toString()===i.toString()))
            chat.admin=admins
            await chat.save();
        emitEvent(req,ALERT,allmembers,{chatId:chatId,message:`${userThatWillBeRemoved} has been removed form group`});
        emitEvent(req,REFETCH_CHATS,allmembers);
        return res.status(200).json(
            {
                msg:"Leaved group succeessfully"
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
        const user=await User.findById(req.user);
        const creator=await User.finById(chat.creater)
        await chat.save();
        emitEvent(
            req,
            ALERT,
            chat.Members,
            {chatId:chatId,message:`${user.name} left the group and ${create} is your admin now`}
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
       // console.log(files);
      // console.log(Members);
        if(files.length<1)
        {
            return res.status(400).json(
                {
                    msg:"please send attchments"
                }
            )
        };
        if(files.length>5)
            {
                return res.status(400).json(
                    {
                        msg:"attachments should be less than 5"
                    }
                )
            };
    //upload files
    const attachments=await uploadCloudinary(files);
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
        NEW_MESSAGE,
        Members,
        {
            msg:messageforRealtime,
            chatId,
        }
    );
    emitEvent(req,NEW_MESSAGE_ALRET,Members,{chatId});
    return res.status(200).json(
        {
            success:true,
            msg
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
const getChatDetails=async(req,res,next)=>
{
    try
    {
        if(req.query.populate)
        {
            
            const chat2=await Chat.findById(req.params.id);
            if(!chat2)
                return res.status(404).json(
            {
                msg:"chat not found"
            })
        if(!chat2.Members.includes(req.user.toString()))
        {
            return res.status(404).json(
                {
                    msg:"you are part of this group"
                }
            )
        }
            const chat=await Chat.findById(req.params.id).populate("Members","name");
            if(!chat)
            {
                return res.status(404).json(
                    {
                        msg:"chat not found"
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
        return next(new ErrorResponse("invalid chat id",400));
    }
};
const renameGroup=async(req,res)=>
{
    try
    {
        const {chatId}=req.body;
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
        emitEvent(req,REFETCH_CHATS,chat.Members);
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
        emitEvent(req,REFETCH_CHATS,members)
        return res.status(200).json(
            {
                success:true,
                msg:"Deleted Successfully"
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
        const {page}=req.query;
        const resultperpage=20;
        const skip=(page-1)*resultperpage;
        const chat=await Chat.findById(chatId);
        if(!chat)
            return res.status(404).json(
        {
            msg:"chat not found"
        })
        if(!chat.Members.includes(req.user))
                return res.status(404).json(
            {
                msg:"you are not allowed to access."
            })
        const [messages,totalMessageCount]=await Promise.all([
            Message.find({chatId:chatId})
            .sort({createdAt:-1})
            .skip(skip)
            .limit(resultperpage)
            .populate("sender","name")
            .lean(),Message.countDocuments({chatId:chatId}),
        ]);
        const totalpages=Math.ceil(totalMessageCount/resultperpage);
        return res.status(200).json(
            {
                success:true,
                msg:messages.reverse(),
                totalpages,
            }
        );
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
}
const makeAdmin=async(req,res)=>
{
    try{
        const {chatId,userId}=req.body
        const chat=await Chat.findById(chatId)
        const user=await User.findById(userId)
        if(!chat)
            return res.status(404).json(
        {
            msg:"Enter valid chatId"
        });
        if(!user)
            return res.status(404).json(
        {
                    msg:"Provide userId"
        });
        let currentadmin=chat.admin;
        currentadmin=[...currentadmin,userId]
        chat.admin=currentadmin;
        await chat.save()
        emitEvent(req,REFETCH_CHATS,chat.Members)
        return res.status(200).json(
            {
                msg:`${user.name} is admin`
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
}
const removeAdmin=async(req,res)=>
    {
        try{
            const {chatId,userId}=req.body
            const chat=await Chat.findById(chatId)
            const user=await User.findById(userId)
            if(!chat)
                return res.status(404).json(
            {
                msg:"Enter valid chatId"
            });
            if(!user)
                return res.status(404).json(
            {
                        msg:"Provide userId"
            });
            let currentadmin=chat.admin;
            currentadmin=currentadmin.filter((i)=>i.toString()!=userId.toString())
            chat.admin=currentadmin;
            await chat.save()
            emitEvent(req,REFETCH_CHATS,chat.Members)
            return res.status(200).json(
                {
                    msg:`${user.name} removed as admin`
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
    }
export {
renameGroup,
getChatDetails,newGroupChat,getMychat,getmyGroup,addnewMem,removeMembers,leaveGroup,sendAttachments,
deleteChat,getMessages,makeAdmin,removeAdmin};