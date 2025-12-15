import express from "express"
import {signin, signup} from "../controlers/auth.controler.js"

const router = express.Router();

//signup , post route
router.post("/sign-up",signup);

//login routes, post route
router.post("/sign-in",signin)

export default router