import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import PostsContainer from "../components/PostsContainer";
import SkeletonLoader from "../components/SkeletonLoader";
import { useTrackerContext } from "../context/context";
import useFetchHook from "../hooks/useFetchHook";
import { url } from "../utils";
import Navbar from "../components/Navbar";

function Drafts() {
  const { loggedInUser } = useTrackerContext();
  const { data, isLoading } = useFetchHook(
    `${url}/post/drafts/${loggedInUser?.username}`
  );
  return (
    <>
      <Navbar />
      <h3 className="text-center mt-8">
        Drafts
      </h3>
      <SkeletonLoader isLoading={isLoading} />
      <PostsContainer>
        {data?.map((e) => (
          <Link to={`/draft/${e?._id}`} key={e?._id}>
            <PostCard post={e} show={false} />
          </Link>
        ))}
      </PostsContainer>
    </>
  );
}

export default Drafts;
