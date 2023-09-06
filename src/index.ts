import express from 'express'
import cors from 'cors'
import postRouter from './routes/post.route'
import authRouter from './routes/auth.route'
const app = express()

const corsOptions = {
    origin:'http://localhost:5173', 
    credentials:true,          
      //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/post',postRouter)
app.use('/auth',authRouter)

export default app  