import express from 'express'
import { getAll,create } from './controller.js'

const router = express.Router()

router.get('/',getAll)
router.post('/create',create)

export default router