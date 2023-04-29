import PostModel from './model.js'

export const getAll = async(req,res)=>{
    try {
        const getAllPost = await PostModel.find()
        res.status(200).json({msg : "All posts read",getAllPost})
    } catch (error) {
        res.status(500).json({msg:"Error is coming",error})
    }
   
}

export const create  = async(req,res) =>{
    // const {topic,desc,mistakes,summary} = req.body
    const newPost = new PostModel(req.body)
    try {
        await newPost.save()  // When we insert a new document in the database,we use save method to save it inside db
        res.status(200).json({msg : "Post created",newPost})
    } catch (error) {
        res.status(500).json({msg:"Error is coming",error})
    }
}

export const deletePost = async(req,res)=>{
    const {_id} = req.body
    try {
        await PostModel.findByIdAndDelete(_id)
        res.status(200).json({msg : "Post deleted"})
    } catch (error) {
        res.status(500).json({msg : error})
    }
}

export const updatePost = async(req,res)=>{
    const {id} = req.params
    const {topic,desc,mistakes,summary} = req.body
    try {
        const post = await PostModel.findById(id)
        // console.log(post);
        post.topic = topic
        post.desc = desc,
        post.mistakes = mistakes,
        post.summary = summary

        await post.save()
        console.log(post);
    } catch (error) {
        res.status(500).json({msg : error})
    }
}