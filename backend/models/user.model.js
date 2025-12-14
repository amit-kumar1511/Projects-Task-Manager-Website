import mongoose, { Schema } from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImgUrl:{
        type:String,
        default:"https://stock.adobe.com/search?k=user+icon"
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema)