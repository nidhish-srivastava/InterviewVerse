import { useParams, Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { url } from "../utils";
import PostsContainer from "../components/PostsContainer";
import UserProfileSections from "../components/UserProfileSections";
import LibraryContainer from "../components/LibraryContainer";
import useFetchHook from "../hooks/useFetchHook";
import SkeletonLoader from "../components/SkeletonLoader";
import Navbar from "../components/Navbar";

const SingleProfile = () => {
  const { username } = useParams();
  const { isLoading, data } = useFetchHook(`${url}/post/search/${username}`);

  return (
    <>
    <Navbar/>
      <h3 className="text-center p-4 text-2xl font-medium">{username}</h3>
      <LibraryContainer>
        <UserProfileSections username={username} />
      </LibraryContainer>
      <SkeletonLoader isLoading={isLoading} />
      <PostsContainer>
        {data?.map((e, i) => (
          <Link to={`/${e.topic}/${e._id}`} key={i}>
            <PostCard post={e} show={false} />
          </Link>
        ))}
      </PostsContainer>
    </>
  );
};

export default SingleProfile;
