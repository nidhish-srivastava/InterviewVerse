import { useState,useEffect } from "react";
import { FormData } from "./Create";
import { Link, useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import { url } from "../utils";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PostsContainer from "../components/PostsContainer";

const MyPosts = () => {
  const {id} = useParams()
  const [userPosts, setUserPosts] = useState<FormData[]>([]);
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const getUserPosts = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${url}/post/${id}`,{
            headers : {
              Authorization : "Bearer " + localStorage.getItem("token")
            }
          }) 
          const data = await response.json();
          setUserPosts(data);
          setLoading(false)
      } catch (error) {
        setLoading(false)
      }
      }
    getUserPosts()
  },[])
  return (
      <PostsContainer>
      {
        loading ? <div className="skeleton-loading">
          <Skeleton count={5}/>
          </div> : <>
          {userPosts.length == 0 && <h2>No Interview Tracks</h2>}
          {userPosts.map((e)=>(
            <Link to={`${e?._id}`}  key={e?._id}>
              <PostCard post={e} show = {false}/>
            </Link>
          ))}
          </>
      }
          </PostsContainer>
  );
};

export default MyPosts;
