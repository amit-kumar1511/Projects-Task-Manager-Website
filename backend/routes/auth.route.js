import express from "express"
import {signin, signup, updateUserProfile, userProfile} from "../controlers/auth.controler.js"
import { verifyToken } from "../utils/verifyser.js";

const router = express.Router();

//signup , post route
router.post("/sign-up",signup);

//login routes, post route
router.post("/sign-in",signin)

//make user profile , get route for token 
router.get("/user-profile",verifyToken,userProfile)

//update user profile
router.put("/update-profile",verifyToken,updateUserProfile)

export default router