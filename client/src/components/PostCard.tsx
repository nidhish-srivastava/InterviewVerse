import { FormData } from "../pages/Create"
import Button from "./Button"

type PostCardProps = {
  post : FormData,
  show : true | false
}

const PostCard = ({post,show} : PostCardProps) => {
  return (
    <div className="post-card">
    <h2 className="post-title">{post.topic}</h2>
      <p className="post-description">{post.desc}</p>
        {show ? 
      <div className="post-author">
        <span>- {post.authRef?.username}</span>
      </div> : null
      }
      <div className="post-tags">
        {post.tags?.map((tag, i) => (
          <Button label={tag.name} className="post-tag" key={i}/>
        ))}
      </div>
  </div>
  )
}

export default PostCard