import express, { Router, Request, Response } from "express";

import { getAll,create,deletePost,updatePost } from "../controller/post.controller";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the Admin Dashboard!");
  });

router.get('/',getAll)
router.post('/',create)
router.put('/:id',updatePost)
router.delete('/:id',deletePost)


export default router