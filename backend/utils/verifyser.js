import { errorhandler } from "./error.js"
import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token

    if(!token){
        return next(errorhandler(404,"unauthorized user"))
    }

    //verify token
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(errorhandler(404,"unauthorized user"))
        }

        req.user = user

        next()
    })
}

//admin
export const adminonly = (req,res,next)=>{
    if(req.user && req.user.role==="admin"){
        next()
    }else{
        return next(errorhandler(404,"Acess denied ,  Admin only"))
    }
}