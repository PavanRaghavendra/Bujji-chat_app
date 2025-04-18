import express from 'express'
import UserRoute from './routes/user.js'
import Chatroute from './routes/chats.js'
import adminRoute from './routes/admin.js'
import { errorHandler } from './middlewares/error.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import {getSockets} from './helpers/helper.js'
import {NEW_MESSAGE,NEW_MESSAGE_ALRET, START_TYPING, STOP_TYPING} from './constants/events.js'
import cookieParser from 'cookie-parser';
import {Server} from 'socket.io';
import {Message} from './models/message.js'
import { SocketAuth } from './middlewares/auth.js'
dotenv.config({
    path: "./.env"
});
const mongoURI = process.env.MONGO_URL;
//console.log(mongoURI);
const port = process.env.PORT || 3003;
if (!mongoURI) {
    console.error("MONGO_URL is not defined in the environment variables");
    process.exit(1);
};
const userIds=new Map();
mongoose.connect("mongodb://localhost:27017/Bujji")
    .then(() => {
        const app = express();
        const io=new Server(app.listen(port,()=>
        {
            console.log(`Server is running on port ${port}`);
        }),{
            cors:{
                origin:"http://localhost:5173",
                credentials:true
            }
        });
        app.set("io",io);
        io.use((socket,next)=>
            {
                cookieParser()(socket.request,socket.request.res,async (err)=>
                {
                    await SocketAuth(err,socket,next)
                })
            })
        io.on("connect",(socket)=>
        {
            const user=socket.user;
            userIds.set(user._id.toString(),socket.id);
            socket.on("disconnect",()=>
            {
               // console.log(socket.id);
                userIds.delete(user._id.toString());
            });
            socket.on(NEW_MESSAGE,async ({chatId,message,members})=>{
                const MessageForRealTime={
                    content:message,
                    _id:Math.random(1000),
                    sender:{
                        _id:user._id,
                        name:user.name,
                    },
                    chatId:chatId,
                    createdAt:new Date().toISOString(),
                };
                const MessageForDb={
                    content:message,
                    sender:user._id,
                    chatId:chatId,
                };
                const socketMembers=getSockets(members);
               // console.log(socketMembers);
                io.to(socketMembers).emit(NEW_MESSAGE,{
                    chatId,
                    message:MessageForRealTime,
                });
                io.to(socketMembers).emit(NEW_MESSAGE_ALRET,{chatId});
                try{
                    const message=await Message.create(MessageForDb);
                }catch(error)
                {
                    console.log(error);
                }
            });
            socket.on(START_TYPING,async({members,chatId})=>
            {
                //console.log(members);
                const membersTyping=getSockets(members);
                // console.log(membersTyping);
                socket.to(membersTyping).emit(START_TYPING,{chatId});
                //console.log("event emitted")
            });
            socket.on(STOP_TYPING,async({members,chatId})=>
                {
                    //console.log("stop typing");
                    const membersTyping=getSockets(members);
                    // console.log(membersTyping);
                    socket.to(membersTyping).emit(STOP_TYPING,{chatId});
                });
        })
        app.use(express.json());
        app.use(cookieParser());
        app.use(cors(
            {
                origin:[process.env.FRONTEND_URL,process.env.CLIENT_URL],
                credentials:true,
            }
        ))
        app.use('/api/v1/user', UserRoute);
        app.use('/api/v1/chats',Chatroute);
        app.use('/api/v1/admin',adminRoute);
        app.use(errorHandler);
    })
    .catch(error => {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    });
export {userIds}