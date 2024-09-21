import { Link, useParams } from "react-router-dom";
import { url } from "../utils";
import { useTrackerContext } from "../context/context";
import PostCard from "../components/PostCard";
import PostsContainer from "../components/Layouts/PostsContainer";
import useFetchHook from "../hooks/useFetchHook";
import SkeletonLoader from "../components/ui/SkeletonLoader";
import Navbar from "../components/Layouts/Navbar";

function CustomListsPosts() {
  const { loggedInUser } = useTrackerContext();
  const params = useParams();
  const listId = params?.id?.split("-")[1];
  const { data, isLoading, error } = useFetchHook(
    `${url}/readingList/fetchPost/${loggedInUser?.id}/${listId}`
  );


  return (
    <>
    <Navbar/>
      <h4 className="text-center mt-8">
        {error}
      </h4>
      <SkeletonLoader isLoading={isLoading} />
      <div className="mt-8 flex justify-center items-center gap-4">  
        <h3 className="text-lg">{data?.name}</h3>
        <span>
          {data?.visibility == "private" && (
            <span>
              <i className="fa-solid fa-lock"></i>
            </span>
          )}
        </span>
      </div>
      <PostsContainer>
        {data?.posts?.map((e, i) => (
          <Link to={`/${e?.username}/${e._id}`} key={i}>
            <PostCard post={e} show={true} />
          </Link>
        ))}
      </PostsContainer>
    </>
  );
}

export default CustomListsPosts;
