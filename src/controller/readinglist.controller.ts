import { Request, Response } from "express";
import { ReadingList, Auth } from "../mongodb/model";

const findUserPromise = (userId: string | undefined): Promise<any> => {
  return Auth.findById(userId);
};

const createNewReadingList = async (req: Request, res: Response) => {
  const { name, userId } = req.body;
  const user = await findUserPromise(userId);
  user?.readingLists.push({ name, posts: [] });
  await user?.save();
};

const fetchAllReadingLists = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await findUserPromise(userId);
    const readingLists = user.readingLists;
    res.json(readingLists);
  } catch (error) {}
};

const updateNameOfReadingList = async (req: Request, res: Response) => {
  const { userId, listId, newName } = req.body;
  try {
    /*
        The first argument is the filter that specifies which document to update
        The second argument is the update operation. It uses the $set operator to update a specific field.
        'readingLists.$.name': This syntax is a positional operator ($). It identifies the specific element in the readingLists array that matched the filter, and it updates the name field of that element.
        */
    const update = await Auth.updateOne(
      { _id: userId, "readingLists._id": listId },
      { $set: { "readingLists.$.name": newName } }
    );

    if (!update) {
      return res
        .status(404)
        .json({ message: "User or reading list not found" });
    }
    const updatedUser = await findUserPromise(userId);
    const updatedReadingList = updatedUser.readingLists;

    res
      .status(200)
      .json({
        message: "Reading list name updated successfully",
        updatedReadingList,
      });
  } catch (error) {}
};

const deleteReadingList = async (req: Request, res: Response) => {
  const { userId, listId } = req.body;
  try {
    const deleteList = await Auth.updateOne(
      {
        _id: userId,
      },
      {
        $pull: { readingLists: { _id: listId } },
      }
    );
    if (deleteList.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "User or reading list not found" });
    }

    res.status(200).json({ message: "Reading list deleted successfully" });
  } catch (error) {}
};

const insertInReadingList = async (req: Request, res: Response) => {
  const { userId, listId, postId } = req.body;
  const update = await Auth.updateOne(
    {
      _id: userId,
      "readingLists._id": listId,
    },
    { $push: { "readingLists.$.posts": postId } }
  );

  if (update.modifiedCount === 0) {
    return res.status(404).json({ message: "User or reading list not found" });
  }

  res.status(201).json({ message: "Post added to reading list successfully" });
};

const fetchPostsFromReadingList = async(req:Request,res:Response)=>{
    const {userId,listId} = req.body
    
    const user = await Auth.findOne({ _id: userId, 'readingLists._id': listId })
    .populate({
        path: 'readingLists.posts',
        model: 'Post',  // Specify the model to populate from
        select : 'desc username details tags topic'
    });

    const readingLists = user?.readingLists.filter((e:any)=>e._id==listId)[0]
    res.json(readingLists)
}

export const removePostFromReadingList = async(req:Request,res:Response)=>{
    const {listId,userId,postId} = req.body
    try {
        const update = await Auth.updateOne(
            { _id: userId, 'readingLists._id': listId },
            { $pull: { 'readingLists.$.posts': postId } }
          )
          if(update.modifiedCount==0){
            return res.status(404).json({ message: 'User, reading list, or post not found' });
          }
          res.status(200).json({ message: 'Post removed from reading list successfully' });
    } catch (error) {
        
    }
}


export {
  createNewReadingList,
  fetchAllReadingLists,
  updateNameOfReadingList,
  deleteReadingList,
  insertInReadingList,
  fetchPostsFromReadingList
};
