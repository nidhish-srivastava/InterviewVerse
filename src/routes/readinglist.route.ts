import { createNewReadingList,deleteReadingList,fetchAllReadingLists, fetchPostsFromDefaultList, fetchPostsFromReadingList, fetchPublicListsOfUser, insertInReadingList, removePostFromReadingList, updateNameOfReadingList } from "../controller/readinglist.controller";
import express, { Router } from "express";
const router: Router = express.Router();

router.post('/',createNewReadingList)
router.get('/fetchAll/:userId',fetchAllReadingLists)
router.get('/fetchPublicOnly/:username',fetchPublicListsOfUser)
router.put('/',updateNameOfReadingList)
router.delete('/',deleteReadingList)

router.get('/fetchPost/:userId',fetchPostsFromDefaultList)
router.get('/fetchPost/:userId/:listId',fetchPostsFromReadingList)
router.post('/insertPost',insertInReadingList)
router.put('/removePost',removePostFromReadingList)

export default router
