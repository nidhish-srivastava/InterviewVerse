import express, { Request, Response, Router } from "express";
import { Auth } from "../mongodb/model";
import bcrypt, { hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const router: Router = express.Router();
import { redis } from "../utils/getRedisUrl";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const getProfile = async (req: Request, res: Response) => {
  const username = req.user.username;
  const cachedProfile = await redis.get(`profile:${username}`);
  if (cachedProfile) {
    return res.json(JSON.parse(cachedProfile));
  }
  const admin = await Auth.findOne({ username: username }).select("-password");
  if (!admin) {
    res.status(403).json({ msg: "User doesnt exist" });
    return;
  }
  await redis.set(`profile:${username}`, JSON.stringify(admin), "EX", 3600);
  res.json(admin);
};

const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const sendVerificationEmail = async (
  useremail: string,
  verificationToken: string | undefined
) => {
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: useremail,
    subject: "Verify your email",
    text: `Please verify your email by clicking on the following link : ${process.env.FRONT_END_URL}/verify/${verificationToken}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to", useremail);
  } catch (error) {
    console.log("Error sending the verification email", error);
  }
};

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const check = await Auth.findOne({ username });
    if (check) {
      return res.status(403).json({ message: "User already exists" });
    }
    const verificationToken = generateVerificationToken();
    
    const tokenExpires = Date.now() + 3600000;
    
    const newUser = new Auth({
      username: username,
      password: hashSync(password),
      verificationToken,
      tokenExpires,
    });
  
    await newUser.save();
    await sendVerificationEmail(newUser.username,newUser.verificationToken)
    res.json('Account created successfully')
  } catch (error) {
    console.log("Error registering the user");
    res.status(500).json({message:"Registation Failed"})
  }
};

export const verifyToken = async(req:Request,res:Response)=>{
  const {token} = req.params
  const user = await Auth.findOne({verificationToken : token})
  if (!user || !user.tokenExpires || new Date(user.tokenExpires).getTime() < Date.now()) {
    return res.status(400).json({ message: 'Token is invalid or has expired' });
  }
  user.isVerified = true;
  user.verificationToken = undefined;
  user.tokenExpires = undefined;
  
  await user.save();

  const authToken = jwt.sign({ username: user.username }, process.env.SECRET || "", {
    expiresIn: "10d",
  });
  res.status(200).json({ message: 'Account verified successfully', token: authToken, username: user.username });
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const admin = await Auth.findOne({ username: username });

  if (admin) {
    bcrypt.compare(password, admin?.password, function (err, info) {
      if (err) {
        res.status(401).json("password doesnt match");
      }
      if (info) {
        const token = jwt.sign(
          { username, role: "admin" },
          process.env.SECRET || "",
          { expiresIn: "1d" }
        );
        res.json({ token, admin });
      } else {
        res.status(401).json("Password doesnt match");
      }
    });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
};

export default router;
