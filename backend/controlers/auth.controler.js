import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorhandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const signup = async (req,res,next)=>{
    const {name,email,password,profileImgUrl,adminJoinCode} = req.body

    if(name==="" ||email===""||password==="") {
        return next(errorhandler(400,"All fields are required..."))
    }

    //check if user already exist
    const isAlreadyexist = await User.findOne({email})

    if (isAlreadyexist) {
        return next(errorhandler(400,"user already exist"))
    }

    //check user role , using adminjoincode
    let role = "user"
     
    if(adminJoinCode && adminJoinCode === process.env.ADMIN_JOIN_CODE){
        role="admin"
    }

    //bcrypt password 
    const handlePass = bcryptjs.hashSync(password,10)

    //create new user for save in db
    const newuser = new User({
        name,email,password:handlePass,profileImgUrl,role
    })

    //save new user in db
    try {
        await newuser.save()
        res.json({message:"sign-Up Successful."})
    } catch (error) {
        next(error.message)
    }
}

export const signin = async (req,res,next)=>{
    try {
        const {email,password} = req.body

        if(!email || !password || email==="" || password==="") return next(errorhandler(404,"all fields are required.."))

        //check valid user
        const validUser = await User.findOne({email})

        if(!validUser) return next(errorhandler(404,"user noit exist"))

        //compare password
        const validPass = bcryptjs.compareSync(password,validUser.password) 

        if(!validPass) return next(errorhandler(404,"Incorrect Password please try again.."))

        //all is good then give a token of user 
        const token = jwt.sign({id: validUser._id},process.env.JWT_SECRET)

        //token me password send nhi krenge
        const {password :pass,...rest}=validUser._doc

        //token dene ke baad login krba denge user ko
        res.status(200).cookie("access_token" , token , {httpOnly:true}).json(rest)
    } catch (error) {
        next(error)
    }
}

export const userProfile = async(req,res,next)=>{
    try {
        const user = await User.findById(req.user.id)

        if(!user){
            return next(errorhandler(404,"user not found"))
        }

        const {password: pass,...rest} = user._doc

        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

//update user profile data
export const updateUserProfile=async(req,res,next)=>{
    try {
        const user = await User.findById(req.user.id)

         if(!user){
            return next(errorhandler(404,"user not found"))
        }
        
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = bcryptjs.hashSync(req.body.password,10)
        }
        const updateUser = await user.save()

        //pass data
        const {password:pass,...rest}= user._doc

        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}