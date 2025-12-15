import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"

export const signup = async (req,res)=>{
    const {name,email,password,profileImgUrl,adminJoinCode} = req.body

    if(name==="" ||email===""||password==="") return res.status(400).json({message:"all fields are required",success:false})

    //check if user already exist
    const isAlreadyexist = await User.findOne({email})

    if (isAlreadyexist) {
        return res
            .status(400)
            .json({message:"user already exist", success:false})
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
        res.status(500).json({message:error.message()})
    }
}