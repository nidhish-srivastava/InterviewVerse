import { FormData } from "../pages/Create";
import Button from "./Button";

type PostCardProps = {
  post: FormData;
  show?: true | false;
};

const dateFormatter = (date: Date | string | number) => {
  const currentDate = new Date(date);
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return formattedDate;
};

const PostCard = ({ post, show }: PostCardProps) => {
  return (
    <div className="post-card">
      <h2 className="post-title">{post.topic}</h2>
      <p className="post-description">{post.desc}</p>
      {show ? (
        <div className="post-author">
          <span>- {post.username}</span>
        </div>
      ) : null}
      <div className="post-tags">
        {post.tags?.map((tag, i) => (
          <Button label={tag.name} className="post-tag" key={i} />
        ))}
      </div>
      <span className="post-date">
        {post.updatedAt ? dateFormatter(post.updatedAt) : null}
      </span>
    </div>
  );
};

export default PostCard;
