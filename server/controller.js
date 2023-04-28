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