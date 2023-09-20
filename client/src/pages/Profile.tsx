import { useTrackerContext } from "../context/context";
import { useState,useEffect,Fragment } from "react";
import { FormData } from "./Create";
import { Link } from "react-router-dom";

const Profile = () => {
  const { loggedInUser } = useTrackerContext();
  const [userPosts, setUserPosts] = useState<FormData[]>([]);

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3000/post/${loggedInUser?.id}`,{
        headers : {
          Authorization : "Bearer " + localStorage.getItem("token")
        }
      }) 
      // if(response.status==200){
      const data = await response.json();
      setUserPosts(data);
      // console.log(data);
      // }
    }
  useEffect(()=>{
    getUserPosts()
  },[])
  return (
    <Fragment>
      {userPosts.map(e=>(
        <Link to={`${e._id}`}>
        <div style={{padding : "2rem",border : "2px solid white",width : "fit-content",margin : "2rem"}}>
          <h2>{e.topic}</h2>
          <div>{e.desc}</div>
          {/* <h4>
          -{e.authRef?.username}
          </h4> */}
          {/* <p>
          {e.details}
          </p> */}
          <div>
            {e.tags?.map(e=><button>{e.name}</button>)}
          </div>
        </div>
        </Link>
      ))}
      {/* <h2>
      </h2>
      <span className="edit-icon">
      <i className="fa-regular fa-pen-to-square"></i>
      </span>
      <span className="delete-icon">
      <i className="fa-solid fa-trash"></i>
      </span>
      <div>
      {userPosts?.desc}
      </div>
      <p>
      {userPosts?.details}
      </p>
      <div>
      {userPosts?.tags?.map(e=><button>{e.name}</button>)}
      </div> */}
    </Fragment>
  );
};

export default Profile;
