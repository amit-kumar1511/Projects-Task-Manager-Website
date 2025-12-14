import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import {connectDB} from "./Database/db.js"

//config dotenv
dotenv.config();

const app = express();

//middleware to handle cors
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

//middleware to handle JSON object
app.use(express.json())

//connect database
connectDB();

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(3000,()=>console.log(`seerver is running`))