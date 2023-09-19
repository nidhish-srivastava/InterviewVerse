import { Auth } from "../mongodb/model";
import express,{ Request, Response,Router } from "express";
import bcrypt, { hashSync } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


const router : Router = express.Router()

export const getProfile =  async (req : Request, res : Response) => {
    const admin = await Auth.findOne({username : req.user.username})
    if (!admin) {
        res.status(403).json({ msg: "User doesnt exist" })
        return
    }
    res.json(admin)
}

export const signup =async(req:Request,res : Response)=>{
    const {username,password} = req.body
    const check = await Auth.findOne({username})
    if(check){
        res.status(403).json({ message: "User already exists" })
    }

    const newUser = new Auth({username : username,password : hashSync(password)})
    await newUser.save()
    const token = jwt.sign({username : username},process.env.SECRET || "",{expiresIn : "1h"})
    res.json({msg : "User created Successfully",token})
}

export const  login =async(req:Request,res : Response)=>{
    const {inputs : {username,password}} = req.body
    const admin = await Auth.findOne({username : username})
    
    if (admin) {
        bcrypt.compare(password, admin?.password, function (err, info) {
            if (err)  res.status(401).json("password doesnt match")
            if (info) {
                const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET || "", { expiresIn: '1h' })
                res.json({ message: 'Logged in successfully', token, admin });
            }
        })
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
}

export default router