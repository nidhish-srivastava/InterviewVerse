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
  topic: string;
}

interface iAuth {
  username: string;
  password: string;
}

const postSchema = new Schema<iPost>(
  {
    authRef: { type: Schema.Types.ObjectId, ref: "Auth", required: true },
    details: { type: String, required: true },
    desc: { type: String, required: true },
    tags: [
      {
        name: { type: String, required: true },
        id: { type: String, required: true },
      },
    ],
    topic: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const authSchema = new Schema<iAuth>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Post = model<iPost>("Post", postSchema);
const Auth = model<iAuth>("Auth", authSchema);

export { Post, Auth };
