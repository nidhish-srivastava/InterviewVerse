import { useTrackerContext } from "../context/context";
import { useState,useEffect } from "react";
import { FormData } from "./Create";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";

const MyPosts = () => {
  const { loggedInUser } = useTrackerContext();
  const [userPosts, setUserPosts] = useState<FormData[]>([]);

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3000/post/${loggedInUser?.id}`,{
        headers : {
          Authorization : "Bearer " + localStorage.getItem("token")
        }
      }) 
      if(response.status==200){
      const data = await response.json();
      setUserPosts(data);
      // console.log(data);
      }
    }
  useEffect(()=>{
    getUserPosts()
  },[])
  return (
    <main className="post-container">
      {userPosts.map((e,i)=>(
        <Link to={`${e._id}`}>
          <PostCard post={e} key={i} show = {false}/>
        </Link>
      ))}
      {/* 
      <span className="edit-icon">
      <i className="fa-regular fa-pen-to-square"></i>
      </span>
      <span className="delete-icon">
      <i className="fa-solid fa-trash"></i>
      </span>
      */}
    </main>
  );
};

export default MyPosts;
