import { FormData } from "../pages/DraftWrite";
import { dateFormatter, timeToReadPost } from "../utils";

type PostCardProps = {
  post: FormData;
  show?: boolean; // Change from true | false to boolean
};

const PostCard = ({ post, show }: PostCardProps) => {
  // const maxDescLength = 100; 
  const maxTitleLength = 50;

// Trim the title if it exceeds the maximum length
const trimmedTitle = post?.title?.length > maxTitleLength
  ? post?.title.substring(0, maxTitleLength) + '...'
  : post?.title;

  return (
    <div className="border  w-80 border-gray-300 bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out hover:shadow-lg">
      <div className="">
      <img src={post?.image} loading="lazy" alt="" />
      </div>
      <h2 className="text-xl font-medium my-4 text-gray-800  break-words text-wrap">{trimmedTitle}</h2>
      <div className="text-sm text-gray-600">
        {show && <span>- {post.username}</span>}
      </div>
      <div className="flex flex-wrap items-center mt-8 gap-2">
        {post.tags?.map((tag, i) => (
          <button key={i} className="bg-blue-500 text-white text-sm rounded-md px-2 py-1">
            {tag.name}
          </button>
        ))}
        <span className="text-gray-600">{timeToReadPost(post.details)} min read</span>
      </div>
      <span className="text-sm text-gray-600 block text-right">
        {post.updatedAt ? dateFormatter(post.createdAt as string | number | Date) : null}
      </span>
    </div>
  );
};

export default PostCard;
