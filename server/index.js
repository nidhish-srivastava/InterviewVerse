import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()
import Route from './route.js'

const app = express()
app.use(express.json({limit : '50mb'}))
app.use(Route)

const start = async()=>{
    mongoose.set("strictQuery",true)
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to DB");
    app.listen(4000,()=>{
        console.log("Server running at port 4000");
    })
}
start()