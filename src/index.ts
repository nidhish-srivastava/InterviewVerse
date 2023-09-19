import express from 'express'
import cors from 'cors'
import postRouter from './routes/post.route'
import authRouter from './routes/auth.route'
const app = express()


app.use(cors())
app.use(express.json())
app.use('/post',postRouter)
app.use('/auth',authRouter)

export default app  