import express from "express"
import cors from "cors"
import dotenv from "dotenv"


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

app.listen(3000,()=>console.log(`seerver is running`))