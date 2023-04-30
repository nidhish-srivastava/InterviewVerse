import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useTrackerContext } from '../context'

const GetAllPosts = () => {
     const navigate = useNavigate()
    const [postArray,setPostArray] = useState([])
    const {setIdContext,state,setState,setT,setD,setM,setS} = useTrackerContext()
    
    console.log(state)
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

    //* Problem that i was getting was of id,coz of the project structure
    const getPostInfo = async (_id)=>{
      const response= await axios.get(`http://localhost:4000/${_id}`)
      // I need this id in the update post,so will set the context thta i have created
      setIdContext(_id)
      console.log("Single Post Info",response.data);
        setT(response.data.post.topic)
        setD(response.data.post.desc)
        setM(response.data.post.mistakes)
        setS(response.data.post.summary)
        navigate('/update')   //* THIS LOGIC IS GAME CHANGER,once the item is set,then only we will navigate,otherwise wont
     }
 

    useEffect(()=>{
      getData()
    },[state])

  
  return (
    <div className='post-container'>
        {postArray.map((e,i)=>{
            return(
                <div key={i} className='post-card'>
                  {/* <Link to={`/update`}> */}
                  <span className="edit-icon" onClick={()=>getPostInfo(e._id)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                  </span>
                  {/* </Link> */}
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