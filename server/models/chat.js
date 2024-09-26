import mongoose, {Types} from "mongoose";
const Chatschema=new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true,
        },
        groupChat:
        {
            type:Boolean,
            default:false,
        },
        creater:
        {
            type:Types.ObjectId,
            ref:"User"
        },
        Members:
        [
        {
            type:Types.ObjectId,
            ref:"User"
        },
    ],
    },
    {
        timestamps:true
    }
);
export const Chat=mongoose.model("Chat",Chatschema);