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
    <div>
        {postArray.map((e,i)=>{
            return(
                <div key={i}>
                    <h2>{e.topic}</h2>
                    <p>{e.desc}</p>
                    <p>{e.mistakes}</p>
                    <p>{e.summary}</p>
                </div>
            )
        })} 
    </div>
  )
}

export default GetAllPosts