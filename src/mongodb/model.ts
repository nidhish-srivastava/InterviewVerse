import { Schema, model } from 'mongoose';


interface iPost{
    summary : string
    desc : string
    mistakes : string
    tags : string[],
    topic : string
}

interface iAuth{
    username : string
    password : string
}

const postSchema = new Schema<iPost>({
    summary : {type : String,required : true},
    desc : {type : String,required : true},
    mistakes : {type : String,required : true},
    tags : {type : [String],required : true},
    topic : {type : String,required : true}
},{
    timestamps :true
})

const authSchema = new Schema<iAuth>({
    username : {type : String,required : true},
    password : {type : String,required : true}
})


const Post = model<iPost>('Post',postSchema)
const Auth = model<iAuth>('User',authSchema)

export  {
    Post,
    Auth
}

