import mongoose, {Types,Schema} from "mongoose";
const RequestSchema=new mongoose.Schema(
    {
    status:
    {
        type:String,
        default:"pending",
        enum:["pending","accepted","rejected"],
    },
    attachments:
    {
        public_id:
        {
            type:String,
           // required:true,
        },
        url:
        {
            type:String,
            //required:true
        }
    },
    sender:
    {
        type:Types.ObjectId,
        ref:"User",
        required:true,
    },
    recevier:
    {
        type:Types.ObjectId,
        ref:"User",
        required:true,

    },
},
{
    timestamps:true
}
);
export const Request=mongoose.model("request",RequestSchema)