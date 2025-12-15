import express from "express"
import {signup} from "../controlers/auth.controler.js"

const router = express.Router();

//signup , post route
router.post("/sign-up",signup);

export default router