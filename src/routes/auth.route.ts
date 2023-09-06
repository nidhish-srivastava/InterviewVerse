import express, { Router } from "express";
import { authenticateJwt } from "../middleware/auth";
import { getProfile, login, signup } from "../controller/auth.controller";
const router: Router = express.Router();

router.get('/me',authenticateJwt,getProfile)
router.post('/login',login)
router.post('/signup',signup)


export default router