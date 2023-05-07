import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useTrackerContext } from '../context'
// import OpenAiTesting from './openAiTesting'

const GetAllPosts = () => {
     const navigate = useNavigate()
    const [postArray,setPostArray] = useState([])
    const {setIdContext,state,setState,setT,setD,setM,setS,baseUrl} = useTrackerContext()
    // const [showBtnstate,setShowBtnState] = useState(true)
    
    console.log(state)
    const getAllData = async() =>{
        const response = await axios.get(`${baseUrl}`)
        console.log("All Posts",response.data);
        setPostArray(response.data.getAllPost)
    }

    const deletePost = async(_id)=>{
       await axios.delete(`${baseUrl}/delete`,{
        data : {
          _id : _id
        }
       })
       setState((e)=>!e)
       console.log("Post deleted");
    }

    //* Problem that i was getting was of id,coz of the project structure
    const getPostInfo = async (_id)=>{
      const response= await axios.get(`${baseUrl}/${_id}`)
      // I need this id in the update post,so will set the context thta i have created
      setIdContext(_id)  //* this id will be used while updating the post
      console.log("Single Post Info",response.data);
        setT(response.data.post.topic)
        setD(response.data.post.desc)
        setM(response.data.post.mistakes)
        setS(response.data.post.summary)
        navigate('/update')   //* THIS LOGIC IS GAME CHANGER,once the item is set,then only we will navigate,otherwise wont
     }
 

    useEffect(()=>{
      getAllData()
    },[state])

  
  return (
    <div className='post-container'>
        {postArray.map((e,i)=>{
          const date = new Date(e.updatedAt)
          console.log(date);
            return(
                <div key={i} className='post-card'>
                  <label htmlFor="date">
                    {date.toDateString()}
                  </label>
                  <span className="edit-icon" onClick={()=>getPostInfo(e._id)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                  </span>
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
                      {/* <OpenAiTesting mistakes = {e.mistakes} topic = {e.topic} showBtnstate = {showBtnstate} setShowBtnState = {setShowBtnState}/> */}
                      {e.summary}
                      </label>
                      <br />
                      {/* { !showBtnstate && e.summary} */}
                      </p>
                </div>
            )
        })} 
    </div>
  )
}

export default GetAllPosts