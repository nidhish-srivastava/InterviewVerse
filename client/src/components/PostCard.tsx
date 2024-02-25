import { FormData } from "../pages/DraftWrite";
import Button from "./Button";
import { dateFormatter, timeToReadPost } from "../utils";
type PostCardProps = {
  post: FormData;
  show?: true | false;
};

const PostCard = ({ post, show  }: PostCardProps) => {
  return (
    <div className="post-card">
      <h2 className="post-title">{post.topic}</h2>
      <p className="post-description">{post.desc}</p>
      {show ? (
        <div className="post-author">
          <span>- {post.username}</span>
        </div>
      ) : null}
      <div className="tags-time-bar">
      <div className="post-tags">
        {post.tags?.map((tag, i) => (
          <Button className="post-tag" key={i}>{tag.name}</Button>
          ))}
        &nbsp; 
        &nbsp; 
      <span>
        {timeToReadPost(post.details)} min read
      </span>
      </div>
          </div>
      <span className="post-date">
        {post.updatedAt ? dateFormatter(post.createdAt as string | number | Date) : null}
      </span>
    </div>
  );
};

export default PostCard;
