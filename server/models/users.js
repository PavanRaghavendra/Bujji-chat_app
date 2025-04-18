import mongoose from "mongoose";
const UserSchema=new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true,
        },
        username:
        {
            type:String,
            required:true,
            unique:true,
        },
        password:
        {
            type:String,
            required:true,
            select:false
        },
        bio: {
            type: String,
            required: false, // Make it not required to be compatible with existing data
            default: "" // Provide a default value for existing records
        }
    },
    {
        timestamps:true
    },
);
const User=mongoose.model("User",UserSchema);
export{User};