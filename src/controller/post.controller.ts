import { Request, Response } from "express";
import { Auth, Post } from "../mongodb/model";
import { cleanInput } from "../utils";

export const getAll = async (req: Request, res: Response) => {
  const keyword = req.query
  ? {
    $and : [
      {
        $or: [  
          // If any one of the query is true,we get our result
          // { username: { $regex: req.query.username, $options: "i" } },
          // { topic: { $regex: req.query.topic, $options: "i" } },
          {username : cleanInput(req.query.username as string)},
          {topic : cleanInput(req.query.topic as string)},
          
        ],
      },
      {
        published : true
      }
    ]
  } : {}

  try {
    const getAllPost = await Post.find(keyword)
    res.status(200).json({ msg: "All posts read", getAllPost });
  } catch (error) {
    res.status(500).json({ msg: "Error is coming", error });
  }
};

export const searchUserPosts = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const response = await Post.find({ username: username,published : true });
    if (response.length == 0) {
      res.status(404).send(`<h3>${username} not found</h3>`);
    }
    res.status(200).json(response);
  } catch (error) {}
};

export const fetchPublishedPosts = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    
    const response = await Post.find({username : username,published : true})
    res.json(response);
  } catch (error) {}
};

export const fetchDrafts = async(req:Request,res:Response)=>{
  const {username} = req.params
     try {
      const response = await Post.find({username : username,published : false})
      res.json(response)
     } catch (error) {
      
     }
}

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
  const { desc, tags, details, topic, username,published } = req.body;
  const newPost = new Post({
    desc,
    tags,
    details,
    topic,
    username,
    published
  });
  
  try {
    const response = await newPost.save();
    res.status(201).json({postId : response._id});
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
  const { desc, tags, details, topic } = req.body;
  const response = await Post.updateOne(
    { _id: id },
    { desc: desc, tags: tags, details: details, topic: topic }
  );
  if(response.modifiedCount >= 1){
    res.status(201).json("Updated successfully")
  }
};

export const publishPost = async(req:Request,res:Response) =>{
  const {id} = req.params
  const response = await Post.updateOne(
    {_id : id},
    {published : true}
  )
  if(response.modifiedCount >= 1){
    res.status(201).json("Updated successfully")
  }
}

export const getSingle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};
