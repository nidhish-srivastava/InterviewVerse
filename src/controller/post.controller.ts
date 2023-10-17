import { Request, Response } from "express";
import { Auth, Post } from "../mongodb/model";
import { connectmongodb } from "../mongodb/connect";

interface ReqQuery {
  topic?: string; // Assuming 'topic' is a string in req.query
  username?: string;
}

const cleanInput = (input: string) => {
  return new RegExp(
    input
      ?.trim()
      .replace(/\s{2,}/g, " ")
      .replace(/,(?!\s)/g, ", ")
      .toString()
      .toLowerCase(),
    "i"
  );
};

export const getAll = async (req: Request, res: Response) => {
  connectmongodb()
  const { topic, username } = req.query as ReqQuery;
  const queryObject: Record<string, any> = {}; //* wierd ts stuf :))

  if (topic) {
    // queryObject.topic = { $regex: topic, $options: "i" };
    queryObject.topic = cleanInput(topic);
  }

  // if(username){
  //   queryObject.username = cleanInput(username)
  // }

  try {
    // const getAllPost = await Post.find(queryObject);
    const getAllPost = await Post.find(queryObject);
    res.status(200).json({ msg: "All posts read", getAllPost });
  } catch (error) {
    res.status(500).json({ msg: "Error is coming", error });
  }
};

const getSinglePromise = async (username: string | undefined): Promise<any> => {
  return await Post.find({ username: username });
};

export const searchUserPosts = async (req: Request, res: Response) => {
  const { username } = req.params;
  console.log(username);
  try {
    const response = await getSinglePromise(username);
    if (response.length == 0) {
      res.status(404).send(`<h3>${username} not found</h3>`);
    }
    res.status(200).json(response);
  } catch (error) {}
};

export const getLoggedInUserPosts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await getSinglePromise(id);
    res.status(200).json(response);
  } catch (error) {}
};

export const saveInSavedPosts = async (req: Request, res: Response) => {
  const {postId,userId} = req.body
  try {
    // const user = await Auth.findById({ _id: userId });
    // user?.savedPosts?.push(postId);
    // const data = await user?.save();
    //* Replaced three lines with a single  --> flex
    const data = await Auth.updateOne({_id : userId},{ $addToSet : {savedPosts : postId }})
    res.status(200).send(`Post saved successfully`)
  } catch (error) {}
};

export const getSavedPosts = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const response = await Auth.findById({ _id: userId }).populate({
      path: "savedPosts",
      model: "Post",
      select: "desc username tags details topic",
    });
    res.json(response?.savedPosts)
  } catch (error) {}
};

export const deleteSavedPosts = async(req:Request,res:Response)=>{
  const {userId,postId} = req.params
  try {
     await Auth.findByIdAndUpdate(userId,
      {
        $pull : {savedPosts : postId}
      },
      {new : true}
      )
      res.status(200).json("Deleted successfully")
    // const response = await Auth.findByIdAndDelete({_id : postId})
    // console.log(response);
  } catch (error) {
    res.status(400).json("Unable to delete")
  }
}

export const checkIfSaved = async(req:Request,res:Response)=>{
  const {postId,userId} = req.params
  try {
    // const response = await Auth.findById(userId)
    // const savedPosts = response?.savedPosts?.map(e=>e.toString()),THen we write the find method on this array to find this post
    //* Using below,we save 3 lines
    const response = await Auth.findOne({_id : userId,savedPosts : postId})
    if(response?.savedPosts?.length ?? 0 >0) res.status(200).send(true) 
  } catch (error) {
    
  }
}

export const create = async (req: Request, res: Response) => {
  const { desc, tags, details, topic, username } = req.body;

  // console.log(desc,tags,details,topic);
  // console.log(tags);
  const newPost = new Post({
    desc: desc,
    tags: tags,
    details: details,
    topic: topic,
    username: username,
  });

  try {
    await newPost.save();
    res.status(201).send("Post created");
  } catch (error) {
    res.status(500).json({ msg: "Error is coming", error });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    await Post.findByIdAndDelete(_id);
    res.status(200).json({ msg: "Post deleted" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log(id);
  const { desc, tags, details, topic } = req.body;
  await Post.updateOne(
    { _id: id },
    { desc: desc, tags: tags, details: details, topic: topic }
  );
  // console.log(response);
  res.status(200).send(`<h3>Updated successfully</h3>`);
};

export const getSingle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};
