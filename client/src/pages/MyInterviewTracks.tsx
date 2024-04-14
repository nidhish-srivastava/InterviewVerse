import { useState,useEffect } from "react";
import { FormData } from "./DraftWrite";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { url } from "../utils";
import PostsContainer from "../components/PostsContainer";
import { useTrackerContext } from "../context/context";
import Navbar from "../components/Navbar";

const MyInterviewTracks = () => {
  const {loggedInUser} = useTrackerContext()
  const [userPosts, setUserPosts] = useState<FormData[]>([]);

  useEffect(()=>{
    const getUserPosts = async () => {
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
      }
      }
    getUserPosts()
  },[loggedInUser])
  return (
    <>
    <Navbar/>
        <h3 className="text-center mt-6 text-2xl font-medium">My Interview Experiences</h3>
          <PostsContainer>
          {userPosts.map((e)=>(
            <Link to={`${e?._id}`}  key={e?._id}>
              <PostCard post={e} show = {false}/>
            </Link>
          ))}
          </PostsContainer>
    </>
  );
};

export default MyInterviewTracks;
