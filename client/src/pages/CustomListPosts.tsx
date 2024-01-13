import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { url } from "../utils";
import { useTrackerContext } from "../context/context";
import PostCard from "../components/PostCard";
import { customReadingLists } from "../components/FullSinglePost";
import PostsContainer from "../components/PostsContainer";

function CustomListsPosts() {
  const [customList, setCustomLists] = useState<customReadingLists>();
  const {loggedInUser} = useTrackerContext()
  const params = useParams()
  const listId = params?.id?.split("-")[1]

    useEffect(()=>{
      const fetchPosts = async()=>{
        const response = await fetch(`${url}/readingList/fetchPost/${loggedInUser?.id}/${listId}`)
        if(response.status==200){
          const data = await response.json()
          setCustomLists(data)
        }
      }
      fetchPosts()
    },[])
   
  return (
    <div>
      <div className="list-heading-bar">
      <h3>{customList?.name}</h3>
      <span>
                        {customList?.visibilty == "public" && (
                          <span className="visibility-icon">
                          <i className="fa-solid fa-lock"></i>
                          </span>
                          )}
                      </span>
                          </div>
      <PostsContainer>
        {customList?.posts?.map((e, i) => (
          <Link to={`/${e?.username}/${e._id}`} key={i} >
            <PostCard post={e} show={true} />
          </Link>
        ))}
      </PostsContainer>

    </div>
  )
}

export default CustomListsPosts