import { FormData } from "../utils/types";
import { dateFormatter, timeToReadPost } from "../utils";

type PostCardProps = {
  post: FormData;
  show?: boolean; 
};

const PostCard = ({ post, show }: PostCardProps) => {
  const maxTitleLength = 50;

  // Trim the title if it exceeds the maximum length
  const trimmedTitle = post?.title?.length > maxTitleLength
    ? post?.title.substring(0, maxTitleLength) + '...'
    : post?.title;

  return (
    <div className="border w-80 h-96 border-gray-300 bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out hover:shadow-lg flex flex-col justify-between">
      <div className="w-full h-48 overflow-hidden flex justify-center items-center">
        <img src={post?.image} loading="lazy" alt="" className="object-cover h-full w-full" />
      </div>
      <h2 className="text-xl font-medium my-4 text-gray-800 break-words">{trimmedTitle}</h2>
      <div className="text-sm text-gray-600">
        {show && <span>- {post.username}</span>}
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {post.tags?.map((tag, i) => (
          <button key={i} className="bg-blue-500 text-white text-sm rounded-md px-2 py-1">
            {tag.name}
          </button>
        ))}
        <span className="text-gray-600 ml-auto">{timeToReadPost(post.details)} min read</span>
      </div>
      <span className="text-sm text-gray-600 block text-right mt-2">
        {post.updatedAt ? dateFormatter(post.createdAt as string | number | Date) : null}
      </span>
    </div>
  );
};

export default PostCard;
