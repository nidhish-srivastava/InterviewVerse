import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrackerContext } from "../context";

const GetAllPosts = () => {
  const navigate = useNavigate();
  const [postArray, setPostArray] = useState([]);
  const { setIdContext, state, setState, setT, setD, setM, setS, baseUrl } =
    useTrackerContext();
    const [searchTerm,setSearchTerm] = useState("")
    const [enterState,setEnterState] = useState(false)

  const getAllData = async () => {
    // const axiosInstance = axios.create({
    //   headers: {
    //     'Access-Control-Allow-Origin': 'https://inter-view-tracker-mern-ow8b.vercel.app',
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const response = await axiosInstance.get(`https://inter-view-tracker-mern-ow8b.vercel.app?topic=${searchTerm}`);
    const response = await axios.get(`https://inter-view-tracker-mern-ow8b.vercel.app?topic=${searchTerm}`);
    // console.log("All Posts",response.data);
    setPostArray(response.data.getAllPost);
  };

  const deletePost = async (_id) => {
    await axios.delete(`${baseUrl}/delete`, {
      data: {
        _id: _id,
      },
    });
    setState((e) => !e);
    //  console.log("Post deleted");
  };

  //* Problem that i was getting was of id,coz of the project structure
  const getPostInfo = async (_id) => {
    const response = await axios.get(`${baseUrl}/${_id}`);
    // I need this id in the update post,so will set the context thta i have created
    setIdContext(_id); //* this id will be used while updating the post
    // console.log("Single Post Info",response.data);
    setT(response.data.post.topic);
    setD(response.data.post.desc);
    setM(response.data.post.mistakes);
    setS(response.data.post.summary);
    navigate("/update"); //* THIS LOGIC IS GAME CHANGER,once the item is set,then only we will navigate,otherwise wont
  };

  const enterKeyHandler = (e) =>{
    e.key === "Enter" ? setEnterState(true) : setEnterState(false) 
  }

  useEffect(() => {
    getAllData();
  }, [state,enterState]);

  return (
    <React.Fragment>
     {/* <input type="search" placeholder="Search topic" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} onKeyDown={()=>getAllData()} Every time i press the key,it will trigger the search/> */}
     <input type="search" placeholder="Search topic" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} onKeyDown={enterKeyHandler} />
     <span className="search-icon">
     <i className="fa-solid fa-magnifying-glass"></i>
     </span>
    <div className="post-container">
      {postArray?.map((e, i) => {
        const date = new Date(e.updatedAt);
        console.log(date);
        return (
          <div key={i} className="post-card">
            <label htmlFor="date">{date.toDateString()}
            </label>
            <span className="edit-icon" onClick={() => getPostInfo(e._id)}>
              <i className="fa-solid fa-pen-to-square"></i>
            </span>
            <span className="delete-icon" onClick={() => deletePost(e._id)}>
              <i className="fa-solid fa-trash"></i>
            </span>
            <h2>{e.topic}</h2>
            <p>
              <label>Desc : </label>
              <br />
              {e.desc}
            </p>
            <p>
              <label htmlFor="mistakes">Mistakes :</label>
              <br />
              {e.mistakes}
            </p>
            <p>
              <label htmlFor="summary">
                Summary :
                {e.summary}
              </label>
              <br />
            </p>
            <div className="username" style={{textAlign : "right"}} >
            - {e.username}
            </div>
          </div>
        );
      })}
    </div>
  </React.Fragment>
  );
};

export default GetAllPosts;
