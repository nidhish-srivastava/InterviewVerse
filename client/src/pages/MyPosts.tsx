import { useState,useEffect } from "react";
import { FormData } from "./Create";
import { Link, useParams } from "react-router-dom";
import PostCard from "../components/PostCard";

const MyPosts = () => {
  const {id} = useParams()
  const [userPosts, setUserPosts] = useState<FormData[]>([]);

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3000/post/${id}`,{
        headers : {
          Authorization : "Bearer " + localStorage.getItem("token")
        }
      }) 
      const data = await response.json();
      console.log(data);
      setUserPosts(data);
    }
  useEffect(()=>{
    getUserPosts()
  },[])
  return (
    <main className="post-container">
      {userPosts.length == 0 && <h2>No Interview Tracks</h2>}
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
