import  { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    authRef: { type: Schema.Types.ObjectId, ref: "Auth" },
    username : {type : String},
    details: { type: String},
    desc: { type: String,},
    tags: [
      {
        name: { type: String },
        id: { type: String },
      },
    ],
    title: { type: String },
    published : {type : Boolean,default : false},
    companyName : {type : String},
    image : {type : String}
  },
  {
    timestamps: true,
  }
);

const readingListSchema = new Schema({
  name: { type: String, required: true },
  description : {type : String,default : "",trim : true},
  visibilty : {type : String,default : "public"},
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
},
{
  timestamps : true
}
)

const authSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  dp : {type : String,default : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
  savedPosts : [{type : Schema.Types.ObjectId,ref : "Post"}],
  readingLists : [readingListSchema],
  verificationToken : {type : String},
  tokenExpires : {type : Date},
  isVerified : {type : Boolean,default : false}
},{
  timestamps : true
});

const ReadingList = model("ReadingList",readingListSchema)
const Post = model("Post", postSchema);
const Auth = model("Auth", authSchema);

export { Post, Auth,ReadingList};
