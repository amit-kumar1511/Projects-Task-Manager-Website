import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import {connectDB} from "./Database/db.js"
import authRoutes from "./routes/auth.route.js"

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

//app route
app.use("/api/auth",authRoutes)

//error handle
app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500

  const message = err.message || "Internel server error"

  res.status(statusCode).json({
    succes:false,
    statusCode,
    message,
  })
})

app.listen(3000,()=>console.log(`seerver is running`))