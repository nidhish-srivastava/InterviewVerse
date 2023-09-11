import express, { Router } from "express";

import { getAll,create,deletePost,updatePost } from "../controller/post.controller";

const router: Router = express.Router();


router.get('/',getAll)
router.post('/',create)
router.put('/:id',updatePost)
router.delete('/:id',deletePost)


export default router