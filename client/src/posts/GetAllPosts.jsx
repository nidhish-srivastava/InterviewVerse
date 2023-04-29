import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const GetAllPosts = () => {
    const [postArray,setPostArray] = useState([])
    const [state,setState] = useState(false)
    
    const getData = async() =>{
        const response = await axios.get(`http://localhost:4000`)
        console.log("All Posts",response.data);
        setPostArray(response.data.getAllPost)
    }
    const deletePost = async(_id)=>{
       await axios.delete(`http://localhost:4000/delete`,{
        data : {
          _id : _id
        }
       })
       setState((e)=>!e)
       console.log("Post deleted");
    }
 

    useEffect(()=>{
      getData()
    },[state])
  return (
    <div className='post-container'>
        {postArray.map((e,i)=>{
            return(
                <div key={i} className='post-card'>
                  <Link to={`/update`}>
                  <span className="edit-icon">
                  <i className="fa-solid fa-pen-to-square"></i>
                  </span>
                  </Link>
                  <span className="delete-icon" onClick={()=>deletePost(e._id)}>
                  <i className="fa-solid fa-trash"></i>
                  </span>
                    <h2>{e.topic}</h2>
                    <p>
                    <label>Desc : </label>
                    <br />
                      {e.desc}</p>
                    <p>
                      <label htmlFor="mistakes">
                        Mistakes : 
                      </label>
                      <br />
                      {e.mistakes}</p>
                    <p>
                      <label htmlFor="summary">
                        Summary : 
                      </label>
                      <br />
                      {e.summary}</p>
                </div>
            )
        })} 
    </div>
  )
}

export default GetAllPosts