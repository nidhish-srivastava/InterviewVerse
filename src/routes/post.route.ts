import express, { Router } from "express";

import { getAll,create,deletePost,updatePost,getLoggedInUserPosts,getSingle,searchUserPosts } from "../controller/post.controller";
import { authenticateJwt } from "../middleware/auth";

const router: Router = express.Router();

router.get('/',getAll)
router.post('/',authenticateJwt ,create)
router.get('/search/:username',searchUserPosts)
router.get('/:id',getLoggedInUserPosts)
router.patch('/:id',authenticateJwt,updatePost)
router.delete('/:_id',authenticateJwt,deletePost)
router.get('/single/:id',getSingle)


export default router