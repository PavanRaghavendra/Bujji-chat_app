import { sendAttachments } from "../controllers/chat.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/users.js";
import {faker, simpleFaker} from '@faker-js/faker';
const createSinglechat=async (chatsCount)=>
    {
        try{
            const users=await User.find().select("_id");
            const chatsPromise=[];
            for(let i=0;i<users.length;i++)
            {
                for(let j=0;j<users.length;j++)
                {
                    chatsPromise.push(
                        Chat.create({
                            name:faker.lorem.words(2),
                            members:[users[i],users[j]],
                        })
                    )
                }
            }
            await Promise.all(chatsPromise);
            console.log("chats are created");
            process.exit();
        }
        catch(err)
        {
            console.log(err);
            process.exit(1);
        }
    };
    const createGroupchat=async (numChats)=>
    {
        try{
        const users=await User.find().select("_id");
        const chatPromise=[];
        for(let i=0;i<numChats;i++)
        {
            const numMembers=simpleFaker.number.int({min:3,max:users.length-1});
            const members=[];
            for(let i=0;i<numMembers;i++)
            {
                const randomIndex=Math.floor(Math.random()*users.length);
                const randomUser=user[randomIndex];
                if(!members.includes(randomUser))
                {
                    members.push(randomUser);
                }
                const chat=Chat.create(
                    {
                        groupChat:true,
                        name:faker.lorem.words(1),
                        members,
                        creater:members[0],
                    }
                );
                chatPromise.push(chat);
            }
            await Promise.all(chatPromise);
            console.log("chats created successfully");
            process.exit(0);
        }
        return res.status(200).json(
            {
                success:true,
                msg:members
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
    const createMessage=async(numMessages)=>
    {
        try
        {
        const users=await User.find().select("_id");
        const chat=await Chat.find().select("_id");
        const messagePromise=[];
        for(let i=0;i<numMessages;i++)
        {
            const randomUser=users[Math.floor(Math.random()*users.length)];
            const randomchat=chat[Math.floor(Math.random()*chat.length)];
            messagePromise.push(
                Message.create(
                    {
                        chat:randomchat,
                        sender:randomUser,
                        content:faker.lorem.sentence()
                    }
                )
            );
        }
        await Promise.all(messagePromise);
        console.log("Messages created");
        process.exit(1);
    }catch(err)
    {
        console.log(err);
        process.exit(1);
    }
    };
    const createMessagesInchat=async (chatId,numMessages)=>
    {
        try{
            const users=await user.find().select("_id");
            const messagePromise=[];
            for(let i=0;i<numMessages;i++)
            {
                const randomuser=users[Math.floor(Math.random()*users.length)];
                messagePromise.push(
                        Message.create({
                            chatId:chatId,
                            sender:randomuser,
                            content:faker.lorem.sentence()
                        }

                        )
                )
            }
            await Promise.all(messagePromise);
            console.log("messages created successfully");
            process.exit(1);
        }catch(err)
    {
        console.log(err);
        process.exit(1);
    }    }

export {createGroupchat,createMessage,createSampleChats,createSinglechat,createMessagesInchat}