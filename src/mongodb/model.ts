import mongoose, { Schema, model } from 'mongoose';


interface iPost{
    details : string
    desc : string
    tags : {
        name : string
        id : string
    }[],
    topic : string
}

interface iAuth{
    username : string
    password : string
}

const postSchema = new Schema<iPost>({
    details  : {type : String,required : true},
    desc : {type : String,required : true},
    tags : [
        {
            name : {type : String,required : true},
            id : {type : String,required : true}
        }
    ],
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

