import { Types } from "mongoose";
import mongoose from "mongoose";
const MessageSchema=new mongoose.Schema(
    {
        content:{
            type:String,
            require:true
        },
        attachments:
        [{
            public_id:
            {
                type:String,
                required:true,
            },
            url:
            {
                type:String,
                required:true
            },
        },
    ],
        sender:
        {
            type:Types.ObjectId,
            ref:"User",
            required:true,
        },
        chatId:
        {
            type:Types.ObjectId,
            ref:"chat",
            required:true,

        },
    },
    {
        timestamps:true
    }
);
export const Message=mongoose.model("Message",MessageSchema);