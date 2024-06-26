import express, { Request, Response, Router } from "express";
import { Auth } from "../mongodb/model";
import bcrypt, { hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const router: Router = express.Router();
import {redis} from "../utils/getRedisUrl"

export const getProfile = async (req: Request, res: Response) => {
  const username = req.user.username
  const cachedProfile = await redis.get(`profile:${username}`);
  if (cachedProfile) {
    return res.json(JSON.parse(cachedProfile));
  }
  const admin = await Auth.findOne({ username: username });
  if (!admin) {
    res.status(403).json({ msg: "User doesnt exist" });
    return;
  }
  await redis.set(`profile:${username}`, JSON.stringify(admin),'EX',3600);
  res.json(admin);
};

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const check = await Auth.findOne({ username });
  if (check) {
    return res.status(403).json({ message: "User already exists" });
  }

  const newUser = new Auth({
    username: username,
    password: hashSync(password),
  });
  await newUser.save();
  const token = jwt.sign({ username: username }, process.env.SECRET || "", {
    expiresIn: "1d",
  });
  res.json({ token });
};

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
