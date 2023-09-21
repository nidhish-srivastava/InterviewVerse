import express, { Request, Response } from 'express'
import cors from 'cors'
import postRouter from './routes/post.route'
import authRouter from './routes/auth.route'
const app = express()
const port = process.env.PORT || 3000
import { connectmongodb } from "./mongodb/connect";

const start = async() =>{
    connectmongodb()
    app.listen(port,()=>{
        console.log(`Server is listening at port ${port}`);
    })
}

start()



app.get('/',(req:Request,res:Response)=>{
    res.send(`Welcome to Interview Tracker`)
})
app.use(cors())
app.use(express.json())
app.use('/post',postRouter)
app.use('/auth',authRouter)

// export default app  