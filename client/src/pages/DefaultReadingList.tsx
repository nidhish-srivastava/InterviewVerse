import { useEffect, useState } from "react"
import { useTrackerContext } from "../context/context"
import PostsContainer from "../components/PostsContainer";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { url } from "../utils";
import { FormData } from "./Create";

function DefaultReadingList() {
  const {loggedInUser} = useTrackerContext()
  const [posts, setPosts] = useState<FormData[]>([]);
        
  useEffect(()=>{
    const fetchDefaultSavedList = async() =>{
      try {
        const response = await fetch(`${url}/readingList/fetchPost/${loggedInUser?.id}`)
        if(response.status==200){
          const data = await response.json()
          setPosts(data)
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchDefaultSavedList()
  },[])
    return (
    <div>
      <h4 className="center" style={{marginTop:"2rem"}}>Default Reading List</h4>
          <PostsContainer>
        {posts?.map((e, i) => (
          <Link to={`/${e?.username}/${e._id}`} key={i} >
            <PostCard post={e} show={true} />
          </Link>
        ))}
      </PostsContainer>
      </div>
  )
}

export default DefaultReadingList