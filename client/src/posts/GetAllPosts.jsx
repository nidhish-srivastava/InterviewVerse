import axios from 'axios'
import React, { useEffect, useState } from 'react'

const GetAllPosts = () => {
    const [postArray,setPostArray] = useState([])
    const getData = async() =>{
        const response = await axios.get(`http://localhost:4000`)
        console.log("All Posts",response.data);
        setPostArray(response.data.getAllPost)
    }
    useEffect(()=>{
      getData()
    },[])
  return (
    <div className='post-container'>
        {postArray.map((e,i)=>{
            return(
                <div key={i} className='post-card'>
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