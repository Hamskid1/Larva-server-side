import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(cookieParser())






const PORT = process.env.PORT || 4500;

mongoose.connect(process.env.MONGO_URI)

    .then(() => {
        app.listen(4500, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        console.log("Connected To MongoDB")
    })

    .catch((error) => { console.log(error.message) })

