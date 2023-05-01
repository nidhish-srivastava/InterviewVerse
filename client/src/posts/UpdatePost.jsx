import React,{useState} from 'react'
import axios from 'axios'
import { useTrackerContext } from '../context'
import { useNavigate } from 'react-router-dom'

const UpdatePost = () => {
  // I will pass the default values by fetching the data from backend of the post,then populating it
  const navigate = useNavigate()
  const {t,d,m,s} = useTrackerContext()
  const [topic,setTopic] = useState(t)
  const [desc,setDesc] = useState(d)
  const [mistakes,setMistakes] = useState(m)
  const [summary,setSummary] = useState(s)
  const {idContext} = useTrackerContext()

  const updateObject = {
    topic : topic,
    desc : desc,
    mistakes : mistakes,
    summary : summary
  }

  const updatePost = async(_id)=>{
    try {
      const response = await axios.put(`http://localhost:4000/${_id}`,{
       updateObject
      })
      console.log("Post updated",response);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
   
  }

   
 

  return (
    <main className="input-container">
    <input type="text" placeholder='Topic' value={topic} onChange={(e)=>setTopic(e.target.value)}/>
    <textarea spellCheck="false"  rows="6" cols="69" placeholder='Description' value={desc} onChange={(e)=>setDesc(e.target.value)}  />
    <textarea spellCheck="false"  rows="6" cols="69"  placeholder='Mistakes' value={mistakes} onChange={(e)=>setMistakes(e.target.value)}  /> 
    <input placeholder='Solution/Summary' spellCheck="false"  rows="6" cols="69" value={summary} onChange={(e)=>setSummary(e.target.value)}  />
    <button className='btn' onClick={()=>updatePost(idContext)}>Update</button>
    </main> 
  )
}

export default UpdatePost