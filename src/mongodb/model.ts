import  { Schema, model } from "mongoose";

interface iPost {
  authRef: {
    username: string;
    userId: string;
  };
  details: string;
  desc: string;
  tags: {
    name: string;
    id: string;
  }[];
  title: string;
  username : string
  published : boolean
  companyName : string
  image : string
}

interface iAuth {
  username: string;
  password: string;
  savedPosts : string[] | null
  readingLists : any
}

const postSchema = new Schema<iPost>(
  {
    authRef: { type: Schema.Types.ObjectId, ref: "Auth" },
    username : {type : String},
    details: { type: String,},
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

const authSchema = new Schema<iAuth>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  savedPosts : [{type : Schema.Types.ObjectId,ref : "Post"}],
  readingLists : [readingListSchema]
},{
  timestamps : true
});

const ReadingList = model("ReadingList",readingListSchema)
const Post = model<iPost>("Post", postSchema);
const Auth = model<iAuth>("Auth", authSchema);

export { Post, Auth,ReadingList};
