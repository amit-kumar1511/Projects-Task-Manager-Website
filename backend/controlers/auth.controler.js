import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorhandler } from "../utils/error.js"

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