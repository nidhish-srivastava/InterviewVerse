import { useState,useEffect } from "react";
import { FormData } from "./DraftWrite";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { url } from "../utils";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PostsContainer from "../components/PostsContainer";
import { useTrackerContext } from "../context/context";

const MyInterviewTracks = () => {
  const {loggedInUser} = useTrackerContext()
  const [userPosts, setUserPosts] = useState<FormData[]>([]);
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const getUserPosts = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${url}/post/published/${loggedInUser?.username}`,{
            headers : {
              Authorization : "Bearer " + localStorage.getItem("token")
            }
          }) 
          const data = await response.json();
          setUserPosts(data);
      } catch (error) {
      }
      finally{
        setLoading(false)
      }
      }
    getUserPosts()
  },[loggedInUser])
  return (
    <>
        <h3 className="center" style={{marginTop : "2rem"}}>My Interview Experiences</h3>
      <PostsContainer>
      {
        loading ? <div className="skeleton-loading">
          <Skeleton count={5}/>
          </div> : <>
          {userPosts.map((e)=>(
            <Link to={`${e?._id}`}  key={e?._id}>
              <PostCard post={e} show = {false}/>
            </Link>
          ))}
          </>
      }
          </PostsContainer>
    </>
  );
};

export default MyInterviewTracks;
