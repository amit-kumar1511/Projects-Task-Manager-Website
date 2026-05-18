import express from "express";
import { generateDescription, generateUrls } from "../controller/ai.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/generate-description", verifyToken, generateDescription);
router.post("/generate-urls", verifyToken, generateUrls);

export default router;
