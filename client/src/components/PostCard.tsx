import { FormData } from "../pages/DraftWrite";
import { dateFormatter, timeToReadPost } from "../utils";

type PostCardProps = {
  post: FormData;
  show?: boolean; // Change from true | false to boolean
};

const PostCard = ({ post, show }: PostCardProps) => {
  return (
    <div className="border border-gray-300 bg-white rounded-lg shadow-md p-4 mb-4 transition duration-300 ease-in-out hover:shadow-lg">
      <h2 className="text-base font-medium sm:text-lg md:text-xl lg:text-2xl text-gray-800 mb-2">{post.topic}</h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-2">{post.desc}</p>
      <div className="text-sm text-gray-600">
        {show && <span>- {post.username}</span>}
      </div>
      <div className="flex flex-wrap items-center mt-4">
        {post.tags?.map((tag, i) => (
          <button key={i} className="bg-blue-500 text-white text-xs sm:text-sm md:text-base lg:text-lg rounded-md px-2 py-1 mr-2 mb-2">
            {tag.name}
          </button>
        ))}
        <span className="text-gray-600">{timeToReadPost(post.details)} min read</span>
      </div>
      <span className="text-sm text-gray-600 block text-right mt-2">
        {post.updatedAt ? dateFormatter(post.createdAt as string | number | Date) : null}
      </span>
    </div>
  );
};

export default PostCard;
