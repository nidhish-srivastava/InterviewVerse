import express, { Request, Response } from 'express'
import cors from 'cors'
import postRouter from './routes/post.route'
import authRouter from './routes/auth.route'
import readingListRouter from './routes/readinglist.route'
import { connectmongodb } from "./mongodb/connect";
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3000
const app = express()
app.use(cors({
    origin: 'https://interview-verse.vercel.app',
}))
app.use(express.json())


const start = async() =>{
    await connectmongodb()
    app.listen(port,()=>{
        console.log(`Server is listening at port ${port}`);
    })
}

start()

app.get('/',(req:Request,res:Response)=>{
    res.send(`Welcome to Interview Verse Backend Server`)
})

app.use('/post',postRouter)
app.use('/auth',authRouter)
app.use('/readingList',readingListRouter)

export default app  