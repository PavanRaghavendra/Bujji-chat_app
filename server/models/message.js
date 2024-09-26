import { Types } from "mongoose";
import mongoose from "mongoose";
const MessageSchema=new mongoose.Schema(
    {
        constent: String,
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
            ref:"user",
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