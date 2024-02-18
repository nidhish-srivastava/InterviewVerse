import { Link, useParams } from "react-router-dom"
import { url } from "../utils";
import { useTrackerContext } from "../context/context";
import PostCard from "../components/PostCard";
import PostsContainer from "../components/PostsContainer";
import useFetchHook from "../utils/hooks/useFetchHook";
import SkeletonLoader from "../components/SkeletonLoader";


function CustomListsPosts() {
  const {loggedInUser} = useTrackerContext()
  const params = useParams()
  const listId = params?.id?.split("-")[1]
  const {data,isLoading,error} = useFetchHook(`${url}/readingList/fetchPost/${loggedInUser?.id}/${listId}`)
  
   
  return (
    <>
    <h4 className="center" style={{marginTop : "2rem"}}>{error}</h4>
       <SkeletonLoader isLoading={isLoading}/>
      <div className="list-heading-bar">
      <h3>{data?.name}</h3>
      <span>
                        {data?.visibilty == "public" && (
                          <span className="visibility-icon">
                          <i className="fa-solid fa-lock"></i>
                          </span>
                          )}
                      </span>
                          </div>
      <PostsContainer>
        {data?.posts?.map((e, i) => (
          <Link to={`/${e?.username}/${e._id}`} key={i} >
            <PostCard post={e} show={true} />
          </Link>
        ))}
      </PostsContainer>

    </>
  )
}

export default CustomListsPosts