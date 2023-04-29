import express from 'express'
import { getAll,create,deletePost,updatePost } from './controller.js'

const router = express.Router()

router.get('/',getAll)
router.post('/create',create)
router.delete('/delete',deletePost)
router.put('/:id',updatePost)

export default router